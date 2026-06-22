const mongoose = require('mongoose');

// Schéma définissant la structure d'une réservation en base de données
const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est obligatoire'] // Référence au catway réservé
  },
  clientName: {
    type: String,
    required: [true, 'Le nom du client est obligatoire'],
    trim: true
  },
  boatName: {
    type: String,
    required: [true, 'Le nom du bateau est obligatoire'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'La date de début est obligatoire']
  },
  endDate: {
    type: Date,
    required: [true, 'La date de fin est obligatoire']
  }
}, { timestamps: true }); // timestamps ajoute automatiquement createdAt (date et heure de création) et 
                        // updatedAt (date et heure de modification)

module.exports = mongoose.model('Reservation', reservationSchema);