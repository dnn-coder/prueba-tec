const { app } = require('./app');
const { Employee } = require('./models/employee.model');
const { Solicitude } = require('./models/solicitude.model');
const { db } = require('./utils/database.util');

db.authenticate()
  .then(() => console.log('Database Authenticated...'))
  .catch(err => console.log(err));

//establecer relaciones de las entidades
//1 Empleado puede tener muchas solicitudes <-1:N-> 1 solicitud solo la puuede hacer un unico empleado

Employee.hasMany(Solicitude, { foreignKey: 'id_employee' });
Solicitude.belongsTo(Employee);

db.sync()
  .then(() => console.log('Database Synced...'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Express App Running in port 4000... ');
});
