import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./components/ui/table";

type Todo = {
  text: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index: number) => {
    const updatedTodos = todos.map((todo: Todo, i: number) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i: number) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
              className="flex-1"
            />
            <Button onClick={addTodo}>Add</Button>
          </div>
          <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </CardContent>
      </Card>
    </div>
  );
}

function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: {
  todos: { text: string; completed: boolean }[];
  toggleTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Task</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo, index) => (
          <TableRow key={index}>
            <TableCell>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
            </TableCell>
            <TableCell>
              <Button variant="ghost" onClick={() => deleteTodo(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
