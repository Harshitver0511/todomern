const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
// const protected=express.Router()
const { RegisterSchema } = require('../validator/RegisterSchema');
const { LoginSchema } = require('../validator/LoginSchema');
const AuthMiddlewares = require('../middlewares/AuthMiddlewares');
const {
    getAllTasks,
    register,
    login,
    todo,
    fetchTodo,
    isDone,
    del
} = require('../controllers/tasks')
router.route('/').get(getAllTasks).post(RegisterSchema,register)
router.route('/login').post(LoginSchema,login)
router.route('/todo').get(AuthMiddlewares,fetchTodo)
router.route('/done').post(AuthMiddlewares,[check("_id","Todo is  is required").exists()],isDone)
router.route('/delete').delete(AuthMiddlewares,[check("_id","Todo id  is  is required").exists()],del)

router.route('/create').post(AuthMiddlewares,[check("desc","Tod desc is required").exists()],todo)   

  
module.exports = router
// module.exports = protected
  