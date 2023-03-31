import dbConnection from './connection.js';

export const existsRouteId = async (id) => {
  try {
    const results = await dbConnection.executeQuery(`SELECT count(*) FROM routes 
      WHERE routeId = ?`, [id]);
    return results[0]['count(*)'] > 0;
  } catch (err) {
    return err;
  }
};

export const insertNewRoute = async (route) => {
  try {
    await dbConnection.executeQuery(`INSERT INTO routes(routeId, startingPoint,
      destination, departureDay, departureTime, arrivalTime, ticketPrice, 
      trainType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, Object.values(route));
    return `Successfully inserted route with ID (${route.routeId}`;
  } catch (err) {
    return err;
  }
};

export const filterRoutes = async (search) => {
  let query = `SELECT * FROM routes WHERE startingPoint LIKE ? AND
    destination LIKE ?`;
  const parameters = [];

  if (search.startingPoint !== '') {
    parameters.push(`${search.startingPoint}%`);
  } else {
    parameters.push('%');
  }
  if (search.destination !== '') {
    parameters.push(`${search.destination}%`);
  } else {
    parameters.push('%');
  }
  if (search.minPrice !== 0) {
    query += ' AND ticketPrice >= ?';
    parameters.push(search.minPrice);
  }
  if (search.maxPrice !== 0) {
    query += ' AND ticketPrice <= ?';
    parameters.push(search.maxPrice);
  }
  try {
    const results = await dbConnection.executeQuery(query, parameters);
    return results;
  } catch (err) {
    return err;
  }
};

export const getRoutes = async () => {
  try {
    const results = await dbConnection.executeQuery('SELECT * FROM routes');
    return results;
  } catch (err) {
    return err;
  }
};

export const getRoutesId = async () => {
  try {
    const results = await dbConnection.executeQuery('SELECT routeId FROM routes');
    return results;
  } catch (err) {
    return err;
  }
};

export const getRouteInformationById = async (routeId) => {
  try {
    const results = await dbConnection.executeQuery(`SELECT * FROM routes
      WHERE routeId = ?`, [routeId]);
    return results[0];
  } catch (err) {
    return err;
  }
};
