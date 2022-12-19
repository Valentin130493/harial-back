const Router = require('express').Router
const router = new Router();
const multer = require('multer')
const upload = multer()
const fs = require('fs')

const FormController = require("../controllers/form/index.js")
const AdminController = require("../controllers/admin/index.js")
const UserController = require("../controllers/user/index.js")
const AuthController = require("../controllers/auth/index.js")
const StatusController = require("../controllers/status/index.js")


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        const folder = `1287`
        cb(null, "uploads")
    }, filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const uploadFiles = multer({
    storage, limits: {
        fileSize: 1024 * 1024 * 10
    }
})

router.post('/form', upload.none(), FormController.formData)
router.get('/doc', FormController.findByNumber)


router.post("/user/register", upload.none(), AuthController.register)
router.post("/user/login", upload.none(), AuthController.login)

router.get("/status", StatusController.getAllStatus)

router.post("/admin/changeStatus", AdminController.changeAppStatus)
router.post("/admin/upload", uploadFiles.any(), AdminController.uploadsFiles)

router.post("/user/search", upload.none(), UserController.findDoc)


module.exports = router