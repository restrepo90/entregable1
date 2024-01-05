const express = require('express');
const router = express.Router();
const RepairController = require('../controllers/RepairController');


router.get('/', RepairController.getPendingRepairs);
router.get('/:id', RepairController.getRepairById);



router.post('/', RepairController.createRepair);

router.patch('/:id', RepairController.completeRepair);

router.delete('/:id', RepairController.cancelRepair);

module.exports = router;
