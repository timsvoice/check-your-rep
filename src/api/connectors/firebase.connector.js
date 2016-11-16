import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
  databaseURL: 'https://checkyourrep-bbfa4.firebaseio.com/',
});

module.exports.data = {
  getUserById(userId) {
    return new Promise((resolve, reject) => {
      admin.auth().getUser(userId)
        .then((user) => { resolve(user.toJSON()) })
        .catch((err) => { reject(err) })
    })
  },
  getUsers() {
    return new Promise((resolve, reject) => {
      const db = admin.database();
      const ref = db.ref("users");
      ref.on("value", function(snapshot) {
        resolve(snapshot.val())
      }, function(err) {
        reject(err)
      })
    })
  }
}
