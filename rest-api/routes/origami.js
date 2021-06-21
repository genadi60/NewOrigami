const controller = require('../controllers/origami');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controller.get.getAll);

router.post('/', auth(), controller.post.create);

router.put('/:id', auth(), controller.put.update);

router.delete('/:id', auth(), controller.delete.deleteOrigami);

module.exports = router;