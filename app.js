const express = require('express');
const bodyparser = require('body-parser');
const fs=require('fs')
const app = express();
app.use(bodyparser.urlencoded())
app.get('/login', (req, res, next) => {
    res.send(`<form onSubmit="localStorage.setItem('username' , document.getElementById('username').value)" action="/" method="POST">
               <input type="text" id="username" name="title">
               <button type="submit">AddUser</button>
               </form>  
          `)
})

app.get('/', (req, res) => {
    fs.readFile('chats.txt',(err,data)=>{
        if(err){
            data='No Chat Exist'
        }
        res.send(`${data}<form onSubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST">
    <input type="text" id="message" name="message">
    <input type="hidden" id="username" name="username">
    <button type="submit">Send</button>
    </form>  
`)
    })
    
})

app.post('/',(req,res)=>{
    
fs.writeFile('chats.txt',`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
    err ? console.log(err):res.redirect('/')
});
})


app.listen(3000);