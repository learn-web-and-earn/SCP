import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckGuest = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/" replace />; // redirect logged-in users to home (or dashboard)
  }

  return children;
};

export default CheckGuest;
