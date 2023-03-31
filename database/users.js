import dbConnection from './connection.js';

export const existsUsername = async (username) => {
  try {
    const results = await dbConnection.executeQuery(`SELECT count(*) FROM users
      WHERE username = ?`, [username]);
    return results[0]['count(*)'] > 0;
  } catch (err) {
    return err;
  }
};

export const getUsers = async () => {
  try {
    const results = await dbConnection.executeQuery('SELECT * FROM users');
    return results;
  } catch (err) {
    return err;
  }
};

export const getUser = async (username) => {
  try {
    const results = await dbConnection.executeQuery(`SELECT * FROM users
      WHERE username = ?`, [username]);
    return results[0];
  } catch (err) {
    return err;
  }
};

export const insertNewUser = async (user) => {
  try {
    dbConnection.executeQuery(`INSERT INTO users(userId,
      username, password, role) VALUES (?, ?, ?, ?)`, Object.values(user));
    return `Successfully inserted user: ${user.userId}`;
  } catch (err) {
    return err;
  }
};

export const getUserIdByUsername = async (username) => {
  try {
    const results = await dbConnection.executeQuery(`SELECT userId FROM users
      WHERE username = ?`, [username]);
    return results[0].userId;
  } catch (err) {
    return err;
  }
};
