import { Button, Form } from "@heroui/react";
import { LoginEl } from "./style";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import { notify } from "../lib/notify";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { Routes } from "@/constants";
import Cookies from "js-cookie";

type LoginPayload = {
  email: string
  password: string
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(data: LoginPayload) {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();
      Cookies.set("token", result.token, {
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });
      notify('Successfully logged in', 'success')
      router.push(Routes.USERS)
    } catch (error) {
      console.log(error)
      notify('Error', 'danger')
    }
    setIsLoading(false)
  }

  function renderLoginForm() {
    return <Form
      autoComplete="off"
      className="w-full max-w-xs flex flex-col gap-4 p-[20px] min-w-[400px]"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: LoginPayload = Object.fromEntries(formData) as LoginPayload;

        handleSubmit(data);
      }}
    >
      {isLoading && <Loader />}
      <div className="text-center w-full">
        <LoginEl.LogoContainer style={{ backgroundImage: `url('/logo.png')` }} />
        <LoginEl.Title>{'Law firm'}</LoginEl.Title>
      </div>
      <LoginEl.FormHeading>{'Sign in'}</LoginEl.FormHeading>
      <CustomInput
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        name="email"
        type="email"
        variant="bordered"
        placeholder="Enter email"
      />
      <CustomInput
        isRequired
        errorMessage="Please enter a password"
        label="Password"
        type="password"
        name="password"
        variant="bordered"
        placeholder="Enter password"
      />
      <div className="flex gap-[10px] justify-end w-full">
        <Button variant="shadow" color="primary" type="submit">{'Login'}</Button>
        <Button variant="shadow" color="primary" type="button" onPress={() => router.push(Routes.USERS)}>{'Register'}</Button>
      </div>
    </Form>
  }

  return <LoginEl.Wrapper>
    <LoginEl.Container>
      <LoginEl.Grid>
        <LoginEl.LeftSide />
        <LoginEl.RightSide>
          {renderLoginForm()}
        </LoginEl.RightSide>
      </LoginEl.Grid>
    </LoginEl.Container>
  </LoginEl.Wrapper>
}
export default Login