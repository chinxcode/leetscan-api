import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { fetchUserProfile } from "./fetchUserProfile.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.sendFile(path.join(__dirname, "public", "index.html"));
    res.sendFile(path.join(__dirname, "public", "styles.css"));
});

app.get("/:username", fetchUserProfile);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
