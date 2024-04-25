const check = require('express-validator').check;
const LoginSchema = [
    check('username','username i required').exists().isAlphanumeric().trim().isLength({min:6,max:32}).withMessage('Username should be only alphanumeric'),
    check('password','password is required ').exists().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]
module.exports = {  LoginSchema };