const Evento = require('../models/Evento');

const getAllEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().sort({ dataHoraInicio: 1 });
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar eventos', error: error.message });
  }
};

const getEventoById = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o evento', error: error.message });
  }
};

const createEvento = async (req, res) => {
  const { titulo, descricao, cidade, local, dataHoraInicio, dataHoraFim, imagemUrl } = req.body;

  try {
    const novoEvento = new Evento({
      titulo,
      descricao,
      cidade,
      local,
      dataHoraInicio,
      dataHoraFim,
      imagemUrl,
    });

    const eventoSalvo = await novoEvento.save();
    res.status(201).json(eventoSalvo);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar evento', error: error.message });
  }
};

const updateEvento = async (req, res) => {
  try {
    const eventoAtualizado = await Evento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!eventoAtualizado) {
      return res.status(404).json({ message: 'Evento não encontrado para atualizar.' });
    }

    res.status(200).json(eventoAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar evento', error: error.message });
  }
};

const deleteEvento = async (req, res) => {
  try {
    const eventoDeletado = await Evento.findByIdAndDelete(req.params.id);

    if (!eventoDeletado) {
      return res.status(404).json({ message: 'Evento não encontrado para deletar.' });
    }
    
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar evento', error: error.message });
  }
};

module.exports = {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
};
