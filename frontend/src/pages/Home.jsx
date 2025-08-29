import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Navbar from "./Navbar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "https://todoapp-gz7f.onrender.com/api/todo/",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos([...todos, res.data.todo]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      const res = await axios.delete(`https://todoapp-gz7f.onrender.com/api/todo/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateTodoHandler = async () => {
    try {
      const res = await axios.put(
        `https://todoapp-gz7f.onrender.com/api/todo/${editId}`,
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos((prev) =>
          prev.map((todo) => (todo._id === editId ? res.data.todo : todo))
        );

        setTitle("");
        setDescription("");
        setEditId(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo._id);
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get("https://todoapp-gz7f.onrender.com/api/todo/");
        if (res.data.success) {
          setTodos(res.data.todos);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodo();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center gap-5 mt-5 text-white">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a New Todo..."
          className="w-1/4"
        />
        <Button onClick={editId ? updateTodoHandler : addTodoHandler}>
          {editId ? "Update Todo" : "Add Todo"}
        </Button>
        {editId && (
          <Button
            variant="outline"
            onClick={() => {
              setEditId(null);
              setTitle("");
              setDescription("");
            }}
          >
            Cancel Edit
          </Button>
        )}
      </div>

      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write A Description..."
        className="w-1/4 mt-2 text-white"
      />

      <div className="grid grid-cols-5 gap-2 mt-5">
        {todos.map((todo) => (
          <Card key={todo._id} className="bg-gray-500">
            <CardHeader>
              <CardTitle className="text-black ">{todo.title}</CardTitle>
              <CardDescription className="text-gray-200">{todo.description}</CardDescription>
              <div className="flex gap-2 mt-2">
                <Button onClick={() => handleEdit(todo)}>Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteTodoHandler(todo._id)}
                >
                  Delete
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
