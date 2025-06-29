const express=require('express')
const { getFilms, getFilmDetails } = require('../controller/filmsController.js')
const { getCategoryAndLanguageList } = require('../controller/listController.js')
const { getStoreList } = require('../controller/storeController.js')
const router= new express.Router()


router.post('/films',getFilms )
router.get('/films/:id',getFilmDetails )

router.post('/stores',getStoreList )  


router.get('/get_language_category',getCategoryAndLanguageList )

 

module.exports=router