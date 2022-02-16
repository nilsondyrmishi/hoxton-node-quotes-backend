import express = require("express");

const app =express()
const PORT=8080
const cors = require("cors");

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

app.use(express.json());
app.use(
    cors({
        origin: "*"
    })
);

app.get('/',function (req,res){
    res.send('We are learning NODE JSSS')
})

app.get("/random", function (req, res) {
    const randomQuote = Math.floor(Math.random() * quotes.length);
    res.send(quotes[randomQuote]);
});

app.get('/quotes',function (req,res){
    res.send(quotes)
})

app.get("/quotes/:id", (req, res) => {
    const id = Number(req.params.id);
    const match = quotes.find((quote) => quote.id === id);
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
        const newQuote: Quote = {
            id: Math.random(),
            theQuote: theQuote,
            firstName: firstName,
            lastName: lastName,
            age: age,
            image: image
        };
        quotes.unshift(newQuote);
        res.status(201).send(newQuote);
    } else {
        res.status(400).send({ errors: errors }
        );
    }
}
);

app.patch("/quotes/:id", (req, res) => {
    const id = Number(req.params.id);
    const changeQuote = quotes.find((quote) => quote.id === id);

    if (changeQuote) {
        if (typeof req.body.content === "string")
            changeQuote.theQuote = req.body.theQuote;
        if (typeof req.body.firstName === "string")
            changeQuote.firstName = req.body.firstName;
        if (typeof req.body.lastName === "string")
            changeQuote.lastName = req.body.lastName;
        if (typeof req.body.age === "number") changeQuote.age = req.body.age;
        if (typeof req.body.image === "string")
            changeQuote.image = req.body.image;
        res.send(changeQuote);
    } else {
        res.status(404).send({ error: "Quote not found." });
    }
});



app.delete("/quotes/:id", (req, res) => {
    const id = Number(req.params.id);

    const match = quotes.find((quote) => quote.id === id);

    if (match) {
        quotes = quotes.filter((quote) => quote.id !== id);
        res.send("Quote deleted sucessfully");
    } else {
        res.status(404).send({ error: "Quote not found" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
