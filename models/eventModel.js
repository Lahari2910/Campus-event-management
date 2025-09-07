const db = require("../config/db");

const Event = {
  getAll: (callback) => {
    db.query("SELECT * FROM events ORDER BY date DESC", callback);
  },
  create: (eventData, callback) => {
    db.query("INSERT INTO events SET ?", eventData, callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM events WHERE id = ?", [id], callback);
  },
  update: (id, eventData, callback) => {
    db.query("UPDATE events SET ? WHERE id = ?", [eventData, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM events WHERE id = ?", [id], callback);
  }
};

module.exports = Event;
