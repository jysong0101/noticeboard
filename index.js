const express = require("express")
const mysql = require("mysql")
const bodyParser= require('body-parser')

const db_config = require("./db/db_conn")

const app = express()
const connection = mysql.createConnection(db_config)

const PORT = 3456

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})) 

// 구현 시작

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html')
})

app.get('/content', (req, res) => {
    res.sendFile(__dirname + '/content.html')
})

app.get('/post', (req, res) => {
    res.sendFile(__dirname + "/post.html")
})

app.post('/post', (req, res) => {
    title = req.body.title
    content = req.body.content
    username = req.body.username

    connection.query('INSERT INTO notice (notice_title, notice_content, notice_username) VALUES (?, ?, ?)', [title, content, username], (err, rows) =>{
        if (err){
            res.send("db 오류입니다. 다시 시도하세요.")
        }
        else{
            res.redirect('/')
        }
    })
})

app.get('/retrieve', (req, res)=>{
    res.sendFile(__dirname+"/retrieve.html")
})

app.get('/api/retrieve', (req, res) => {
    connection.query('select notice_title, notice_content, notice_username from notice', (err, rows) =>{
        if (err){
            res.send("db 오류입니다. 다시 시도하세요.")
        }
        else{
            res.json(rows)
        }
    })
})

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
})