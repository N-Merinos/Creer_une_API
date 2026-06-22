const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port de Plaisance Russell',
      version: '1.0.0',
      description: 'API de gestion des réservations de catways du port de plaisance Russell',
    },
    servers: [
      
      {
    url: 'https://port-russel-2m8c.onrender.com',
    description: 'Serveur de production',
      },

      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // On documente directement dans les fichiers de routes
};

module.exports = swaggerJsdoc(options);