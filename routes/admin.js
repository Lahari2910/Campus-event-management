const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// List events
router.get("/events", adminController.listEvents);

// Create event
router.get("/events/new", adminController.showCreateForm);
router.post("/events", adminController.createEvent);

// Edit event
router.get("/events/edit/:id", adminController.showEditForm);
router.put("/events/:id", adminController.updateEvent);

// Delete event
router.delete("/events/:id", adminController.deleteEvent);

module.exports = router;
