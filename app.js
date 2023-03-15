import  express  from "express";
import dotenv from "dotenv"
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js"

dotenv.config();

//connection to the DB
conn();

const app = express();      //express uygulamasi olusturmak icin
const port = 3000;

// ejs template engine
app.set("view engine", "ejs");


// static dosyalarin sunulmasi icin middleware
app.use(express.static('public'))
app.use(express.json());

//routes

app.use("/", pageRoute);
app.use("/photos", photoRoute);

// app.get("/", (req, res) => {        // 3000 numarali porttan veri almak icin app.get yapılır.
//     res.render("index");            // res.render express frameworkunde belirtilen sablon dosyalarinin islenmesini saglar.
// });                                 // bu islemleri controllers ve routes dosyalarina ayristirarak yaptik.

// app.get("/about", (req, res) => {
//     res.render("about");
// });


app.listen(port, () => {
    console.log(`Application running on port:  ${port}`);
});