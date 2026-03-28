import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser 

# 🔑 Load environment variables from the .env file
load_dotenv()

# Quick safety check
if not os.getenv("GOOGLE_API_KEY"):
    raise ValueError("🚨 GOOGLE_API_KEY not found! Please check your .env file.")

class AuraBrain:
    def __init__(self):
        print("🧠 Initializing Aura's Brain (Gemini Flash + RAG)...")
        
        # 1. Load the LLM (Gemini 1.5 Flash)
        self.llm = ChatGoogleGenerativeAI(
            model= "gemini-2.5-flash",
            temperature=0.7 # 0.7 gives a nice, conversational tone
        )
        
        # 2. Setup Embeddings (To convert text into searchable numbers)
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        
        # 3. Load the Knowledge Base & Create Vector Database
        loader = TextLoader("banking_rules.txt")
        docs = loader.load()
        self.vector_db = FAISS.from_documents(docs, self.embeddings)
        self.retriever = self.vector_db.as_retriever()
        
        # 4. Create the Prompt Template
        self.prompt_template = PromptTemplate(
            input_variables=["context", "forecast", "question"],
            template="""
            You are 'Aura', an elite, proactive AI financial co-pilot for a modern bank. 
            Your goal is to be helpful, concise, and financially savvy.

            Here are the official bank policies you must follow:
            {context}

            Here is the user's 30-day predicted financial forecast from our PyTorch model:
            {forecast}

            User's Question: {question}

            Answer the user's question directly. Use the forecast to give proactive advice. 
            If the forecast looks bad, warn them. If they have extra money, suggest the High-Yield Vault.
            """
        )
        
        # 5. Build the Chain using MODERN LCEL SYNTAX (No LLMChain here!)
        self.chain = self.prompt_template | self.llm | StrOutputParser()

    def ask_aura(self, question, forecast_summary):
        """
        Takes the user's question and their PyTorch forecast, finds the right rules, 
        and gets Gemini to generate a response.
        """
        # Retrieve relevant banking rules based on the user's question
        relevant_docs = self.retriever.invoke(question)
        context = "\n".join([doc.page_content for doc in relevant_docs])
        
        # Run Gemini using the modern .invoke() dictionary method
        response = self.chain.invoke({
            "context": context,
            "forecast": forecast_summary,
            "question": question
        })
        
        return response

# --- Test the Brain ---
if __name__ == "__main__":
    brain = AuraBrain()
    
    # Simulating what the PyTorch model (from Phase 2) would tell us:
    mock_forecast = "Balance today is ₹15,000. Expected to drop to -₹2,000 by next week due to a ₹17,000 Rent payment."
    
    # Simulating a user typing in the Streamlit App:
    user_query = "Hey Aura, can I afford to buy a ₹5,000 smartwatch today?"
    
    print("\n👤 User:", user_query)
    print("✨ Aura:", brain.ask_aura(user_query, mock_forecast))