import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { fetchUserProfile, fetchMultipleUserProfiles } from "./fetchUserProfile.js";
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

app.set("trust proxy", 1);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.sendFile(path.join(__dirname, "public", "index.html"));
    res.sendFile(path.join(__dirname, "public", "styles.css"));
});

app.get("/:username", fetchUserProfile);

app.post("/multi", fetchMultipleUserProfiles);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
