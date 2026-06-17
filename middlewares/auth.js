const jwt = require('jsonwebtoken');

// Middleware qui vérifie si l'utilisateur est bien connecté
// Il s'exécute avant chaque route protégée
const authMiddleware = (req, res, next) => {
  try {
    // On récupère le token dans le header de la requête
    // Le client doit envoyer : Authorization: Bearer <token>
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Accès refusé, token manquant' });
    }

    // On vérifie que le token est valide et non expiré
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // On ajoute les infos de l'utilisateur à la requête pour les routes suivantes
    req.user = decoded;

    next(); // On passe à la route suivante
  } catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = authMiddleware;