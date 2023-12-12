const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uri = "Your Super Secret URI";
const dbName = "Main";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName, //Specify the database name here
  })
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database: ", err);
  });

app.use(cors()); //Use this after the variable declaration
app.use(bodyParser.json());

//Schema for Users
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  surname: String,
  team: String,
  manager: Boolean,
});

//Schema for Teams
const teamSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  code: Number,
});

//Schema for Teams
const taskSchema = new mongoose.Schema({
  name: String,
  desc: String,
  status: String,
  asignee: String,
  for: String,
});

//Create Models
const userModel = mongoose.model("taskUser", userSchema);
const teamModel = mongoose.model("taskTeam", teamSchema);
const taskModel = mongoose.model("taskTasks", taskSchema);

//Hashes user password
async function hashPass(pass) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("Salt: ", salt);
    const hash = await bcrypt.hash(pass, salt);
    console.log("Hash: ", hash);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err.message);
    throw err;
  }
}

//Validates user through comparing the hashed pass in db and plain string pass
async function validateUser(hash, pass) {
  try {
    const res = await bcrypt.compare(pass, hash);
    console.log(res); //Should return true or false
    return res;
  } catch (err) {
    console.error(err.message);
    throw err; //Rethrow the error for handling elsewhere if needed
  }
}

//Insert a new user to the database, called when registering
async function insertRegister(req, res) {
  try {
    const existingUser = await userModel.findOne({ email: req.body.Email });
    const existingTeam = await teamModel.findOne({ code: req.body.Code });
    let isManager = false;

    if (existingTeam && existingTeam.email === req.body.Email) {
      isManager = true;
    }

    if (existingUser) {
      res.send("Email or Username Already Registered");
    } else if (
      req.body.Email == "" ||
      req.body.Name == "" ||
      req.body.Code == ""
    ) {
      res.send("Email, Code or Username Cant be Empty");
    } else if (!existingTeam) {
      res.send("Team Code is incorect");
    } else {
      const regUser = new userModel({
        email: req.body.Email,
        password: await hashPass(req.body.Password),
        name: req.body.Name,
        surname: req.body.Surname,
        team: existingTeam._id,
        manager: isManager,
      });
      await regUser.save();
      res.send("Registration Successful");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

//Insert a new team to the database
async function insertTeam(req, res) {
  try {
    const min = 1000;
    const max = 9999;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const existingTeam = await teamModel.findOne({ code: randomNumber });
    const existingEmail = await teamModel.findOne({ email: req.body.Email });
    const existingName = await teamModel.findOne({ name: req.body.Name });

    if (existingTeam) {
      insertTeam();
      return;
    } else if (existingEmail || existingName) {
      res.send("Name or Email already registered");
      return;
    } else {
      const hashedPassword = await hashPass(req.body.Password);
      console.log("Hashed Password:", hashedPassword);

      const newTeam = new teamModel({
        email: req.body.Email,
        password: hashedPassword,
        name: req.body.Name,
        code: randomNumber,
      });

      await newTeam.save();
      res.send(randomNumber.toString());
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

//Inserts a new task into the database
async function insertTask(req, res) {
  try {
    const newTask = new taskModel({
      name: req.body.Name,
      desc: req.body.Desc,
      for: req.body.For,
      status: "To Do",
      asignee: req.body.Asignee,
    });
    console.log(req.body);
    await newTask.save();
    res.send("Task Saved");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

//Gets tasks for a specific user
async function getTasks(req, res) {
  try {
    const existingUser = await userModel.findOne({ _id: req.query.id });
    const existingTasks = await taskModel.find({ for: existingUser._id });
    res.send(existingTasks);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

//Sets task status
async function setTaskStatus(req, res) {
  const existingTask = await taskModel.findOne({ _id: req.body.id });
  existingTask.status = req.body.status;
  await existingTask.save();
}

//Check user login credentials
async function checkLogin(req, res) {
  try {
    const existingUser = await userModel.findOne({ email: req.body.Email });
    if (existingUser != null) {
      const existingTeam = await teamModel.findOne({ id: existingUser.team });

      let userData = {
        id: existingUser._id,
        name: existingUser.name + " " + existingUser.surname,
        manager: existingUser.manager,
        team: existingUser.team,
        teamName: existingTeam.name,
      };

      const isPasswordValid = await validateUser(
        existingUser.password,
        req.body.Password
      );

      if (isPasswordValid) {
        res.send(userData);
      } else {
        res.send("err");
      }
    } else {
      res.send("err");
    }
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

app.post("/register", (req, res) => {
  insertRegister(req, res);
});

app.post("/new_team", (req, res) => {
  insertTeam(req, res);
});

app.post("/login", (req, res) => {
  checkLogin(req, res);
});

app.post("/new_task", (req, res) => {
  insertTask(req, res);
});

app.get("/get_users", async (req, res) => {
  const existingTeam = await teamModel.findOne({ _id: req.query.team });
  const existingUser = await userModel.find({ team: existingTeam._id });
  res.send(existingUser);
});

app.get("/get_tasks", async (req, res) => {
  getTasks(req, res);
});

app.post("/rem_task", async (req, res) => {
  const existingTasks = await taskModel.findOne({ _id: req.body.id });
  await existingTasks.remove();
});

app.post("/set_status", async (req, res) => {
  setTaskStatus(req, res);
});

const listener = app.listen(8888, function () {
  console.log("Listening on port " + listener.address().port);
});
