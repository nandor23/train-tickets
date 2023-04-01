import dbConnection from './connection.js';

export const existsReservation = async (userId, routeId) => {
  try {
    const results = await dbConnection.executeQuery(`SELECT count(*) FROM
    reservations WHERE userId = ? AND routeId = ?`, [userId, routeId]);
    return results[0]['count(*)'] > 0;
  } catch (err) {
    return err;
  }
};

export const insertNewReservation = async (userId, routeId) => {
  try {
    await dbConnection.executeQuery(`INSERT INTO reservations(userId, routeId)
      VALUES (?, ?)`, [userId, routeId]);
    return `Successfully inserted reservation with ID (${userId},${routeId}})`;
  } catch (err) {
    return err;
  }
};

export const getReservationsToRoute = async (routeId) => {
  try {
    const results = await dbConnection.executeQuery(`SELECT u.userId, username 
      FROM reservations AS r
      JOIN users AS u on r.userId = u.userId
      WHERE routeId = ?`, [routeId]);
    return results;
  } catch (err) {
    return err;
  }
};

export const deleteReservation = async (userId, routeId) => {
  try {
    await dbConnection.executeQuery(`DELETE FROM reservations
      WHERE userId = ? AND routeId = ?`, [userId, routeId]);
    return `Successfully deleted reservation with ID (${userId},${routeId}})`;
  } catch (err) {
    return err;
  }
};

export const getReservationsForUser = async (userId) => {
  try {
    const results = await dbConnection.executeQuery(`SELECT routeId FROM reservations 
      WHERE userId = ?`, [userId]);
    const values = [];
    for (let result of results) {
      values.push(result.routeId);
    }
    return values;
  } catch (err) {
    return err;
  }
}
