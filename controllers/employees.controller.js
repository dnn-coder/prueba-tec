const { Employee } = require('../models/employee.model');
const { Solicitude } = require('../models/solicitude.model');
const { catchAsync } = require('../utils/catchAsync.util');

const createEmployee = catchAsync(async (req, res, next) => {
  const { date, name, salary } = req.body;
  const newEmployee = await Employee.create({
    date,
    name,
    salary,
  });

  res.status(200).json({
    status: 'success',
    newEmployee,
  });
});

const getAllEmployees = catchAsync(async (req, res, next) => {
  const employees = await Employee.findAll({
    attributes: ['date', 'name', 'salary'],
    include: [
      {
        model: Solicitude,
        attributes: ['code', 'description', 'resume'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'find employees',
    employees,
  });
});

const getEmployeeById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ where: { id } });

  if (!employee) {
    return res.status(404).json({
      status: 'error',
      message: 'employee not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'find employee',
    employee,
  });
});

const updateEmployee = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { date, name, salary } = req.body;
  const employee = await Employee.findOne({ where: { id } });

  if (!employee) {
    return res.status(404).json({
      status: 'error',
      message: 'employee not found',
    });
  }

  await Employee.update({
    date,
    name,
    salary,
  });

  res.status(200).json({
    status: 'success',
    message: 'employee updated',
    employee,
  });
});

const deleteEmployee = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const employee = await Employee.findOne({ where: { id } });

  if (!employee) {
    return res.status(404).json({
      status: 'error',
      message: 'usuario no encontrado',
    });
  }

  await Employee.update({
    status: 'eliminado',
  });

  res.status(200).json({
    status: 'success',
    message: 'employee eliminado',
    employee,
  });
});

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
