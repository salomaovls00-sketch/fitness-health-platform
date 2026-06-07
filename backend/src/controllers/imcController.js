const pool = require('../config/database');
const Joi = require('joi');

// Validação com Joi
const imcSchema = Joi.object({
  weight: Joi.number().positive().precision(2).required(),
  height: Joi.number().positive().precision(2).required(),
});

// Classificação de IMC conforme OMS
const classifyIMC = (imc) => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade Grau I';
  if (imc < 40) return 'Obesidade Grau II';
  return 'Obesidade Grau III';
};

// Calcular IMC
const calculateIMC = async (req, res) => {
  try {
    const { error, value } = imcSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { weight, height } = value;

    // Validação adicional
    if (height <= 0 || height > 3) {
      return res.status(400).json({ error: 'Altura deve estar entre 0 e 3 metros' });
    }

    if (weight <= 0 || weight > 500) {
      return res.status(400).json({ error: 'Peso deve estar entre 0 e 500 kg' });
    }

    // Calcula IMC
    const imc = parseFloat((weight / (height * height)).toFixed(2));
    const classification = classifyIMC(imc);

    // Salva no banco de dados
    const result = await pool.query(
      `INSERT INTO imc_records (user_id, weight, height, imc, classification, record_date)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, weight, height, imc, classification, record_date`,
      [req.userId, weight, height, imc, classification]
    );

    const record = result.rows[0];

    res.json({
      message: 'IMC calculado com sucesso',
      result: {
        id: record.id,
        weight: record.weight,
        height: record.height,
        imc: record.imc,
        classification: record.classification,
        recordDate: record.record_date,
      },
    });
  } catch (error) {
    console.error('Erro ao calcular IMC:', error);
    res.status(500).json({ error: 'Erro ao calcular IMC' });
  }
};

// Obter histórico de IMC
const getIMCHistory = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, weight, height, imc, classification, record_date
       FROM imc_records
       WHERE user_id = $1
       ORDER BY record_date DESC
       LIMIT 50`,
      [req.userId]
    );

    res.json({
      records: result.rows.map(record => ({
        id: record.id,
        weight: record.weight,
        height: record.height,
        imc: record.imc,
        classification: record.classification,
        recordDate: record.record_date,
      })),
    });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
};

// Obter última medição
const getLastIMC = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, weight, height, imc, classification, record_date
       FROM imc_records
       WHERE user_id = $1
       ORDER BY record_date DESC
       LIMIT 1`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.json({
        message: 'Nenhuma medição registrada',
        record: null,
      });
    }

    const record = result.rows[0];

    res.json({
      record: {
        id: record.id,
        weight: record.weight,
        height: record.height,
        imc: record.imc,
        classification: record.classification,
        recordDate: record.record_date,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar última medição:', error);
    res.status(500).json({ error: 'Erro ao buscar última medição' });
  }
};

// Obter estatísticas
const getStatistics = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        COUNT(*) as total_records,
        AVG(imc) as average_imc,
        MIN(imc) as min_imc,
        MAX(imc) as max_imc,
        MIN(weight) as min_weight,
        MAX(weight) as max_weight
       FROM imc_records
       WHERE user_id = $1`,
      [req.userId]
    );

    const stats = result.rows[0];

    res.json({
      statistics: {
        totalRecords: parseInt(stats.total_records),
        averageIMC: stats.average_imc ? parseFloat(stats.average_imc).toFixed(2) : 0,
        minIMC: stats.min_imc ? parseFloat(stats.min_imc).toFixed(2) : 0,
        maxIMC: stats.max_imc ? parseFloat(stats.max_imc).toFixed(2) : 0,
        minWeight: stats.min_weight ? parseFloat(stats.min_weight).toFixed(2) : 0,
        maxWeight: stats.max_weight ? parseFloat(stats.max_weight).toFixed(2) : 0,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};

module.exports = {
  calculateIMC,
  getIMCHistory,
  getLastIMC,
  getStatistics,
};