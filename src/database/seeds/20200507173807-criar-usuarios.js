const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        nome: 'John',
        email: 'johnericjahn@gmail.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'John1',
        email: 'johnericjahn1@gmail.com',
        password_hash: await bcrypt.hash('654321', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'John2',
        email: 'johnericjahn2@gmail.com',
        password_hash: await bcrypt.hash('123456654321', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),
  down: () => { },
};
