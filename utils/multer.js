const multer = require('multer')
const upload = multer()
const fs = require('fs')

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

module.exports = {
    upload,
    uploadFiles
}