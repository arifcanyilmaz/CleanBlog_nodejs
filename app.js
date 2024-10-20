const exp = require('constants'); //Node.js'teki sabitlere erişmek için (CORE)

const ejs = require("ejs"); //Gömülü js dosyaları (NPM)
const express = require("express"); // Express (NPM)
const mongoose = require('mongoose') // Mongoose (NPM)
const methodOverride = require('method-override'); // Express-method-override (NPM)

const blogControllers = require('./controllers/blogcontrollers'); //blog controllersımızı import ettik.
const pageControllers = require('./controllers/pagecontrollers'); //page controllersımızı import ettik.

const app = express(); // Express (NPM)

// connect DB
mongoose.connect('mongodb://localhost/cleanblog-db')

//TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTER
//İşlem requestleri
app.get("/", blogControllers.getAllPosts); //Tüm postları anasayfaya gönderip sıralar.
app.get("/post/:id", blogControllers.getPost); //Her fotoğrafın tekil sayfasını getirir.
app.put('/post/:id', blogControllers.updatePost) //Postu update eder.
app.delete('/post/:id', blogControllers.deletePost) //Postu silme kısmı.
app.post("/blogs", blogControllers.createPost) //Postu oluşturma kısmı.
//Sayfa requestleri
app.get("/about", pageControllers.getAboutPage); //about sayfası.
app.get("/add_post", pageControllers.getAddPage); //add_page sayfası.
app.get("/post/edit/:id", pageControllers.getEditPostPage); //postun editleme sayfası.

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port}'de baslatildi..`);
});
