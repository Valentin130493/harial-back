const Router = require('express').Router
const router = new Router();
const multer = require('multer')
const upload = multer()
const fs = require('fs')

const DocsController = require("../controllers/docs/index.js")
const AdminController = require("../controllers/admin/index.js")
const UserController = require("../controllers/user/index.js")
const AuthController = require("../controllers/auth/index.js")
const StatusController = require("../controllers/status/index.js")
const FormController = require("../controllers/form/form.js")


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        const {number} = _.params
        const path = `uploads/${number}`
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
        cb(null, path)
    }, filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const uploadFiles = multer({
    storage, limits: {
        fileSize: 1024 * 1024 * 10
    }
})

router.post('/docs', upload.none(), DocsController.formData)
router.get('/doc/:number', DocsController.findByNumber)
router.get("/docs", DocsController.getAllProjects)


router.post("/user/register", upload.none(), AuthController.register)
router.post("/user/login", upload.none(), AuthController.login)
router.post("/user/search", upload.none(), UserController.findDoc)

router.get("/status", StatusController.getAllStatus)
router.put("/status", StatusController.updateStatus)

router.get("/form", FormController.getForm)
router.put("/from", FormController.updateForm)


router.put("/admin/project/:number", uploadFiles.any(), AdminController.updateProject)
router.delete("/admin/project/:number", uploadFiles.any(), AdminController.removeFiles)

module.exports = router