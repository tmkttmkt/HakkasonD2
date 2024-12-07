const express = require('express');
const router = express.Router();
const {supabase,generateUnusedId} = require('./supabase_wrapper.js');
const table="produc"




async function getall(req, res){
  const { id } = req.params; 
  const {data,error}=await supabase.from(table).select("*").eq("id",id);
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json({ids:objects.map(obj => obj.id)})
  }
  
}
router.get('/creator/:id',getall);


async function postdata(req, res){
  const {type,creator} = req.data
 
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  } 
  const id=await generateUnusedId(table)
  const {data,error}=await supabase.from(table).insert([{id: id,creator:creator,type:type,url:file.path}]);
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json({id:id})
  }
}
router.post('/',culudinary.single("file"),postdata);


async function delldata(req, res){
  const { id } = req.params; 
      const { data, error } = await supabase.from(table).delete().eq('id', id); 
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