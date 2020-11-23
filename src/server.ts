import app from './app';
import database from './database';

// database.sync({force: true}); Para a primeira que criar a tabela
database.sync();

console.log('Database running at 3306')

app.listen(3000);
console.log('Server runnig at 3000');
