import express = require("express");
// @ts-ignore
import Database from 'better-sqlite3';

const app =express()
const PORT=8080
const cors = require("cors");



app.use(express.json());
app.use(
    cors({
        origin: "*"
    })
);
const db = new Database('./data.db', {
    verbose: console.log
});

const getAllQuotes = db.prepare(`
SELECT * FROM quotes;
`);

const getQuoteById = db.prepare(`
SELECT * FROM quotes WHERE id=?;
`);

const createQuote = db.prepare(`
INSERT INTO quotes (theQuote, firstName, lastName, age, image ) VALUES (?, ?, ? ,? ,? );
`);

const updateQuote = db.prepare(`UPDATE quotes SET
  theQuote=?, firstName=?, lastName=?, age=?, image=? WHERE id=?;
`);

const deleteQuote = db.prepare(`
DELETE FROM quotes WHERE id=?;
`);

type Quote ={
    id:number
    theQuote:string
    firstName:string
    lastName:string
    image:string
    age:number
}

let quotes : Quote[]=[
    {
        id: Math.random(),
        theQuote: "Memento Mori",
        firstName:"Marcus",
        lastName:"Aurelius",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg/800px-L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg",
        age:53
    },
    {
        id: Math.random(),
        theQuote: "Memento Mori",
        firstName:"Marcus",
        lastName:"Aurelius",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg/800px-L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg",
        age:53

    },
    {
        id: Math.random(),
        theQuote: "i came,I saw,I conquered",
        firstName:"",
        lastName:"Caesar",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg/800px-L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg",
        age:53

    },
    {
        id: Math.random(),
        theQuote: "Memento Mori",
        firstName:"Marcus",
        lastName:"Aurelius",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg/800px-L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg",
        age:53


    },
    {
        id: Math.random(),
        theQuote: "Memento Mori",
        firstName:"Marcus",
        lastName:"Aurelius",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg/800px-L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg",
        age:53


    },
    {
        id: Math.random(),
        theQuote: "Memento Mori",
        firstName:"Marcus",
        lastName:"Aurelius",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg/800px-L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg",
        age:53


    },
    {
        id: Math.random(),
        theQuote: "Memento Mori",
        firstName:"Marcus",
        lastName:"Aurelius",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg/800px-L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg",
        age:53


    },
    {
        id: Math.random(),
        theQuote: "Memento Mori",
        firstName:"Marcus",
        lastName:"Aurelius",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg/800px-L%27Image_et_le_Pouvoir_-_Buste_cuirass%C3%A9_de_Marc_Aur%C3%A8le_ag%C3%A9_-_2.jpg",
        age:53


    },

]
const dropQuotesTable = db.prepare('DROP TABLE IF EXISTS quotes;');
dropQuotesTable.run();

const createQuotesTable = db.prepare(`
CREATE TABLE IF NOT EXISTS quotes (
  id INTEGER,
  theQuote TEXT NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  age INTEGER NOT NULL,
  image TEXT NOT NULL,
  PRIMARY KEY (id)
);
`);
createQuotesTable.run();



for (const quote of quotes) {
    createQuote.run(
        quote.theQuote,
        quote.firstName,
        quote.lastName,
        quote.age,
        quote.image
    );
}


app.get('/',function (req,res){
    res.send('We are learning NODE JSSS')
})

app.get("/random", function (req, res) {
   const allQuote = getAllQuotes.all()
    const randomQuote = Math.floor(Math.random() * allQuote.length);
    res.send(allQuote[randomQuote]);
});

app.get('/quotes',function (req,res){
    const allQuote = getAllQuotes.all()

    res.send(allQuote)
})

app.get("/quotes/:id", (req, res) => {
    const id = req.params.id;
    const match = getQuoteById.get(id);
    if (match) {
        res.send(match);
    } else {
        res.status(404).send({ error: "Sorry :/." });
    }
});
app.post("/quotes", (req, res) => {
    const { theQuote, firstName, lastName, age, image } = req.body;
    const errors = [];
    if (typeof theQuote !== "string") {
        errors.push("the Quote is missing or not a string");
    }
    if (typeof firstName !== "string") {
        errors.push("First name is missing or not a string");
    }
    if (typeof lastName !== "string") {
        errors.push("Last name is missing or not a string");
    }
    if (typeof age !== "number" && age < 0) {
        errors.push("Age should be a number higher than 0!");
    }
    if (typeof image !== "string") {
        errors.push("Image is missing or not a string");
    }

    if (errors.length === 0) {
        const result = createQuote.run(theQuote, firstName, lastName, age, image);
        const quote = getQuoteById.get(result.lastInsertRowid);
        res.status(201).send(quote);
    } else {
        res.status(400).send({ errors: errors }
        );
    }
}
);

app.patch('/quotes/:id', (req, res) => {
    const { theQuote, firstName, lastName, age, image } = req.body;
    const exiQuote = getQuoteById.get(req.params.id);
    updateQuote.run(
        theQuote ?? exiQuote.name,
        firstName ?? exiQuote.firstName,
        lastName ?? exiQuote.lastName,
        age ?? exiQuote.age,
        image ?? exiQuote.image,
        req.params.id
    );
    const updatedQuote = getQuoteById.get(req.params.id);
    res.send(updatedQuote);
});



app.delete("/quotes/:id", (req, res) => {
    const id = Number(req.params.id);

    const result = deleteQuote.run(id);

    if (result.changes !==0) {
        res.send("Quote deleted sucessfully");
    } else {
        res.status(404).send({ error: "Quote not found" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
