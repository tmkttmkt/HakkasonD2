const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
//どっちやろなー
//const cloudinary = require('cloudinary').v2;
//const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

require('dotenv').config(); 
const router = express.Router();
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PASS
const supabase = createClient(supabaseUrl, supabaseKey)
const table="produc"



async function getranking(req, res){
}
router.get('/',getranking);

async function getdetail(req, res){
}
router.get('/:id',getdetail);



module.exports = router;