import express from 'express';

import { signup, 
    signin,
    signout,
} from '../controllers/auth.controller.js';

import { jsonValidator, userSignupSchema } from '../middlewares/validators.js';
const router = express.Router();

router.post('/signup', jsonValidator({body: userSignupSchema}), signup);
router.post('/signin', jsonValidator({body: userSignupSchema}), signin);
router.get('/signout', signout);

export default router;