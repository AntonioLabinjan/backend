const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// API routes
let todos = [
  { id: 1, text: "Learn Vue.js", done: false },
  { id: 2, text: "Learn Express.js", done: true },
];
app.get("/api/todos", (req, res) => res.json(todos));
app.post("/api/todos", (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(newTodo);
  res.json(newTodo);
});
app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (todo) {
    todo.done = !todo.done;
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});
app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== parseInt(req.params.id));
  res.json({ success: true });
});

// Serve frontend
const frontendPath = path.join(__dirname, "dist");
app.use(express.static(frontendPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
