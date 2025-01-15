// api/submit.js

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASECONFIGS);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'aura-hunt.appspot.com' // optional if you need storage
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const regestrationsRef = db.collection('regs');
      await regestrationsRef.add({ timestamp: Date.now(), ...req.body });
      console.log(req.body);
      return res.status(200).json({ message: 'Hacker Registered Successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to register hacker', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};
