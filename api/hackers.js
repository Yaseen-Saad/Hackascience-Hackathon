// api/hackers.js

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
  if (req.method === 'GET') {
    try {
      const regestrationsRef = db.collection('regs');
      const countSnapshot = await regestrationsRef.count().get();
      const hackersCount = countSnapshot._data.count;
      return res.status(200).json({ hackers: hackersCount });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch hackers count', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};
