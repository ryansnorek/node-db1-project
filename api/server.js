const express = require("express");

const server = express();

const accountRoutes = require("./accounts/accounts-router");

server.use(express.json());
server.use("/api/accounts", accountRoutes);
server.use("*", (req, res) => {
    res.status(404).json({
        message: "not found"
    })
})

module.exports = server;
