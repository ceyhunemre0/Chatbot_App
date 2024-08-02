from flask import Flask, jsonify, request
from langchain_community.document_loaders import TextLoader # Dosya yüklemek için opsiyon
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import Annoy
from langchain_openai import OpenAIEmbeddings
import os
from langchain_community.document_loaders import Docx2txtLoader
from dotenv import load_dotenv
from flask_cors import CORS
import openai

load_dotenv()
key = os.getenv("OPENAI_API_KEY")
os.environ["OPENAI_API_KEY"] = key
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
app = Flask(__name__)
CORS(app)

documents = []
loaders = [Docx2txtLoader("docs/test.docx"),
          Docx2txtLoader("docs/test2.docx"),
          Docx2txtLoader("docs/test3.docx"),

          ]

for loader in loaders:
    documents.extend(loader.load())
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(documents)
vector_store_from_docs = Annoy.from_documents(docs, embeddings)
    
@app.post("/query")
def query():
    data = request.get_json()
    question = data.get('question')
    if not question:
        return jsonify({"error": "Soru bulunamadi."}), 400

    # İşlemler ve yanıt oluşturma
    docs = vector_store_from_docs.similarity_search(question)
    return generate_chatgpt_response(question, docs[0].page_content)

    

def generate_chatgpt_response(question, relevant_text):
    prompt = f"Sana sorulan soru: {question}, ve dökümanlardan bulunan olasi cevap: {relevant_text}."
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Sen bir müşteri temsilcisisin. Sana sorulan sorulara uygun cevap vermelisin."},
            {"role": "user", "content": "Merhaba, benim adım Emre."},
            {"role": "assistant", "content": "Merhaba Emre, sana nasıl yardımcı olabilirim?"},
            {"role": "user", "content": prompt}
        ]
    )
    
    return response.choices[0].message.content

if __name__ == '__main__':
    app.run()