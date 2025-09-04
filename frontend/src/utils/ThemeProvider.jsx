import { useEffect } from "react";
import { useSelector } from "react-redux";
import App from "@/App";

const ThemeProvider = () => {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);



  return <App />;
};

export default ThemeProvider;
