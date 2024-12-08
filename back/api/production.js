const express = require('express');
const router = express.Router();
const {supabase} = require('./supabase_wrapper.js');
const { scanwrapper,generateUnusedId,getwrapper,putwrapper,delwrapper } = require('./aws_wrapper.js');
const table="produc"




async function getall(req, res){
  const { id } = req.params; 
  const {data,error}=await scanwrapper(table);
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json({urls:data.map(obj => obj.id)})
  }
  
}
router.get('/all',getall);
async function gett(req, res){
  const { url } = req.body; 
  const {data,error}=await getwrapper(table,{id:url});
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json(data);
  }
  
}
router.get('/',gett);


async function isused(req, res){
  const { id } = req.body; 
  const {data1,error1} = await scanwrapper(table);
  if(data1){
    if(data1.map((item)=>{item.id}).includes(id)){
      return res.json({success:false});
    }
    else{
      res.json({success:true});
    }
  }
  else{
    return res.status(500).send();
  }
  
}
router.put('/',isused);


async function postdata(req, res){
  const {url,type,creator} = req.body;
 
  if (!url) {
    return res.status(400).json({ error: 'No file uploaded' });
  } 
  const {data,error}=await putwrapper(table,[{id: url,creator:creator,type:type,url:url}]);
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json({});
  }
}
router.post('/',postdata);


async function delldata(req, res){
  const { url } = req.params; 
      const { data, error } = await delwrapper(table,{id:url});
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send();
      }else {
        res.json({success:true});
      }
}
router.delete('/',delldata);


async function gettype(req, res){
  const data={
    0:"none",
    1:"programer",
    2:"composer",
    3:"painter",
    4:"movier",
  }
  res.json(data);
}
router.get('/:id',gettype);



module.exports = router;