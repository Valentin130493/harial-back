const Router = require('express').Router
const router = new Router();
const multer = require('multer')
const upload = multer()

const FormController = require("../controllers/form/index.js")
const AdminController = require("../controllers/admin/index.js")

router.post('/form', upload.none(), FormController.formData)
router.get('/doc', FormController.findByNumber)

router.post("admin/changeStatus")


module.exports = router