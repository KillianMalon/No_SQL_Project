import express from 'express'
import { registerView, loginView} from '../controllers/auth.js'

const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.post('/register', registerView);
router.post('/login', loginView);


export default router