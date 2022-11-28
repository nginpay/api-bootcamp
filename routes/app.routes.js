module.exports = app => {
    const router = require('express').Router();
    const auth = require('../middleware/auth')

    const AppController = require('../controllers/app.controller')
    const UserController = require('../controllers/user.controller')

    router.get('/', AppController.hello)
    router.get('/users', auth, UserController.listAllUsers)
    router.post('/users', UserController.createUsers)
    router.get('/users/:id', UserController.userDetails)
    router.delete('/users/:id', UserController.deleteUser)
    router.patch('/users/:id', UserController.updatePathUser)
    router.post('/login', UserController.loginUser)

    app.use('/api', router)
}