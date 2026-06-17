const express = require('express');

const router = express.Router(); // Mini-app Express pour grouper les routes d'authentification

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

// POST /login - Connexion d'un utilisateur
router.post('/login', async (req, res) => {
  try {
    // On récupère email et password envoyés par le client
    const { email, password } = req.body;

    // On cherche l'utilisateur en base par son email
    const user = await User.findOne({ email });
    if (!user) {
      // On ne précise pas si c'est l'email ou le mot de passe qui est faux (sécurité)
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // On compare le mot de passe saisi avec le hash stocké en base
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Si tout est bon on génère un token JWT (badge d'accès)
    // Il contient l'id et l'email de l'utilisateur, expire après 24h
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// GET /logout - Déconnexion
// Le token est supprimé côté client, on confirme juste la déconnexion
router.get('/logout', (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie' });
});

module.exports = router;