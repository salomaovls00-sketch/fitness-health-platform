const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/auth');
const Joi = require('joi');

// Validação com Joi
const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  age: Joi.number().integer().min(1).max(150).required(),
  gender: Joi.string().valid('M', 'F', 'Outro').required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Registro de usuário
const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fullName, age, gender, email, password } = value;

    // Verifica se email já existe
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere novo usuário
    const result = await pool.query(
      'INSERT INTO users (full_name, age, gender, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, full_name',
      [fullName, age, gender, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      },
      token,
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// Login de usuário
const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    // Busca usuário pelo email
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const user = result.rows[0];

    // Verifica senha
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        age: user.age,
        gender: user.gender,
      },
      token,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

// Obter dados do usuário
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, full_name, age, gender, email, created_at FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const user = result.rows[0];

    res.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        age: user.age,
        gender: user.gender,
        email: user.email,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};