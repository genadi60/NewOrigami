const controller = require('../controllers/user');
const router = require('express').Router();

router.get('/check', controller.get.check);

router.get('/:id', controller.get.find);

router.post('/register', controller.post.register);

router.post('/login', controller.post.login);

//router.post('/logout', controller.post.logout);

router.put('/:id', controller.put.update);

router.delete('/:id', controller.delete.deleteUser);

module.exports = router;