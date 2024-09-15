import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { fetchUserProfile } from "./fetchUserProfile.js";
import { readFile } from "fs/promises";
import path from "path";

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.get("/", async (req, res) => {
    try {
        const filePath = path.join(process.cwd(), "landing.html");
        const content = await readFile(filePath, "utf8");
        res.send(content);
    } catch (err) {
        console.error("Error reading landing page:", err);
        res.status(500).send("Error loading landing page");
    }
});

app.get("/:username", fetchUserProfile);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
