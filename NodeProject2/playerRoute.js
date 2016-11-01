/**
 * Created by anubhavshrimal on 16/6/16.
 */
var express = require("express");
var router = express.Router();
var models = require("./models")

router.post("/set", models.setPlayer);   // path :- /player/set
router.get("/get", models.getPlayer);   // path :- /player/get

module.exports = router;