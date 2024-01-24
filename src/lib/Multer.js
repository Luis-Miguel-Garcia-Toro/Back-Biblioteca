const multer = require("multer");
const path = require("path");

const uploadDIR = path.join(__dirname + "/../uploads/");

const uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('_');
        cb(null, fileName + '-' + Date.now() + path.extname(file.originalname))
    }
});

const imageFilter = {
    fileFilter: (req, file, cb) => {
        if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"))
        }
    }
}

const uploader = (options) => {
    return multer(options);
};

module.exports = {
    uploader,
    multer,
    uploadStorage,
    imageFilter
};
