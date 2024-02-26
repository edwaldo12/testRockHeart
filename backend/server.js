"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DB_1 = __importDefault(require("./dist/config/DB"));
const src_1 = __importDefault(require("./dist/index"));
const app = (0, express_1.default)();
const server = new src_1.default(app);
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
// For Dropping DB
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
DB_1.default.sequelize
    .sync()
    .then(() => {
    console.log("Synced db.");
})
    .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});
app
    .listen(PORT, "localhost", function () {
    console.log(`Server is running on http://localhost:${PORT}`);
})
    .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    }
    else {
        console.log(err);
    }
});
