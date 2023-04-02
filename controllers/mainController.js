import Ajv from 'ajv';
import autoBind from 'auto-bind';
import searchSchema from '../models/search.js';
import * as routesDao from '../database/routes.js';
import * as reservationsDao from '../database/reservations.js';
import * as jwtDecoder from '../utils/jwtDecoder.js';


const ajv = new Ajv();
const validateSearch = ajv.compile(searchSchema);

class Graph {
  constructor(routes, minPrice, maxPrice) {
    this.minPrice = minPrice;
    if (maxPrice === 0) {
      this.maxPrice = Number.MAX_SAFE_INTEGER;
    } else {
      this.maxPrice = maxPrice;
    }
    this.graph = {};
    const cities = new Set(routes.map((route) => route.startingPoint));
    cities.forEach((city) => {
      this.graph[city] = [];
    });
    routes.forEach((elem) => {
      const route = elem;
      route.visited = false;
      this.graph[route.startingPoint].push(route);
    });
    // a metodusokat az objektumhoz bind-olja
    autoBind(this);
  }

  DFS(u, destination, path, totalPrice, results, depth, maxDepth) {
    if (depth === maxDepth) {
      return;
    }
    // a path-bol popolva lesznek az objektumok, ezert kell egy ertek szerinti masolas
    if (u.destination === destination && totalPrice >= this.minPrice
      && totalPrice <= this.maxPrice) {
      results.push(Object.assign([], path));
      return;
    }
    const index = this.graph[u.startingPoint].findIndex((obj) => obj === u);
    this.graph[u.startingPoint][index].visited = true;

    this.graph[u.destination].forEach((route) => {
      if (!route.visited && route.departureTime >= u.arrivalTime
        && route.departureDay === u.departureDay) {
        path.push(route);
        this.DFS(
          route,
          destination,
          path,
          totalPrice + route.ticketPrice,
          results,
          depth + 1,
          maxDepth,
        );
        path.pop();
      }
    });
    this.graph[u.startingPoint][index].visited = false;
  }

  findPaths(start, end, maxDepth) {
    const results = [];
    this.graph[start].forEach((station) => {
      this.DFS(station, end, [station], station.ticketPrice, results, 0, maxDepth);
    });
    results.forEach((route) => {
      route.forEach((elem) => {
        const station = elem;
        delete station.visited;
      });
    });
    results.sort((a, b) => a.length - b.length);
    return results;
  }
}

function summarizeRoutes(routes) {
  routes.forEach((route) => {
    const travelTime = { hour: 0, minute: 0 };
    const depTime = route[0].departureTime.split(':').map(Number);
    const arrTime = route[route.length - 1].arrivalTime.split(':').map(Number);
    travelTime.hour += arrTime[0] - depTime[0];
    travelTime.minute += arrTime[1] - depTime[1];
    if (travelTime.minute < 0) {
      travelTime.hour -= 1;
      travelTime.minute += 60;
    }
    let ticketPrice = 0;
    route.forEach((elem) => {
      ticketPrice += elem.ticketPrice;
    });
    const total = {
      routeId: route.length > 1 ? undefined : route[0].routeId,
      startingPoint: route[0].startingPoint,
      destination: route[route.length - 1].destination,
      departureDay: route[0].departureDay,
      departureTime: route[0].departureTime,
      arrivalTime: route[route.length - 1].arrivalTime,
      ticketPrice,
      travelTime,
    };

    route.unshift(total);
  });
}

function determineBoughtTickets(routes, reservations) {
  for (let route of routes) {
    let isBought = true;
    for (let i = 1; i < route.length; ++i) {
        if (!reservations.includes(route[i].routeId)) {
        isBought = false;
        break;
      }
    }
    if (isBought) {
      route[0].bought = true;
    } else {
      route[0].bought = false;
    }
  }
}

// fooldalon levo tablat feltolti
export const fillTable = async (req, res) => {
  try {
    let routes = await routesDao.getRoutes();
    routes = routes.map((elem) => [elem]);
    summarizeRoutes(routes);

    // determine which tickets are already bought
    const payload = jwtDecoder.decodeJWTToken(req);

    if (payload) {
      let reservations = await reservationsDao.getReservationIDsForUser(payload.userId);
      determineBoughtTickets(routes, reservations);
    }
    res.render('index', { data: routes, errorMessage: undefined });
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
};

// keresesi form kezelese
export const filterTable = async (req, res) => {
  const search = {
    startingPoint: req.body['starting-point'],
    destination: req.body.destination,
    minPrice: Number(req.body['min-price'], 10),
    maxPrice: Number(req.body['max-price'], 10),
  };
  try {
    let routes = [];
    const valid = validateSearch(search);
    if (!valid) {
      res.status(422).render('index', { data: routes, errorMessage: 'Invalid form input' });
      return;
    }
    // minimum ar nem lehet nagyobb a max arnal (az osszehasonlitashoz egyik mezo se lehet ures)
    if (search.minPrice !== 0 && search.maxPrice !== 0) {
      if (search.minPrice > search.maxPrice) {
        res.status(422).render('index', { data: routes, errorMessage: 'Invalid form input' });
        return;
      }
    }
    // atszallasos kereseshez mindket vegpont meg kell legyen adva
    if (search.startingPoint === '' || search.destination === '') {
      routes = await routesDao.filterRoutes(search);
      routes = routes.map((elem) => [elem]);
    } else {
      routes = await routesDao.getRoutes();
      const a = new Graph(routes, search.minPrice, search.maxPrice);
      routes = a.findPaths(search.startingPoint, search.destination, 3);
    }
    summarizeRoutes(routes);

    // determine which tickets are already bought
    const payload = jwtDecoder.decodeJWTToken(req);
    if (payload) {
      let reservations = await reservationsDao.getReservationIDsForUser(payload.userId);
      determineBoughtTickets(routes, reservations);
    }
    res.render('index', { data: routes, errorMessage: undefined });
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
};
