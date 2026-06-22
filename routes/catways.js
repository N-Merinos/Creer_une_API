const express = require('express');
const router = express.Router();
const Catway = require('../models/catway');

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupérer tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les catways
 *       401:
 *         description: Non autorisé
 */
// GET /catways - Récupérer tous les catways
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupérer un catway par son numéro
 *     tags: [Catways]
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
 *         description: Détails du catway
 *       404:
 *         description: Catway non trouvé
 */
// GET /catways/:id - Récupérer un catway par son numéro
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

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Créer un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *               catwayType:
 *                 type: string
 *                 enum: [long, short]
 *               catwayState:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catway créé avec succès
 */
// POST /catways - Créer un nouveau catway
router.post('/', async (req, res) => {
  try {
    const catway = new Catway(req.body);
    await catway.save();
    res.status(201).json({ message: 'Catway créé avec succès', catway });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifier l'état d'un catway
 *     tags: [Catways]
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
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway modifié avec succès
 *       404:
 *         description: Catway non trouvé
 */
// PUT /catways/:id - Modifier l'état d'un catway
router.put('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState: req.body.catwayState },
      { new: true }
    );
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json({ message: 'Catway modifié avec succès', catway });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
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
 *         description: Catway supprimé avec succès
 *       404:
 *         description: Catway non trouvé
 */
// DELETE /catways/:id - Supprimer un catway
router.delete('/:id', async (req, res) => {
  try {
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