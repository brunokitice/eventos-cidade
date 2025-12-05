const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/EventoController');

router.get('/', EventoController.getAllEventos);
router.post('/', EventoController.createEvento);
router.get('/:id', EventoController.getEventoById);
router.put('/:id', EventoController.updateEvento);
router.delete('/:id', EventoController.deleteEvento);

module.exports = router;
