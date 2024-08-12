const express = require('express');

const {
  createSolicitude,
  getAllSolicitudes,
  getSolicitudeById,
  updateSolicitude,
  deleteSolicitude,
} = require('../controllers/solicitude.controller');

// const {
//   createUserValidators,
// } = require('../middlewares/usersValidation.middleware');

const solicitudesRouter = express.Router();

solicitudesRouter.get('/', getAllSolicitudes);

solicitudesRouter.post('/', createSolicitude);

solicitudesRouter.get('/:id', getSolicitudeById);

solicitudesRouter.patch('/:id', updateSolicitude);

solicitudesRouter.delete('/:id', deleteSolicitude);

module.exports = { solicitudesRouter };
