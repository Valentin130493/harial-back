const Router = require('express').Router
const router = new Router();
const FormController = require("../controllers/form/index.js")

router.post('/form', FormController.formData)


module.exports = router