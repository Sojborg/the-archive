import { login } from "../controllers/loginController";

var express = require('express');
var router = express.Router();

router.post('/', login);


export default router;