import Movie from "../models/movie.js";
import { Op } from "sequelize";


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
  const Id = req.params.id;
  const updateAttr = req.body;

  try {
    const movie = await Movie.update(updateAttr, {where: { id: Id}});

    return res.status(200).json({ message: 'Movie berhasil diubah' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan dalam memperbarui movie' });
  }
  // try {
  //   await Movie.update({
  //     title: req.body.title,
  //     desc: req.body.desc,
  //     genre: req.body.genre,
  //     year: req.body.year,
  //     imagePath: `${req.protocol}://${req.get('host')}/${req.file.path}`
  //   },{
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //   res.status(201).json({
  //     message: "Berhasil edit movie",
  //   })
  // } catch(error) {
  //   res.status(404).json({
  //     message: error.message
  //   })
  // }
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
  res.set('Content-Type', 'application/json');
  const id = req.body.id;
  console.log(id)
  try {
    const response = await Movie.findAll({
      where: {
        id: id
      }
    });
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

export const searchMovie = async(req, res) => {
  const searchTerm = req.query.q;

  try {
    const response = await Movie.findAll({
      where: {
        [Op.or]: [{
          title : {
            [Op.like] : `%${searchTerm}%`
          }
        }]
      }
    });
    res.status(200).json(response);
  } catch(error) {
    console.log(error.message);
  }


  // try {
  //   const movie = await Movie.findAll({
  //     where: {
  //       [Op.or]: [{
  //         title : {
  //           [Op.like] : `%${search}%`
  //         }
  //       }]
  //     }
  //   });
  //   res.status(200).json(movie);
  // } catch (error) {
  //   console.log(error.message);
  // }

}
