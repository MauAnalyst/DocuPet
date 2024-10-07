const express = require("express");
const router = express.Router();
const upload = require("../config/multer")
const PictureController = require("../controllers/Picturecontroller");


router.post("/checkout", upload.single("file"), PictureController.create);
router.get('/complete', PictureController.success)
router.post('/consultar', PictureController.consultaPet);
router.get('/consultar/:id_pet', PictureController.exibeConsulta);


module.exports = router;