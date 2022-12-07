const Router = require('express').Router
const router = new Router();
const multer = require('multer')
const upload = multer()

const FormController = require("../controllers/form/index.js")

router.post('/form', upload.none(), FormController.formData)
router.get('/form', FormController.findByNumber)


module.exports = router