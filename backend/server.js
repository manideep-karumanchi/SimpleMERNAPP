require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));
app.use(express.json());

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rollNo: { type: String, required: true, unique: true, trim: true },
    branch: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1, max: 4 }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

app.get("/", (req, res) => {
  res.json({ message: "Simple MERN Student API is running." });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students." });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const { name, rollNo, branch, year } = req.body;

    if (!name || !rollNo || !branch || !year) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const student = await Student.create({
      name,
      rollNo,
      branch,
      year
    });

    res.status(201).json(student);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Roll number already exists." });
    }

    res.status(500).json({ message: "Failed to add student." });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({ message: "Student deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: "Invalid student ID." });
  }
});

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not configured.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
