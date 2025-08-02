import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.fullname); 
    }
  }, []);
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-gray-500">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-bold text-lg">
        {user ? `${user}'s Todo App` : "My Todo App"}
        </h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
