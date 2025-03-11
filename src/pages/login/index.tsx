import { Button, Form } from "@heroui/react";
import { LoginEl } from "./style";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import { notify } from "../lib/notify";
import { useRouter } from "next/router";
import { Routes } from "@/constants";
import { AuthService } from "@/lib/api/auth";
import { AxiosError } from "axios";

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
      await AuthService.login(data)
      notify('Successfully logged in', 'success')
      router.push(Routes.DASHBOARD)
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      notify(errorMessage, "danger");
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
      <div className="text-center w-full">
        <LoginEl.LogoContainer style={{ backgroundImage: `url('/radusinovic.jpg')` }} />
        <LoginEl.Title>{'Radusinović'}</LoginEl.Title>
      </div>
      <LoginEl.FormHeading>{'Sign in'}</LoginEl.FormHeading>
      <CustomInput
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        name="email"
        disabled={isLoading}
        type="email"
        variant="bordered"
        placeholder="Enter email"
      />
      <CustomInput
        isRequired
        errorMessage="Please enter a password"
        label="Password"
        disabled={isLoading}
        type="password"
        name="password"
        variant="bordered"
        placeholder="Enter password"
      />
      <div className="flex gap-[10px] justify-end w-full">
        <Button
          isLoading={isLoading}
          variant="shadow"
          color="primary"
          type="submit">
          {'Login'}
        </Button>
        <Button
          variant="shadow"
          color="primary"
          type="button"
          onPress={() => router.push(Routes.USERS)}>
          {'Register'}
        </Button>
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