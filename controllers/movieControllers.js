import multer from "multer";
import Movie from "../models/movie.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    const filename = uniqueSuffix + "." + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage }).single("image");

export const createMovie = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const { title, year, genre } = req.body;
      const imagePath = req.file ? req.file.path : "";

      const movie = await Movie.create({ title, year, genre, imagePath });

      res.json({ movie });
    } catch (error) {
      console.error("Error creating movie:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

export const getMovie = async (req, res) => {
  try {
    const response = await Movie.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
