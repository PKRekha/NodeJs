var express = require("express");
var app = express();
var port = 4000;

app.use(express.static(__dirname + "/public"));
app.set("views", "./src/views");
app.set("view engine", "ejs");

var menu = [
  { name: "Home", link: "/" },
  { name: "Movies List", link: "/movies" },
  { name: "products", link: "/products" }
];
var moviesRouter = require("./src/routes/movieRouter")(menu);
var productsRouter = require("./src/routes/productRouter")(menu);

app.use("/movies", moviesRouter);
app.use("/products", productsRouter);

app.listen(port, function(err) {
  if (err) throw err;
  console.log("!!!!server started!!!!!!");
});

app.get("/", function(req, res) {
  res.render("index", { title: "HOme page", menu });
});
