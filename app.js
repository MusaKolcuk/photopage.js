import  express  from "express";

const app = express();      //express uygulamasi olusturmak icin
const port = 3000;

app.get("/", (req, res) => {        // 3000 numarali porttan veri almak icin app.get yapılır.
    res.send("INDEX SAYFASI");
})


app.listen(port, () => {
    console.log(`Application running on port:  ${port}`);
});