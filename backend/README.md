# Backend - Fitness & Health Platform

Servidor Node.js com Express para a plataforma fitness.

## 🚀 Instalação

```bash
npm install
```

## 📝 Configuração

Crie um arquivo `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

Preencha com suas credenciais do PostgreSQL.

## 🗄️ Banco de Dados

Execute as migrations:

```bash
npm run migrate
```

Isso criará as tabelas automaticamente.

## ▶️ Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor estará disponível em `http://localhost:5000`

## 📡 Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/profile` - Obter perfil (requer autenticação)

### IMC
- `POST /api/imc/calculate` - Calcular IMC (requer autenticação)
- `GET /api/imc/history` - Obter histórico (requer autenticação)
- `GET /api/imc/last` - Obter última medição (requer autenticação)
- `GET /api/imc/statistics` - Obter estatísticas (requer autenticação)

## 🔐 Autenticação

Use o token JWT no header:
```
Authorization: Bearer seu_token_aqui
```

## 📚 Estrutura

```
src/
├── config/
│   ├── auth.js
│   └── database.js
├── controllers/
│   ├── authController.js
│   └── imcController.js
├── middlewares/
│   ├── auth.js
│   └── validation.js
├── routes/
│   ├── authRoutes.js
│   └── imcRoutes.js
└── server.js
```
