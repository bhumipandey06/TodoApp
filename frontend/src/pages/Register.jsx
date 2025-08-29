import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const res = await axios.post(
        "https://todoapp-gz7f.onrender.com/api/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col w-1/4 mx-auto mt-10 text-white">
      <Input
        value={user.fullname}
        onChange={changeHandler}
        name="fullname"
        type="text"
        placeholder="Full Name"
        className="mb-2"
      />
      <Input
        value={user.email}
        onChange={changeHandler}
        name="email"
        type="email"
        placeholder="Email"
        className="mb-2"
      />
      <Input
        value={user.password}
        onChange={changeHandler}
        name="password"
        type="password"
        placeholder="Password"
        className="mb-2"
      />
      <Button onClick={registerHandler}>Register</Button>
    </div>
  );
};

export default Register;
