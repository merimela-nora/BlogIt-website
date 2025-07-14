import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route";
import blogRouter from "./routes/blog.route";
import dotenv from "dotenv";


const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://blog-it-website-rho.vercel.app/", 
    credentials: true,               
    methods: ["POST", "DELETE", "GET", "PUT", "PATCH"],
  })
);


app.use("/auth", authRouter);
app.use("/blogs", blogRouter);


// home route
app.get("/", (_req, res) => {
  res.send("<h1> welcome to BlogIt api</h1>");
});

// server
const port = process.env.PORT || 5454;

app.listen(port, () => console.log(`the app is running on ${port}`));
