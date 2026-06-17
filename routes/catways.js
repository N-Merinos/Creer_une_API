const express = require('express');
const router = express.Router();
const Catway = require('../models/catway');

// GET /catways - Récupérer tous les catways
router.get('/', async (req, res) => {
  try {
    // find() sans paramètre récupère tous les documents de la collection
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// GET /catways/:id - Récupérer un catway par son numéro
// :id est un paramètre dynamique, ex: /catways/5 → req.params.id = 5
router.get('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// POST /catways - Créer un nouveau catway
router.post('/', async (req, res) => {
  try {
    // On crée un nouveau catway avec les données envoyées par le client
    const catway = new Catway(req.body);
    await catway.save(); // On sauvegarde en base
    res.status(201).json({ message: 'Catway créé avec succès', catway });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// PUT /catways/:id - Modifier l'état d'un catway
router.put('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id }, // On cherche par numéro
      { catwayState: req.body.catwayState }, // On ne modifie que l'état (pas le numéro ni le type)
      { new: true } // Retourne le document après modification
    );
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json({ message: 'Catway modifié avec succès', catway });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// DELETE /catways/:id - Supprimer un catway
router.delete('/:id', async (req, res) => {
  try {
    // findOneAndDelete trouve et supprime en une seule opération
    const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json({ message: 'Catway supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

module.exports = router;