const express = require("express");
const router = express.Router();
const con = require("../db/connect");

router.get("/", (req, res) => {
  res.render("index", { page: "home" });
});

router.get("/explore", (req, res) => {
  let query = `SELECT * FROM schools`;
  con.query(query, (err, result) => {
    res.render("explore", { page: "explore", schools: result });
  });
});

router.get("/view/:school", (req, res) => {
  let school_id = req.params.school;
  con.query(`SELECT * FROM schools INNER JOIN details ON schools.schoolId = details.schoolId AND schools.schoolId = '${school_id}'`, (err, result) => {
    let { achievements, faculties, activities } = result[0];
    let ach = [],
      x = achievements.split(",");
    x.forEach(function (e) {
      if (ach.indexOf(e) == -1) ach.push(e);
    });
    let fac = [],
      y = faculties.split(",");
    y.forEach(function (e) {
      if (fac.indexOf(e) == -1) fac.push(e);
    });

    let act = [],
      z = activities.split(",");
    z.forEach(function (e) {
      if (act.indexOf(e) == -1) act.push(e);
    });
    res.render("view", {
      page: "view",
      ...result[0],
      achievements: ach,
      faculties: fac,
      activities: act,
    });
  });
});

router.get("/search", (req, res) => {
  res.render("search", { page: "search" });
});

router.post("/search", (req, res) => {
  let query = req.body.school;
  let range = req.body.fee;
  let getSchools = `SELECT * FROM schools INNER JOIN details ON schools.schoolId=details.schoolId WHERE '${query}' IN (schools.city,schools.name,schools.state) AND details.fee<='${range}'`;
  con.query(getSchools, (err, results) => {
    console.log(results);
    res.render("explore", { page: "explore", schools: results, msg: query });
  });
});

router.get("/about", (req, res) => {
  res.render("about", { page: "about" });
});

router.get("/chatbot", (req, res) => {
  res.render("chatbot", { page: "chatbot" });
});

module.exports = router;
