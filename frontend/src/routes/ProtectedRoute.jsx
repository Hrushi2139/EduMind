import { Navigate } from "react-router-dom";
import { getToken } from "../utils/authStorage";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  console.log(token)
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
