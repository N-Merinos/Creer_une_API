const mongoose = require('mongoose');

// Schéma définissant la structure d'un catway (appontement) en base de données
const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est obligatoire'],
    unique: true // Chaque catway a un numéro unique
  },
  catwayType: {
    type: String,
    required: [true, 'Le type de catway est obligatoire'],
    enum: ['long', 'short'] // Seules ces deux valeurs sont acceptées
  },
  catwayState: {
    type: String,
    required: [true, 'L\'état du catway est obligatoire'],
    trim: true // Supprime les espaces inutiles
  }
}, { timestamps: true }); // timestamps ajoute automatiquement createdAt (date et heure de création) et 
                        // updatedAt (date et heure de modification)

module.exports = mongoose.model('Catway', catwaySchema);