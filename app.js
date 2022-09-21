const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const fs = require("fs");
var data = fs.readFileSync("data.json");
var ob = JSON.parse(data);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const AddNewTask = async (task) => {
  ob.Users.Tasks.push(task);
  var ob2 = JSON.stringify(ob);
  fs.writeFile("data.json", ob2, (err) => {
    if (err) 
      throw err;
    console.log(ob);
  });
}

app.get("/home", (req, res) => {
  res.render("home.ejs");
});
app.post("/home", (req, res) => {
  res.redirect("index");
});

app.get("/index", (req, res) => {
  const tasks = ob.Users.Tasks;
  console.log(tasks);
  res.render("index.ejs", { tasks });
});

app.get("/new", (req, res) => {
  res.render("addTask.ejs");
});
app.post("/new", async (req, res) => {
  const { task } = req.body;
  await AddNewTask(task);
  res.redirect("index");
});

app.listen(3000, () => {
  console.log("localHost: 3000");
});
