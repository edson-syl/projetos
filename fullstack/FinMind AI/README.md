# 💰 FinMind AI

Assistente financeiro inteligente focado em:

* 📈 Simulação de investimentos
* 💳 Empréstimos
* 📊 Análise de orçamento
* 🤖 Respostas com IA local usando Ollama

Projeto Fullstack com:

* Backend: FastAPI
* Frontend: React
* IA local: Ollama (modelo phi3:mini)

---

## 🚀 Tecnologias Utilizadas

### 🔹 Backend

* Python 3.10+
* FastAPI
* Uvicorn
* Pydantic
* Requests

### 🔹 Frontend

* React
* Vite
* Node.js

### 🔹 IA Local

* Ollama
* Modelo: phi3:mini

---

## 📦 Instalação Completa

### 1️⃣ Clonar o projeto

```bash
git clone <url-do-repositorio>
cd FinMind-AI
```

---

## 🧠 Configuração da IA (Ollama)

### 🔹 Instalar o Ollama

Baixe em:
[https://ollama.com](https://ollama.com)

Instale normalmente.

---

### 🔹 Baixar o modelo usado no projeto

```bash
ollama pull phi3:mini
```

---

### 🔹 Iniciar o servidor do Ollama

```bash
ollama serve
```

## 🖥️ Configuração do Backend (FastAPI)

Entre na pasta do backend:

```bash
cd backend
```

Crie e ative o ambiente virtual:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 🔹 Instalar dependências

```bash
pip install fastapi uvicorn pydantic requests
```

---

### 🔹 Rodar o servidor

```bash
uvicorn main:app --reload
```

## 🌐 Configuração do Frontend (React)

Entre na pasta do frontend:

```bash
cd frontend
```

Instale dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```