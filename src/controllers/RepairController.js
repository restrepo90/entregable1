const Repair = require('../models/repairModel');

const RepairController = {
  getPendingRepairs: async (req, res) => {
    try {
      const pendingRepairs = await Repair.findAll({ where: { status: 'pending' } });
      res.json(pendingRepairs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de reparaciones pendientes' });
    }
  },

  getRepairById: async (req, res) => {
    const repairId = req.params.id;

    try {
      const repair = await Repair.findByPk(repairId);

      if (!repair) {
        return res.status(404).json({ error: 'Reparación no encontrada' });
      }

      res.json(repair);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la reparación' });
    }
  },

  createRepair: async (req, res) => {
    const { date, userId } = req.body;

    try {
      const newRepair = await Repair.create({ date, userId });

      res.status(201).json(newRepair);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear una nueva reparación' });
    }
  },

  completeRepair: async (req, res) => {
    const repairId = req.params.id;

    try {
      const repair = await Repair.findByPk(repairId);

      if (!repair) {
        return res.status(404).json({ error: 'Reparación no encontrada' });
      }

      repair.status = 'completed';

      await repair.save();

      res.json({ message: 'Reparación completada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al completar la reparación' });
    }
  },

  cancelRepair: async (req, res) => {
    const repairId = req.params.id;

    try {
      const repair = await Repair.findByPk(repairId);

      if (!repair) {
        return res.status(404).json({ error: 'Reparación no encontrada' });
      }

      repair.status = 'cancelled';

      await repair.save();

      res.json({ message: 'Reparación cancelada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cancelar la reparación' });
    }
  },
};

module.exports = RepairController;
