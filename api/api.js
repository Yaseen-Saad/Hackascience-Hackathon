require('dotenv').config();
const express = require('express');
const path = require('path');
const { db, bucket, } = require('./firebase');
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", (req, res) => {
    res.send("HI")
})
router.post("/submit", async (req, res) => {
    try {
        const regestrationsRef = db.collection('regs');
        await regestrationsRef.add({ timestamp: Date.now(), ...req.body });
        console.log(req.body);
        res.status(200).json({ message: "Hacker Registered Succefully" });
    }
    catch {
        res.status(500).json({ message: 'Failed to registered', error: error.message });
    }
})

router.get("/hackers", async (req, res) => {
    try {
        const regestrationsRef = db.collection('regs');
        const hackersCount = await regestrationsRef.count().get()
        res.status(200).json({ hackers: hackersCount["_data"].count });
    }
    catch {
        res.status(500).json({ message: 'Failed to registered', error: error.message });
    }
})
module.exports = router
