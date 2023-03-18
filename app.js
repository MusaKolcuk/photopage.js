import  express  from "express";
import dotenv from "dotenv"
import conn from "./db.js";
import cookieParser from "cookie-parser";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import { checkUser } from "./middlewares/authMiddleware.js";

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
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());                            //cookie parser kullanmak icin

//routes

app.use("*", checkUser);            // * kullanarak herhangi bir sayfa cagirilmadan once checkUser fonk. cagirdik. Ve kullaniciya kimlik dogrulamasi yaptik. Ona gore izin verdik.
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);

// app.get("/", (req, res) => {        // 3000 numarali porttan veri almak icin app.get yapılır.
//     res.render("index");            // res.render express frameworkunde belirtilen sablon dosyalarinin islenmesini saglar.
// });                                 // bu islemleri controllers ve routes dosyalarina ayristirarak yaptik.

// app.get("/about", (req, res) => {
//     res.render("about");
// });


app.listen(port, () => {
    console.log(`Application running on port:  ${port}`);
});