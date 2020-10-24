import { addbooktolist, books, numberofbooks, removebook, savebook, searchbook } from "../controllers/bookController";

var express = require('express');
var router = express.Router();

router.post('/', books);

router.get('/numberofbooks', numberofbooks);

router.post('/addbooktolist', addbooktolist);

router.post('/savebook', savebook);

router.post('/removebook', removebook);

router.get('/searchbook', searchbook);

export default router;