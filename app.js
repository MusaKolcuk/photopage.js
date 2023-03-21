import  express  from "express";
import dotenv from "dotenv"
import conn from "./db.js";
import cookieParser from "cookie-parser";
import methodOverride from "method-override"        //follow islemlerinde linke tiklayinca PUT islemi yaoabilmek icin.
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import { checkUser } from "./middlewares/authMiddleware.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";  //cloudinary'nin 2. versiyonunu import eder.

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,

})
//connection to the DB
conn();

const app = express();      //express uygulamasi olusturmak icin
const port = process.env.PORT;

// ejs template engine
app.set("view engine", "ejs");


//Middlewares

// static dosyalarin sunulmasi icin middleware
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());                            //cookie parser kullanmak icin
app.use(fileUpload({useTempFiles:true}))  //useTempFiles seçeneği, yüklenen dosyaların geçici klasörlere kaydedilmesini sağlar. Böylece, dosyaların hafızada tutulması yerine diskte depolanır ve bellek yönetimi daha iyi olur.
app.use(methodOverride("_method", {
    methods: ["POST","GET"],
}))

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