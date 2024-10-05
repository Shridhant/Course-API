const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const courses = [
  {
    id: 1,
    title: "Data Science",
    description: "Learn Data Science.",
    duration: "4 hours",
  },
  {
    id: 2,
    title: "Python",
    description: "Learn Python.",
    duration: "6 hours",
  },
  {
    id: 3,
    title: "React",
    description: "Learn React.",
    duration: "3 hours",
  },
];

app.get("/courses", (req, res) => {
  console.log("GET request for all courses:", courses);
  res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const selectedCourse = courses.find((course) => course.id === id);

  if (selectedCourse) {
    res.status(200).json(selectedCourse);
  } else {
    res.status(404).send("Course not found");
  }
});

app.post("/courses", (req, res) => {
  console.log("POST request received with body:", req.body);

  const newCourse = {
    id: courses.length + 1,
    ...req.body,
  };

  courses.push(newCourse);
  console.log("Updated courses array:", courses);

  res.status(201).json(newCourse);
});

app.put("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const findid = courses.findIndex((e) => e.id === id);

  if (findid === -1) {
    return res.status(404).send("Course not found!");
  }

  courses[findid] = {
    id,
    ...req.body,
  };

  res.json(courses[findid]);
});

app.delete("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newid = courses.findIndex((e) => e.id === id);

  if (newid === -1) {
    return res.status(404).send("Course not found!");
  }
  courses.splice(newid, 1);
  res.json({ message: "Course deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
