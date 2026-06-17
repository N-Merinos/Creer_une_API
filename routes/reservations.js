const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams permet d'accéder aux paramètres du router parent (catwayNumber)
const Reservation = require('../models/reservation');

// GET /catways/:id/reservations - Récupérer toutes les réservations d'un catway
router.get('/', async (req, res) => {
  try {
    // On filtre les réservations par le numéro de catway récupéré dans l'URL
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// GET /catways/:id/reservations/:idReservation - Récupérer une réservation en particulier
router.get('/:idReservation', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// POST /catways/:id/reservations - Créer une réservation pour un catway
router.post('/', async (req, res) => {
  try {
    // On ajoute automatiquement le numéro de catway depuis l'URL
    const reservation = new Reservation({
      ...req.body,
      catwayNumber: req.params.id
    });
    await reservation.save();
    res.status(201).json({ message: 'Réservation créée avec succès', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// PUT /catways/:id/reservations - Modifier une réservation
router.put('/:idReservation', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.idReservation,
      req.body, // On met à jour avec toutes les données envoyées
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json({ message: 'Réservation modifiée avec succès', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// DELETE /catways/:id/reservations/:idReservation - Supprimer une réservation
router.delete('/:idReservation', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

module.exports = router;