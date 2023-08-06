const express = require("express");
const router = express.Router();

router.post("/displaydata", (req, res) => {
  try {
    res.send([global.fooditems,global.foodcategory]);
  } catch (error) {
    //console.error(error.message);
  }
});
module.exports=router;