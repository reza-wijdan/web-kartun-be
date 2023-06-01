import express from "express";
import cors from "cors";
import MovieRoutes from "./routes/MovieRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(MovieRoutes);

app.listen(5000, ()=> console.log('Server up and running...'));