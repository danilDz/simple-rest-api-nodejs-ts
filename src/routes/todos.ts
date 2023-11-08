import { Router } from "express";

import { Todo } from "../models/todo";

type RequestBody = {text: string};
type RequestParams = {todoId: string};

let todos: Array<Todo> = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "Added successfully!", todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  const tId = params.todoId;
  const todoIndex = todos.findIndex((item) => item.id === tId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    res.status(200).json({ message: "Updated successfully!", todos });
  } else {
    res.status(404).json({ message: "Couldn't find todo for this id." });
  }
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter((item) => item.id !== params.todoId);
  res.status(200).json({ message: "Deleted successfully!", todos });
});

export default router;
