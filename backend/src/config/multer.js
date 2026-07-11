const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/players");

    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|webp/;

    const isValid =
        allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (isValid) {

        cb(null, true);

    } else {

        cb(new Error("Only JPG, PNG and WEBP images are allowed"));

    }

};

module.exports = multer({
    storage,
    fileFilter
});