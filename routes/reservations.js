const express = require('express');
const router = express.Router({ mergeParams: true });
const Reservation = require('../models/reservation');

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations d'un catway
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des réservations du catway
 *       401:
 *         description: Non autorisé
 */
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Récupérer une réservation en particulier
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la réservation
 *       404:
 *         description: Réservation non trouvée
 */
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

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Créer une réservation pour un catway
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 */
router.post('/', async (req, res) => {
  try {
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

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   put:
 *     summary: Modifier une réservation
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation modifiée avec succès
 *       404:
 *         description: Réservation non trouvée
 */
router.put('/:idReservation', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.idReservation,
      req.body,
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

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation non trouvée
 */
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