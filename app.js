const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

// EJS setup with layouts
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout"); // layout.ejs inside views folder

app.use(session({
  secret: "student_portal_secret",
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(express.static("public"));
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);
const studentRoutes = require("./routes/studentRoutes");
app.use("/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
