var admin = require('firebase-admin');

var serviceAccount = require('../scout/conus-46e09-firebase-adminsdk-qqgby-280071d3c8.json');

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://conus-46e09.firebaseio.com',
});

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('custom claims set for user', uid);
    process.exit()
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  })
