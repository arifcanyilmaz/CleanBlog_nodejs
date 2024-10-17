const path = require("path"); //Dosya yolunu belirtir. (CORE)
const exp = require('constants'); //Node.js'teki sabitlere erişmek için (CORE)

const ejs = require("ejs"); //Gömülü js dosyaları (NPM)
const express = require("express"); // Express (NPM)
const mongoose = require('mongoose') // Mongoose (NPM)

const Blog = require('./models/Blog') //photo modelimizi import ettik.

const app = express(); // Express (NPM)

// connect DB
mongoose.connect('mongodb://localhost/cleanblog-db')
    .then(() => console.log('veritabanına bağlandı'))

//TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ROUTER
//Hepsini Anasayfaya gönderir
app.get("/", async (req, res) => {
  const blogItem = await Blog.find({})

  res.render("index", {
    blogItem
  });
});

//about sayfası
app.get("/about", (req, res) => {
  res.render("about");
});

//her fotoğrafın tekil sayfası
app.get("/post/:id", async (req, res) => {
  const postBlogItem = await Blog.findById(req.params.id)
  res.render("post", {
    postBlogItem
  })
});

// addpost sayfası
app.get("/add_post", (req, res) => {
  res.render("add_post");
});

// girilen verileri yönlendirdiğimiz yer
app.post("/blogs", async (req,res) => {
  await Blog.create(req.body)
  res.redirect('/')
})



const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port}'de baslatildi..`);
});
