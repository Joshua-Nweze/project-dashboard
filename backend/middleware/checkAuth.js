import jwt from "jsonwebtoken";

function s(string) {
    return string.split(' ')
}

export default function checkAuth(req, res, next) {
    // let { token } = req.headers.authorization
    // console.log('token: ', token)

    // if(token) {
    //     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    //         if (err) {
    //             return res.status(401).json({ message: "Authentification Failed, try logging in again" });
    //         } else {
    //             next()
    //         }
    //     })
    // } else {
    //     return res.status(401).json({ message: "Authentification Failed, try logging in again" });
    // }

    if (!req.headers.authorization) {
        return res
          .status(401)
          .json({ message: "Authentification Failed, no auth header" })
      } else {
        const [tokenType, token] = s(req.headers.authorization)
        console.log('token1: ', token)
        if (token && tokenType === 'Bearer') {
          const secret = process.env.JWT_SECRET
          jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
              console.log(err)
              return res
              .status(401)
              .json({ message: "Authentification Failed, try logging in again" })
            } else {
              // make user available for the next middleware
              // console.log(decodedToken.data)
            //   const decodedData = decodedToken
            console.log('de: ', decodedToken)
              res.locals.user = decodedToken.id
            //   res.locals.remember_me = decodedData.data.remember_me
              next()
            }
          })
        }
      }
}