/*
 * Konstruct 2018: Official Technical Fest of Maulana Abul Kalam Azad
 * University of Technology, West Bengal
 * Copyright (C) 2018 Bytes Club <bytes-club@googlegroups.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

// Import node packages
const express        = require("express"),
      bodyParser     = require("body-parser"),
      errorHandler   = require("errorhandler"),
      methodOverride = require("method-override"),
      morgan         = require("morgan"),
      path           = require("path"),
      stylus         = require("stylus");

// Create Express Application
const App = express();

// All environments for Application
App.set("env", process.env.NODEJS_ENV);
App.set("host", process.env.NODEJS_IP || "127.0.0.1");
App.set("port", process.env.NODEJS_PORT || 8080);
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));
App.use(methodOverride());
App.set("views", path.join(__dirname, "Views"));
App.set("view engine", "pug");
App.use(stylus.middleware(path.join(__dirname, "Static")));
App.use(express.static(path.join(__dirname, "Static")));
App.set("x-powered-by", false);

// Debug log in Development
if (App.get("env") === "development") {
    App.use(errorHandler());
    App.use(morgan("[:date[clf]] :remote-addr :remote-user :method :url HTTP/:http-version :status - :response-time ms"));
    App.locals.pretty = true;
}

// Default handler
App.get("/", function (req, res) {
    res.send("Hello World");
});

// Listen to port for request
App.listen(App.get("port"), App.get("host"), function () {
    console.log(`Express server listening on ${App.get("host")}:${App.get("port")}`);
});
