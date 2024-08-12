const express = require('express');

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employees.controller');

// const {
//   createUserValidators,
// } = require('../middlewares/usersValidation.middleware');

const employeesRouter = express.Router();

employeesRouter.get('/', getAllEmployees);

employeesRouter.post('/', createEmployee);

employeesRouter.get('/:id', getEmployeeById);

employeesRouter.patch('/:id', updateEmployee);

employeesRouter.delete('/:id', deleteEmployee);

module.exports = { employeesRouter };
