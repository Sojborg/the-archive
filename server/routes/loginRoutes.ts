import { login, signUp } from "../controllers/loginController";

var express = require('express');
var router = express.Router();

router.post('/signup', signUp);
router.post('/', login);

export default router;