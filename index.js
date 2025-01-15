// Libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { db, bucket, } = require('./api/firebase');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));

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

app.get('*', (req, res) => {
    res.status(404).render('error.ejs');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

