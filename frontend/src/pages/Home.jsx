import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Navbar from "./Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/todo/",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos([...todos,res.data.todo])
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/todo/");
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
      <div className="flex items-center gap-5 mt-5">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a New Todo..."
          className="w-1/4"
        />
        <Button onClick={addTodoHandler}> Add Todo </Button>
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write A Description..."
        className="w-1/4 mt-2"
      />

      <div className="grid grid-cols-5 gap-2 mt-5">
      {todos.map((todo) => (
        <Card key={todo._id} className="bg-gray-200">
          <CardHeader>
            <CardTitle>{todo.title}</CardTitle>
            <CardDescription>{todo.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
      </div>
    </div>
  );
};

export default Home;
