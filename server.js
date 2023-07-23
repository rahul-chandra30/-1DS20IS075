const express=require('express')
const axios=require('axios')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const data=async(req,res)=>{
try{

    const urls=req.query.url
    let numbers=[]
    for(i in urls){
    if(urls[i].startsWith('http://localhost:8090/')){
    let values= await axios.get(urls[i])
    let ans=values.data.numbers
    numbers.push(...ans)
    
    }
}
    let set=new Set(numbers)
    const sorted=Array.from(set).sort((a,b)=>a-b)
    res.status(200).json({
        "numbers":sorted
    })

}catch(err){
    console.log(err);
}
}
app.get('/numbers',data)
app.listen(3000,console.log('listening'))