import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import newRoute from './routes/newRoute.js';
import main from './routes/main.js';
import reservations from './routes/reservations.js';
import login from './routes/login.js';
import registration from './routes/registration.js';
import logout from './routes/logout.js';
import apiRoutes from './api/index.js';
import { decodeJWTToken, decodeJWTTokenPopup }  from './middleware/authentication.js';

const app = express();

app.use(cookieParser());

// EJS sablonmotor beallitasa
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// a static mappabol adjuk a HTML allomanyokat
app.use(express.static(path.join(process.cwd(), 'static')));

// feldolgozhatova teszi a body tartalmat
app.use(express.urlencoded({ extended: true }));

// formfeldolgozas router segitsegevel
app.use('/new-route', decodeJWTToken, newRoute);

// foglalas kezelese routerrel
app.use('/reservations', decodeJWTTokenPopup, reservations);

// bejelentkezes kezelese
app.use('/login', login);

app.use('/logout', logout);

// regisztracio kezelese
app.use('/registration', registration);

// fooldal kezelese routerrel
app.use('/', decodeJWTToken, main);

// API hivasok kezelese
app.use('/api', apiRoutes);

// barmilyen mas nem letezo utvonal
app.get('/*', (_req, res) => {
  res.status(404).send('This page can\'t be found');
});

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080/ ...');
});
