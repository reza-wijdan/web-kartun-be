import Movie from "../models/movie.js";


export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      title: req.body.title,
      desc: req.body.desc,
      genre: req.body.genre,
      year: req.body.year,
      imagePath: `${req.protocol}://${req.get('host')}/${req.file.path}`
    })
    res.status(201).json({
      message: "Berhasil tambah movie",
      data: movie
    })
  } catch(error) {
    res.status(404).json({
      message: error.message
    })
  }
};

export const updateMovie = async (req, res) => {
  try {
    await Movie.update({
      title: req.body.title,
      desc: req.body.desc,
      genre: req.body.genre,
      year: req.body.year,
      imagePath: `${req.protocol}://${req.get('host')}/${req.file.path}`
    },{
      where: {
        id: req.params.id
      }
    })
    res.status(201).json({
      message: "Berhasil edit movie",
    })
  } catch(error) {
    res.status(404).json({
      message: error.message
    })
  }
}

export const getMovie = async (req, res) => {
  try {
    const response = await Movie.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMovieById = async(req, res) => {
  const id = req.body.id;
  try {
    const response = await Movie.findOne(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const deleteMovie = async(req, res) =>{
  try {
      await Movie.destroy({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Movie Deleted"});
  } catch (error) {
      console.log(error.message);
  }
}
