const express = require("express");
const router = express.Router();
const upload = require("../config/multer")
const PictureController = require("../controllers/Picturecontroller");


router.post("/checkout", upload.single("file"), PictureController.create);
// router.put('/complete', PictureController.updateStatus);
router.get('/complete', PictureController.success)
router.post('/consultar', PictureController.consultaPet);
router.get('/consultar/:id_pet', PictureController.exibeConsulta);
//router.get("/consulta/:id_pet", PictureController.findAll);


module.exports = router;