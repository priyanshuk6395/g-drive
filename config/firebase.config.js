const Firebase = require('firebase-admin');
const serviceAccount = require('../drive-26b38-firebase-adminsdk-fbsvc-3ee9f39330.json');

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-26b38.firebasestorage.app'
});

module.exports = Firebase;