import { Router } from 'express';
import { UserController } from './controllers/UserController';
const userController = new UserController();
import passport from 'passport';


const router = Router();

router.post('/user', async (req, res) => {
    try {
        const result = await userController.createUser(req.body)
        res.status(200).send(result)
    } catch (error) {
        console.error(error)
    }
});

router.get('/users', async (req, res) => {
    const result = await userController.findUsers()
    res.status(200).send(result)
 })

router.get('/user/:userId', passport.authenticate('bearer', {session: false}), async (req,res) =>{
    const result = await userController.findUserById(req.params.userId)
    res.status(200).send(result)
})

router.put('/user/:userId', async (req, res) => {
    const result = await userController.updateUserById(req.params.userId, req.body)
    res.status(200).send(result)
})

router.delete('/user/:userId', async (req, res) => {
    const result = await userController.deleteUserById(req.params.userId)
    res.status(200).send(result)
})
     
router.post('/user/login', passport.authenticate('local', {session: false}) , async(req,res) => {
    res.set('Authorization', await userController.login(req.body) )
    res.status(204).send()
});


export { router }
