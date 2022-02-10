import express = require("express");

const app =express()
const PORT=8080
const cors = require("cors");

type Quote ={
    id:number
    author:string
    theQuote:string
}

const quotes : Quote[]=[
    {
        id: 1,
        theQuote: "To be or not to be",
        author: "William Sheksprie"
    },
    {
        id: 2,
        theQuote: "Memento Mori",
        author: "Marcus Aurelius"
    },
    {
        id: 3,
        theQuote: "i came,I saw,I conquered",
        author: "Caesar"
    },
    {
        id: 4,
        theQuote: "To be or not to be",
        author: "William Shakespeare"
    },
    {
        id: 5,
        theQuote: "To be or not to be",
        author: "William Shakespeare"
    },
    {
        id: 6,
        theQuote: "To be or not to be",
        author: "William Shakespeare"
    }, {
        id: 7,
        theQuote: "To be or not to be",
        author: "William Shakespeare"
    },
    {
        id: 8,
        theQuote: "To be or not to be",
        author: "William Shakespeare"
    },

]
app.use(
    cors({
        origin: "*"
    })
);
app.get('/',function (req,res){
    res.send('We are learning NODE JSSS')
})

app.get('/quotes',function (req,res){
    res.send(quotes)
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
