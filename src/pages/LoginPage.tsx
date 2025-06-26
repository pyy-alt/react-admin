import { Login, useLogin, useNotify } from "react-admin";
import { FormEvent, FormEventHandler } from "react";

export const LoginPage = () => {
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit: FormEventHandler<HTMLDivElement> = (
    event: FormEvent<HTMLDivElement>,
  ) => {
    event.preventDefault(); // 阻止默认行为
    const target = event.currentTarget;
    const usernameInput = target.querySelector(
      'input[name="username"]',
    ) as HTMLInputElement | null;
    const passwordInput = target.querySelector(
      'input[name="password"]',
    ) as HTMLInputElement | null;

    if (usernameInput && passwordInput) {
      const username = usernameInput.value;
      const password = passwordInput.value;

      login({ username, password })
        .then(() => {
          // 登录成功后由 React-Admin 自动重定向
        })
        .catch((error: Error) => {
          notify(`登录失败: ${error.message}`, { type: "warning" });
        });
    } else {
      notify("无法获取用户名或密码", { type: "warning" });
    }
  };

  return (
    <Login
      backgroundImage="https://source.unsplash.com/random/1600x900/?library"
      sx={{
        "& .RaLogin-card": {
          minWidth: 300,
          marginTop: 6,
        },
      }}
      onSubmit={handleSubmit}
    />
  );
};
