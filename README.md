Campus Event Management Platform

This project is a web application built to manage college events in a simple and organized way. The main goal was to make it easier for admins (college staff) to create and manage events, and for students to browse, register, and check-in for those events. Earlier, students didn’t have a proper way to know what events were happening on campus, and admins had to handle everything manually using paper or spreadsheets. With this system, everything is digital, secure, and easy to access.

The platform was developed using the following technologies:
Node.js and Express.js to handle backend logic and routes.
EJS to create dynamic web pages and render data from the server.
MySQL to store event details, student records, and registrations.
bcryptjs for secure password hashing.
express-session for managing user sessions and keeping students logged in portal.

The application works in two main parts. On the admin side:
Admins can log in and create new events with details such as title, date, time, and venue.
They can also edit or delete existing events.
All event information is stored in the MySQL database.

On the student side:
Students can sign up, log in, and view upcoming events.
They are able to register for events they are interested in.
They can also check-in on the day of the event to mark their attendance.

During development, there were several challenges that needed to be solved.
The database connection initially caused issues, so a separate db.js file was created to handle and organize connection details

Admin and student routes were mixing up, so they were separated into /admin/... and /student/... for better structure

Storing plain-text passwords was unsafe, so bcryptjs was added to hash passwords before saving them to the database

Logging in again for every action was inconvenient, so express-session was implemented to maintain sessions until logout.

This project takes the traditional manual process of event management and turns it into a secure, digital, and user-friendly system. In the future, it can be extended with features like email notifications, QR code check-ins, or mobile app integration.
