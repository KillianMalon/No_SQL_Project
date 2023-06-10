import express from 'express'
import { registerView, loginView} from '../controllers/auth.js'

// This is the route for the auth route
// It is a GET request to the /auth path
const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.post('/register', registerView);
router.post('/login', loginView);


export default router