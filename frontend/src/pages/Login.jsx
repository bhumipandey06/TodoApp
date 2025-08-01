import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
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
        // alert(res.data.message)
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // alert(error.response.data.message)
    }
  };
  return (
    <div>
      <Input
        value={user.email}
        onChange={changeHandler}
        name="email"
        type="text"
        placeholder="Email"
        className=" mb-2"
      />
      <Input
        value={user.password}
        onChange={changeHandler}
        name="password"
        type="text"
        placeholder="Password"
        className=" mb-2"
      />
      <Button onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
