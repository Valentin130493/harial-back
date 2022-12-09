const Router = require('express').Router
const router = new Router();
const multer = require('multer')
const upload = multer()

const FormController = require("../controllers/form/index.js")
const AdminController = require("../controllers/admin/index.js")
const UserController = require("../controllers/user/index.js")

router.post('/form', upload.none(), FormController.formData)
router.get('/doc', FormController.findByNumber)

router.post("admin/changeStatus")

router.post("user/search", UserController.findDoc)


module.exports = router