require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Import des routes
const authRoutes = require('./routes/auth');
const catwayRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users');

const app = express();

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Branchement des routes
app.use('/', authRoutes);
app.use('/catways', catwayRoutes);
app.use('/catways/:id/reservations', reservationRoutes);
app.use('/users', userRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;