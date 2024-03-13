const express = require("express")
const {handleGenerateShortURL, handleRedirect, handleAnalytics}= require("../controllers/url")
const router = express.Router()

router.post("/",handleGenerateShortURL)

router.get("/:shortID", handleRedirect)

router.get("/analytics/:shortID", handleAnalytics)

module.exports = router;