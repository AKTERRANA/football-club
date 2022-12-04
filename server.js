const express = require("express");
const path = require("path");
const ejs = require('ejs');
const morgan = require('morgan')

const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const Question = require("./models/questions").Question;

const app = express();

// CONNECTING TO MONGOOSE
// const connectDB = 'mongodb://127.0.0.1/nagsg';
const connectDB ="mongodb+srv://sarmad_client_help:CTlTe6NuUU7ErTY2@sarmad-cluster.unrvk.mongodb.net/nagsg";

mongoose.connect(connectDB, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log("MongoDb Connected Successfully!")
}).catch((err) => {
    console.log("Error=> MongoDb error Connection!")
})

// app.use(busboy());

app.use(fileUpload({
    createParentPath: true
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(express.static(__dirname + "/public"));
app.use("/index/:id",express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, './views'))
app.set('view engine', ejs);

app.get("/", (req, res) => {
    Question.find().then((data) => {
        res.render("index.ejs", { data:JSON.stringify(data) })
    }).catch(err => console.log("err", err))

})
app.get("/index/:23", (req, res)=>{
    res.sendFile(path.join(__dirname, "./views", "/index.html"))
})

app.get("/admin", (req, res) => {
    res.render("admin.ejs")
})



app.post('/save', async (req, res) => {
    console.log("body", req.body)
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let avatar = req.files.imageFile;
            console.log(avatar)
            let savePath = avatar.name;
            let uploadPath = path.resolve(__dirname, './public/uploaded', avatar.name)
            // avatar.mv('./public/uploaded/' + avatar.name);
            avatar.mv(uploadPath, (err) => {
                if (err) {
                    console.log("err", err)
                    return res.status(500).send(err);
                }
                // FILE UPLOADED

               let answers =  [{
                text: req.body.mcq1,
                correct:false
            },
            {
                text: req.body.mcq2,
                correct:false
            },
            {
                text: req.body.mcq3,
                correct: false
            },
            {
                text: req.body.mcq4,
                correct:false
            }
            ]
            answers[parseInt(req.body.answer)].correct = true;

                const newQuestion = new Question({
                    _id: new mongoose.Types.ObjectId(),
                    imgUrl:savePath,
                    title: req.body.title,
                    question: req.body.question,
                    answers:answers
                })

                newQuestion.save().then((savedDoc) => {
                    console.log(savedDoc)
                    res.status(200).json({
                        message: "New MCQ Added Successfully!"
                    })
                }).catch((err) => {
                    console.log(err)
                })


            })
  }
    } catch (err) {
        console.log("err catch", err)
        res.status(500).send(err);
    }
});




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})

