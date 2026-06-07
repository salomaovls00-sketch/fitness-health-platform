const pool = require('../src/config/database');

const initializeDatabase = async () => {
  const client = await pool.connect();

  try {
    console.log('📁 Iniciando criação das tabelas do banco de dados...');

    // Criar tabela de usuários
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        age INTEGER NOT NULL,
        gender VARCHAR(10) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabela users criada com sucesso');

    // Criar tabela de registros de IMC
    await client.query(`
      CREATE TABLE IF NOT EXISTS imc_records (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        weight DECIMAL(5, 2) NOT NULL,
        height DECIMAL(3, 2) NOT NULL,
        imc DECIMAL(5, 2) NOT NULL,
        classification VARCHAR(50) NOT NULL,
        record_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabela imc_records criada com sucesso');

    // Criar índices para melhor performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_imc_user_id ON imc_records(user_id);
      CREATE INDEX IF NOT EXISTS idx_imc_record_date ON imc_records(record_date);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);
    console.log('✅ Índices criados com sucesso');

    console.log('\n🎉 Banco de dados inicializado com sucesso!');
    console.log('\n📝 Próximo passo: Inicie o servidor com "npm start"');

  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
  } finally {
    client.release();
    pool.end();
    process.exit(0);
  }
};

initializeDatabase();