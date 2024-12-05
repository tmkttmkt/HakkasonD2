const express = require('express');
const router = express.Router();
const culudinary = require('./cludinary_wrapper.js');
const {supabase,generateUnusedId} = require('./supabase_wrapper.js');
const table="produc"




async function getall(req, res){
}
router.get('/:id',getall);


async function postdata(req, res){
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  } 
  supabase.from(table).insert([{uesr_id: id,uesr_name:name,password: pass}]);
}
router.post('/',culudinary.single("file"),postdata);


async function delldata(req, res){
}
router.delete('/:id',delldata);


async function gettype(req, res){
  const {data,error} = await supabase.from("roles").select("*");
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json(data);
  }
}
router.get('/:id',gettype);



module.exports = router;