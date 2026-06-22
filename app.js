require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authMiddleware = require('./middlewares/auth');

// Import des routes
const authRoutes = require('./routes/auth');
const catwayRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Servir les fichiers statiques du dossier public
app.use(express.static('public'));

// Routes publiques (pas besoin d'être connecté)
app.use('/', authRoutes);

// Routes protégées (token JWT obligatoire)
app.use('/catways', authMiddleware, catwayRoutes);
app.use('/catways/:id/reservations', authMiddleware, reservationRoutes);
app.use('/users', authMiddleware, userRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;