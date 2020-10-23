const {admin, db} = require('../utils/admin')

// Authorization Middleware

exports.FBAuth = (req, res, next) => {
  let idToken
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    idToken = req.headers.authorization.split("Bearer ")[1]
  } else {
    console.error('No Token Found!')
    return res.status(403).json({success: false, message: 'Unauthorized!'})
  }

  admin.auth().verifyIdToken(idToken)
  .then(decodedToken => {
    console.log(decodedToken, 'Token')
    req.user = decodedToken
    return db.collection('users')
    .where('userId', '==', req.user.uid)
    .limit(1)
    .get()
  })
  .then(data => {
    req.user.email = data.docs[0].data().email
    return next()
  })
  .catch(err => {
    console.error("Error Token Verification: ", err)
    return res.status(403).json(err)
  })
}