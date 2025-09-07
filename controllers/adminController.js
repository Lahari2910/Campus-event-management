const Event = require("../models/eventModel");

exports.listEvents = (req, res) => {
  Event.getAll((err, results) => {
    if (err) throw err;
    res.render("events/list", { events: results });
  });
};

exports.showCreateForm = (req, res) => {
  res.render("events/create");
};

exports.createEvent = (req, res) => {
  const { title, description, date, time, venue } = req.body;
  Event.create({ title, description, date, time, venue }, (err) => {
    if (err) throw err;
    res.redirect("/admin/events");
  });
};

exports.showEditForm = (req, res) => {
  const id = req.params.id;
  Event.getById(id, (err, result) => {
    if (err) throw err;
    res.render("events/edit", { event: result[0] });
  });
};

exports.updateEvent = (req, res) => {
  const id = req.params.id;
  const { title, description, date, time, venue } = req.body;
  Event.update(id, { title, description, date, time, venue }, (err) => {
    if (err) throw err;
    res.redirect("/admin/events");
  });
};

exports.deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.delete(id, (err) => {
    if (err) throw err;
    res.redirect("/admin/events");
  });
};
