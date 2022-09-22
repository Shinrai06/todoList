const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const fs = require("fs");
var data = fs.readFileSync("data.json");
var ob = JSON.parse(data);
var users = ob.Users;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const AddNewTask = async (task) => {
  users.Tasks.push(task);
  var ob2 = JSON.stringify(ob);
  fs.writeFile("data.json", ob2, (err) => {
    if (err) 
      throw err;
    console.log(ob);
  });
}
const validate = (x) => {
  console.log(x.userName,x.email,x.password);
  console.log(users.UserName,users.Email,users.Password);
  if((x.userName === users.UserName) && (x.email === users.Email) && (x.password == users.Password)){
    return true;
  }
  return false;
}
app.get("/home", (req, res) => {
  res.render("home.ejs");
});
app.post("/home", (req, res) => {
  const x = req.body;
  if(validate(x))
    res.redirect("index");
  else
    res.send("Invalid Crediantals!!!");
});

app.get("/index", (req, res) => {
  const tasks = users.Tasks;
  console.log(typeof(tasks));
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
