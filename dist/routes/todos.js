"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added successfully!", todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const body = req.body;
    const params = req.params;
    const tId = params.todoId;
    const todoIndex = todos.findIndex((item) => item.id === tId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        res.status(200).json({ message: "Updated successfully!", todos });
    }
    else {
        res.status(404).json({ message: "Couldn't find todo for this id." });
    }
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    todos = todos.filter((item) => item.id !== params.todoId);
    res.status(200).json({ message: "Deleted successfully!", todos });
});
exports.default = router;
