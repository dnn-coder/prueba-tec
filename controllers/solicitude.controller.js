const { Solicitude } = require('../models/solicitude.model');
const { Employee } = require('../models/employee.model');
const { catchAsync } = require('../utils/catchAsync.util');

const getAllSolicitudes = catchAsync(async (req, res, next) => {
  const solicitudes = await Solicitude.findAll({
    include: [
      {
        model: Employee,
        attributes: ['date', 'name', 'salary'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'find solicitudes',
    solicitudes,
  });
});

const createSolicitude = catchAsync(async (req, res, next) => {
  const { code, description, resume, id_employee } = req.body;
  const solicitude = await Solicitude.create({
    code,
    description,
    resume,
    id_employee,
  });

  res.status(200).json({
    status: 'success',
    solicitude,
  });
});

const getSolicitudeById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const solicitude = await Solicitude.findOne({ where: { id } });

  if (!solicitude) {
    return res.status(404).json({
      status: 'error',
      message: 'solicitude not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'find solicitude',
    solicitude,
  });
});

const updateSolicitude = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { code, description, resume, employee_id } = req.body;
  const solicitude = await Solicitude.findOne({ where: { id } });

  if (!solicitude) {
    return res.status(404).json({
      status: 'error',
      message: 'solicitude not found',
    });
  }

  await Solicitude.update({
    code,
    description,
    resume,
    employee_id,
  });

  res.status(200).json({
    status: 'success',
    message: 'solicitude updated',
    solicitude,
  });
});

const deleteSolicitude = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const solicitude = await Solicitude.findOne({ where: { id } });

  if (!solicitude) {
    return res.status(404).json({
      status: 'error',
      message: 'solicitude not found',
    });
  }

  await Solicitude.update({
    status: 'deleted',
  });

  res.status(200).json({
    status: 'success',
    message: 'solicitude deleted',
    solicitude,
  });
});

module.exports = {
  createSolicitude,
  getAllSolicitudes,
  getSolicitudeById,
  updateSolicitude,
  deleteSolicitude,
};
