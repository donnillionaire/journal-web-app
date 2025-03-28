# Journal App Setup Guide

## Backend Setup

### Prerequisites
- Python (version 3.9 or later)
- pip (Python package manager)
- Virtual environment (optional but recommended)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/donnillionaire/journal-app-backend.git
   ```
2. **Navigate into the project folder**
   ```bash
   cd journal-app-backend
   ```
3. **Create and activate a virtual environment** (optional but recommended)
   - On macOS/Linux:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
5. **Run the FastAPI server**
   ```bash
   uvicorn app.main:app --reload
   ```
6. **Access the API documentation**
   - Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   - ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## Frontend Setup

### Prerequisites
- Node.js (version 16 or later)
- npm (Node package manager)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/donnillionaire/journal-web-app.git
   ```
2. **Navigate into the project folder**
   ```bash
   cd journal-web-app
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. **Access the frontend application**
   - Open [http://localhost:5173](http://localhost:5173) (default Vite port)

---

**Now your Journal App is up and running! 🚀**
