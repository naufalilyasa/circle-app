import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import { Input } from "../ui/input";

interface LoginFormState {
  username: string;
  password: string;
}

function LoginForm() {
  // const { user, setUser } = useContext(AuthContext);
  // const { formState, setFormState } = useState<LoginFormState>({
  //   username: "",
  //   password: "",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  //   setFormState({ ...formState, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(formState);
  //   setUser(formState);
  // };

  return (
    <div className="mx-auto w-100 pt-30">
      <form
        action=""
        className="flex flex-col justify-center items-center gap-5"
        // onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-start items-start w-full gap-3">
          <h1 className="text-4xl font-bold text-[#04a41e]">Circle</h1>
          <h2 className="text-3xl font-bold">Login to Circle</h2>
        </div>
        <div className="flex flex-col w-100 gap-3">
          <Input
            className="w-full border rounded-md p-2 border-gray-500 text-lg py-6 placeholder:text-neutral-400"
            name="email"
            type="email"
            id="email"
            placeholder="Email/Username"
            // label={
            //   <>
            //     <span style={{ color: "red" }}>*</span> Email
            //   </>
            // }
            // onChange={handleChange}
          />
          <Input
            className="w-full border rounded-md p-2 border-gray-500 text-lg py-6 placeholder:text-neutral-400"
            name="username"
            type="text"
            id="username"
            placeholder="Password"
            // onChange={handleChange}
          />
          <NavLink to={"/forgot"} className={"text-right text-sm"}>
            Forgot Password?
          </NavLink>
          <Button
            type="submit"
            className="bg-[#04a41e] hover:bg-[#04a41e]/75 rounded-3xl py-5 text-xl font-bold text-center"
          >
            Login
          </Button>
          <div className="flex pt-1">
            <p>Don't have an account yet? </p>
            <NavLink to={"/register"} className={"ps-1 text-[#04a41e]"}>
              Create account
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
