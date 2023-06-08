import bycrypt from 'bcrypt'

/**
 * Encrypt password.
 *
 * @param {String} password
 * @returns
 */
export async function encrypt (password) {
  const salt = await bycrypt.genSalt(10)
  return await bycrypt.hash(password, salt)
}

/**
 * Decrypt password.
 *
 * @param {String} password
 * @returns {Bool}
 */
export function decrypt (password) {
  // const bytes = crypto.AES.decrypt(password, process.env.KEY_ENCRYPTION)
  // return bytes.toString(crypto.enc.Utf8)
}