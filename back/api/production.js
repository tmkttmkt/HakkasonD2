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
    res.json({ids:data.map(obj => obj.id)})
  }
  
}
router.get('/creator/:id',getall);


async function postdata(req, res){
  const {url,type,creator} = req.data
 
  if (!url) {
    return res.status(400).json({ error: 'No file uploaded' });
  } 
  const id=await generateUnusedId(table)
  const {data,error}=await putwrapper(table,[{id: id,creator:creator,type:type,url:url}]);
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json({id:id})
  }
}
router.post('/',postdata);


async function delldata(req, res){
  const { id } = req.params; 
      const { data, error } = await delwrapper(table,{id:id});
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send();
      }else {
        console.log('Failed to delete file');
        res.json({success:false})
      }
}
router.delete('/:id',delldata);


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