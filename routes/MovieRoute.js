import express from 'express';
import {getMovie, createMovie, deleteMovie, updateMovie, getMovieById, searchMovie } from '../controllers/movieControllers.js';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    } 
  });
  
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/getMovie', getMovie );
router.post('/detailMovie', getMovieById );
router.post('/movie', upload.single('imagePath'), createMovie); 
router.put('/movie/:id', upload.single('imagePath'), updateMovie);
router.delete('/movie/hapus/:id', deleteMovie);
router.get('/movie/search', searchMovie);

export default router;
