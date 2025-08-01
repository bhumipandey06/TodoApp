import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-gray-500">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-bold text-lg">{"My Todo App"}</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
