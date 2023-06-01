import express from 'express';
import {getMovie, createMovie } from '../controllers/movieControllers.js';


const router = express.Router();

router.get('/getMovie', getMovie );
router.post('/movie', createMovie); 

export default router;
