import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ children }) => {

  const user = useSelector((state) => state.auth.user);


  if (!user) {
    return <Navigate to="/login" />;
  }



  return children;
};

export default CheckAuth;
