const express = require("express");
const router = express.Router();
const upload = require("../config/multer")
const PictureController = require("../controllers/Picturecontroller");


router.post("/checkout", upload.single("file"), PictureController.create);
router.put('/complete', PictureController.updateStatus);
router.get('/complete', PictureController.sucesse)
router.get("/consulta/:id_pet", PictureController.findAll);


module.exports = router;