import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; // Import multer
import chat from "./chat.js";

dotenv.config();

const app = express();
app.use(cors());

// Configure multer: where it is saved
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// Key : value
const upload = multer({ storage: storage });

const PORT = 5001;

let filePath;
// RESTful - what does the API do? You should be able to describe it in one sentence
// GET/POST/DELETE/PATCH/UPDATE
// status code 200, 401, 404, 500
// input payload? param?
// output

// end points: post, get
app.post("/upload", upload.single("file"), async (req, res) => {
  // Use multer to handle file upload
  filePath = req.file.path; // The path where the file is temporarily saved
  res.send(filePath + " upload successfully.");
});

app.get("/chat", async (req, res) => {
  const resp = await chat(req.query.question, filePath); // Pass the file path to your main function
  res.send(resp.text);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
