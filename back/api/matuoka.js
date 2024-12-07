const fs = require('fs');
const jsondata = fs.readFileSync('api/matuoka.json', 'utf8');
const parsedData = JSON.parse(jsondata);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
function getquotes(num){
    let result=[];
    const data = parsedData.data; // parsedData.dataの参照を保持
    const total = parsedData.total; // parsedData.totalを事前に取得
    const len = parsedData.length; // parsedData.totalを事前に取得
    if(num>len)return [];
    if(num==len)return data.map((item)=>{return item.line});
    while(result.length < num){
        let set=getRandomInt(1,total);
        let i=0;
        let line='あchar,ミスったかな～';
        while(set>0){
            set-=data[i].random_value;
            line=data[i].line;
            i+=1;
        }
        if(!result.includes(line)){
            result.push(line);
        }
    }
    return result;
}
module.exports = getquotes;
