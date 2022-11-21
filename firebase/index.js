const admin = require('firebase-admin');

const serviceAccount = require('../config/firebaseSvAccKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin