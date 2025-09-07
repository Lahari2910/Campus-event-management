const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/signup", studentController.showSignupForm);
router.post("/signup", studentController.signup);
router.get("/login", studentController.showLoginForm);
router.post("/login", studentController.login);
router.get("/logout", studentController.logout);

// Show all events
router.get("/events", studentController.listEvents);
// Event registration
router.post("/events/register/:id", studentController.registerForEvent);
// Check registrations
router.get("/my-events", studentController.myEvents);
// Check-in for event (on event day)
router.post("/events/checkin/:id", studentController.checkIn);

module.exports = router;