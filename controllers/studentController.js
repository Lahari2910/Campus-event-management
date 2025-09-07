const db = require("../config/db"); // Your MySQL connection
const bcrypt = require("bcryptjs");

exports.showSignupForm = (req, res) => res.render("students/signup");
exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query("INSERT INTO students (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword], (err) => {
      if (err) {
        console.log(err);
        return res.send("Error signing up.");
      }
      res.redirect("/student/login");
    });
};

// Login
exports.showLoginForm = (req, res) => res.render("students/login");
exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM students WHERE email = ?", [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0 || !bcrypt.compareSync(password, results[0].password)) {
      return res.send("Invalid credentials");
    }
    req.session.studentId = results[0].id;
    req.session.studentName = results[0].name;
    res.redirect("/student/events");
  });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/student/login");
};

// Middleware to protect routes
exports.authMiddleware = (req, res, next) => {
  if (!req.session.studentId) return res.redirect("/student/login");
  next();
};

// List all events
exports.listEvents = (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) throw err;
    res.render("students/events", { events: results });
  });
};

// Register for event
exports.registerForEvent = (req, res) => {
  const studentId = req.session.studentId; // assuming session login
  const eventId = req.params.id;

  db.query(
    "INSERT INTO registrations (student_id, event_id) VALUES (?, ?)",
    [studentId, eventId],
    (err) => {
      if (err) throw err;
      res.redirect("/student/my-events");
    }
  );
};

// Show student's events
exports.myEvents = (req, res) => {
  const studentId = req.session.studentId;

  db.query(
    `SELECT e.*, r.check_in_status 
     FROM events e 
     JOIN registrations r ON e.id = r.event_id 
     WHERE r.student_id = ?`,
    [studentId],
    (err, results) => {
      if (err) throw err;
      res.render("students/myEvents", { events: results });
    }
  );
};

// Check-in for an event
exports.checkIn = (req, res) => {
  const studentId = req.session.studentId;
  const eventId = req.params.id;

  db.query(
    "UPDATE registrations SET check_in_status = 1 WHERE student_id = ? AND event_id = ?",
    [studentId, eventId],
    (err) => {
      if (err) throw err;
      res.redirect("/student/my-events");
    }
  );
};
