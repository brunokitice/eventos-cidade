// Importando as dependências
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();

app.use(cors());
app.use(express.json());

const eventosRoutes = require('./routes/eventosRoutes');
app.use('/api/eventos', eventosRoutes);

app.get('/', (req, res) => {
  res.send('API de Eventos funcionando!');
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();

    await mongoose.connect(mongoURI);
    console.log('Conectado ao MongoDB em memória!');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
}

startServer();
