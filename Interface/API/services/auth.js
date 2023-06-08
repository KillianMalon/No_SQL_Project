// import User from '../models/user.js'
// import { Conflict } from '../globals/errors.js'
// import JWTService from './jwt.js'
// import { encrypt, decrypt } from '../helpers/encryption.js'

// const JWTServiceInstance = new JWTService()

// export default class AuthService {
//   constructor () {
//     if (AuthService.instance instanceof AuthService) {
//       return AuthService.instance
//     }
//     Object.freeze(this)
//     AuthService.instance = this
//   }

//   async signup ({ fields }) {
//     const userExist = await User.findOne({email: fields.email } )
//     if (userExist) {
//         return false
//     }
//     fields.password = await encrypt(fields.password)
//     const user = await User.create({ ...fields })
//     const jwt = JWTServiceInstance.generate({ id: user._id })
//     return jwt
//   }

// //   async login ({ email, password, isBotanist }) {
// //     let jwt
// //     // Si c'est un utilisateur
// //     if (isBotanist === '0') {
// //       const user = await User.findOne({ where: { email_user: email } })
// //       if (!user) {
// //         throw new Conflict('Utilisateur ou mot de passe incorrect.')
// //       }
// //       if (decrypt(user.password_user) !== password) {
// //         throw new Conflict('Email ou mot de passe incorrect.')
// //       }
// //       jwt = await JWTServiceInstance.generate({ id: user.user_id })
// //     }
// //     // Si c'est un botanist
// //     if (isBotanist === '1') {
// //       const botanist = await Botanist.findOne({ where: { email_botanist: email } })
// //       if (!botanist) {
// //         throw new Conflict('Email ou mot de passe incorrect.')
// //       }
// //       if (decrypt(botanist.password_user) !== password) {
// //         throw new Conflict('Email ou mot de passe incorrect.')
// //       }
// //       jwt = await JWTServiceInstance.generate({ id: botanist.user_id })
// //     }
// //     return jwt
// //   }

//   logout ({ jwt }) {
//     JWTServiceInstance.remove({ jwt })
//   }
// }