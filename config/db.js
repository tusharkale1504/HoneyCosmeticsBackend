const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('HoneyCosmetics', 'postgres', 'tushar@2003', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false, 
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully.');
  })
  .catch((error) => {
    console.error('❌ Unable to connect to the database:', error);
  });


module.exports = sequelize;
