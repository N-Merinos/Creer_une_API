const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schéma définissant la structure d'un utilisateur en base de données
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est obligatoire'],
    trim: true // Supprime les espaces inutiles
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true, // Deux utilisateurs ne peuvent pas avoir le même email
    trim: true,
    lowercase: true // Stocke toujours en minuscules
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  }
}, { timestamps: true }); // timestamps ajoute automatiquement createdAt (date et heure de création) et 
                        // updatedAt (date et heure de modification)

// Middleware qui s'exécute automatiquement avant chaque sauvegarde
// Son rôle est de hasher le mot de passe pour ne jamais le stocker en clair
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Si le mot de passe n'a pas changé, on passe
  this.password = await bcrypt.hash(this.password, 10); // 10 = niveau de complexité du hash
  next();
});

module.exports = mongoose.model('User', userSchema);