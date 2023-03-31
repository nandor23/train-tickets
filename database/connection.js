import mysql from 'mysql2';
import autoBind from 'auto-bind';

export class DbConnection {
  constructor() {
    this.pool = mysql.createPool({
      database: 'train_db',
      host: 'localhost',
      port: 3306,
      user: 'nandor',
      password: '2001',
      connectionLimit: 5,
    });

    // a metodusokat az objektumhoz bind-olja
    autoBind(this);
  }

  executeQuery(query, options = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(query, options, (error, results) => {
        if (error) {
          reject(new Error(`Error while running '${query}: ${error}'`));
        }
        resolve(results);
      });
    });
  }
}

const createTables = async () => {
  // latin1_general_cs tipusuak az ID-k, emiatt case sensitive-ek, vagyis
  // kisbetu != nagybetu es a stringet ossze lehet hasonlitani '=' operatorral
  try {
    const dbConnection = new DbConnection();
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS routes (
      routeId varchar(10) collate latin1_general_cs, 
      startingPoint varchar(50),
      destination varchar(50),
      departureDay varchar(20),
      departureTime varchar(10),
      ticketPrice float,
      trainType varchar(50),
      CONSTRAINT PK_routes PRIMARY KEY (routeId));
    `);
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS users (
      userId varchar(20) collate latin1_general_cs,
      firstName varchar(40),
      lastName varchar(40),
      CONSTRAINT PK_users PRIMARY KEY (userId));
    `);
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS reservations (
      userId varchar(20) collate latin1_general_cs,
      routeId varchar(20) collate latin1_general_cs,
      CONSTRAINT PK_reservations PRIMARY KEY(userId, routeId),
      CONSTRAINT FK_reservations FOREIGN KEY (userId) REFERENCES users(userId),
      CONSTRAINT FK_reservations2 FOREIGN KEY (routeId) REFERENCES routes(routeId));
    `);
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }
};

// tablak letrehozasa (ha nem leteznek)
createTables();

export default new DbConnection();
