"use strict";
class TodoList {
    constructor() {
        this.todos = []; // Array to store TodoItem objects
        this.nextId = 1; // todo increment
    }
    // Add  todo
    addTodo(task, dueDate) {
        if (!task.trim()) {
            throw new Error("Task cannot be empty.");
        }
        const newTodo = {
            id: this.nextId++,
            task: task.trim(),
            completed: false,
            dueDate,
        };
        this.todos.push(newTodo);
    }
    // tick a todo as completed
    completeTodo(id) {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = true;
            return true;
        }
        return false;
    }
    // Remove a Todo
    removeTodo(id) {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter((todo) => todo.id !== id);
        return initialLength !== this.todos.length;
    }
    // List all todos
    listTodos() {
        return [...this.todos];
    }
    // Filter todos by completion 
    filterByStatus(completed) {
        return this.todos.filter((todo) => todo.completed === completed);
    }
    // Update a todo's task 
    updateTaskDescription(id, newTask) {
        if (!newTask.trim()) {
            throw new Error("Task cannot be empty.");
        }
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.task = newTask.trim();
            return true;
        }
        return false;
    }
    // Update a todo's due date
    updateDueDate(id, newDueDate) {
        if (!(newDueDate instanceof Date) || isNaN(newDueDate.getTime())) {
            throw new Error("Invalid due date.");
        }
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.dueDate = newDueDate;
            return true;
        }
        return false;
    }
    // Clear all completed todos
    clearCompleted() {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter((todo) => !todo.completed);
        return initialLength - this.todos.length;
    }
    // Get overdue todos
    getOverdueTodos() {
        const now = new Date();
        return this.todos.filter((todo) => !todo.completed && todo.dueDate && todo.dueDate < now);
    }
}
const todoList = new TodoList();
console.log("Adding todos:");
todoList.addTodo("SOTU", new Date("2025-03-03"));
console.log("Added todo 1");
todoList.addTodo("Q/A session");
console.log("Added todo 2");
// List all todos
console.log("\nAll todos:");
console.log(todoList.listTodos());
// Complete a todo
console.log("\nCompleting todo 1:");
todoList.completeTodo(1);
console.log("Completed:", todoList.listTodos()[0]);
// Filter completed todos
console.log("\nCompleted todos:");
console.log(todoList.filterByStatus(true));
// Update a task
console.log("\nUpdating todo 2 description:");
todoList.updateTaskDescription(2, "Listen to recorded session");
console.log("Updated todo:", todoList.listTodos()[1]);
// List overdue todos
console.log("\nOverdue todos:");
console.log(todoList.getOverdueTodos());
// Remove a todo
console.log("\nRemoving todo 1:");
todoList.removeTodo(1);
console.log("Remaining todos:", todoList.listTodos());
// Clear completed todos
console.log("\nClearing completed todos:");
const clearedCount = todoList.clearCompleted();
console.log(`Cleared ${clearedCount} completed todos`);
console.log("Final todos:", todoList.listTodos());
