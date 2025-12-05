const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O campo título é obrigatório.'],
    trim: true,
  },
  descricao: {
    type: String,
    required: [true, 'O campo descrição é obrigatório.'],
  },
  cidade: {
    type: String,
    required: [true, 'O campo cidade é obrigatório.'],
  },
  local: {
    type: String,
    required: [true, 'O campo local é obrigatório.'],
  },
  dataHoraInicio: {
    type: Date,
    required: [true, 'A data e hora de início são obrigatórias.'],
  },
  dataHoraFim: {
    type: Date,
    required: [true, 'A data e hora de fim são obrigatórias.'],
  },
  imagemUrl: {
    type: String,
    required: false,
    default: 'https://picsum.photos/seed/default/600/400',
  },
}, {
  timestamps: true,
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;
