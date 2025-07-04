import { Login } from "react-admin";
export const LoginPage = () => {
  return (
    <Login
      backgroundImage="https://picsum.photos/1920/900"
      sx={{
        "& .RaLogin-card": {
          minWidth: 300,
          marginTop: 6,
        },
      }}
    />
  );
};
