interface TodoItem {
    id: number;
    task: string;
    completed: boolean;
    dueDate?: Date; // Optional dueDate property
}


class TodoList {
    private todos: TodoItem[] = []; // Array to store TodoItem objects
    private nextId: number = 1; // todo increment

    // Add  todo
    addTodo(task: string, dueDate?: Date): void {
        if (!task.trim()) {
            throw new Error("Task cannot be empty.");
        }

        const newTodo: TodoItem = {
            id: this.nextId++,
            task: task.trim(),
            completed: false,
            dueDate,
        };
        this.todos.push(newTodo);
    }

    // tick a todo as completed
    completeTodo(id: number): boolean {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = true;
            return true;
        }
        return false;
    }

    // Remove a Todo
    removeTodo(id: number): boolean {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter((todo) => todo.id !== id);
        return initialLength !== this.todos.length;
    }

    // List all todos
    listTodos(): TodoItem[] {
        return [...this.todos];
    }

    // Filter todos by completion 
    filterByStatus(completed: boolean): TodoItem[] {
        return this.todos.filter((todo) => todo.completed === completed);
    }

    // Update a todo's task 
    updateTaskDescription(id: number, newTask: string): boolean {
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
    updateDueDate(id: number, newDueDate: Date): boolean {
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
    clearCompleted(): number {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter((todo) => !todo.completed);
        return initialLength - this.todos.length;
    }

    // Get overdue todos
    getOverdueTodos(): TodoItem[] {
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
todoList.updateTaskDescription(2, "Buy weekly groceries");
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