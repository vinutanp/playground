import express from 'express';
import { handleUserInput, userLogin } from '../controllers/user.js';

const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', handleUserInput);
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', userLogin);

export default router;
