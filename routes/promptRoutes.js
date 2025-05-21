const express = require("express");
const router = express.Router();
const {
  getAllPrompts,
  createPrompt,
  updatePrompt,
  deletePrompt
} = require("../controller/promptController");

router.get("/", getAllPrompts);          
router.post("/", createPrompt);           
router.put("/:id", updatePrompt);        
router.delete("/:id", deletePrompt);      

module.exports = router;
