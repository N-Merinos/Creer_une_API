const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /users - Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    // On exclut le mot de passe des résultats pour des raisons de sécurité
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// GET /users/:email - Récupérer un utilisateur par son email
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// POST /users - Créer un utilisateur
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save(); // Le middleware pre('save') hashera automatiquement le mot de passe
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// PUT /users/:email - Modifier un utilisateur
router.put('/:email', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur modifié avec succès', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// DELETE /users/:email - Supprimer un utilisateur
router.delete('/:email', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

module.exports = router;