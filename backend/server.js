const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const resetRoutes = require("./routes/resetRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({
    limit: "50mb",
    extended: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/reset", resetRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Traveloop Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});