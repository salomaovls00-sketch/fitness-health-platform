# Fitness & Health Platform

Plataforma profissional de acompanhamento fitness e saúde com cálculo de IMC, histórico de evolução e interface moderna.

## 🏋️ Características Principais

✅ **Autenticação Segura**: Registro e login com validação completa
✅ **Calculadora de IMC**: Cálculo preciso conforme padrões da OMS
✅ **Histórico de Evolução**: Acompanhe suas medições ao longo do tempo
✅ **Gráficos Interativos**: Visualize sua evolução com gráficos dinâmicos
✅ **Design Responsivo**: Interface adaptada para todos os dispositivos
✅ **Modo Claro/Escuro**: Tema personalizável
✅ **Painel de Controle**: Dashboard completo com estatísticas
✅ **Banco de Dados**: Armazenamento seguro e confiável

## 📋 Requisitos do Sistema

- Node.js v16+
- PostgreSQL 12+
- npm ou yarn

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/salomaovls00-sketch/fitness-health-platform.git
cd fitness-health-platform
```

### 2. Configure o Backend
```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend`:
```env
PORT=5000
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_NAME=fitness_db
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=sua_chave_jwt_segura
NODE_ENV=development
```

Execute as migrations do banco de dados:
```bash
npm run migrate
```

Inicie o servidor:
```bash
npm start
```

### 3. Configure o Frontend
```bash
cd frontend
npm install
npm start
```

O site abrirá em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
fitness-health-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── migrations/
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── README.md
└── README.md
```

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Validação de entrada
- Proteção contra SQL Injection
- CORS configurado

## 📊 Fórmula de IMC

IMC = peso (kg) / altura² (m)

### Classificação (OMS)
- Abaixo do peso: IMC < 18.5
- Peso normal: 18.5 ≤ IMC < 25
- Sobrepeso: 25 ≤ IMC < 30
- Obesidade Grau I: 30 ≤ IMC < 35
- Obesidade Grau II: 35 ≤ IMC < 40
- Obesidade Grau III: IMC ≥ 40

## 📱 Interface

### Páginas
1. **Home**: Informações sobre saúde e IMC
2. **Registro**: Formulário de cadastro
3. **Login**: Autenticação de usuários
4. **Dashboard**: Painel principal com estatísticas
5. **Calculadora IMC**: Interface de cálculo
6. **Histórico**: Histórico de medições e gráficos
7. **Perfil**: Dados do usuário

## 🎨 Design

- Tema profissional com cores fitness
- Animações suaves
- Responsivo (Mobile, Tablet, Desktop)
- Modo claro e escuro
- Ícones intuitivos

## 🛠️ Tecnologias Utilizadas

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Chart.js / Recharts
- React Context API

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- JWT
- Bcrypt
- Joi (Validação)

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## 📄 Licença

MIT License - Livre para uso acadêmico e científico.

---

**Desenvolvido para apresentação em mostra científica universitária** 🎓