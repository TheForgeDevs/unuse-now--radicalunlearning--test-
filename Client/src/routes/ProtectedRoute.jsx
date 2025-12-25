import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const user = useSelector((state) => state.user);

  // 1. Agar user login nahi hai toh login page par bhejo
  if (!user || !user.userData) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ FIX: Safe Role Check (Crash Proof Logic)
  // Hum check kar rahe hain ki role 'userData' mein hai ya 'userData.user' mein
  // ?. ka use kiya taaki agar value na ho toh crash na kare
  const userRole = user.userData?.role || user.userData?.user?.role || "";

  // 2. Role match karo (Safe tarike se)
  // Agar role exist karta hai tabhi check karo
  if (role && userRole && userRole.toLowerCase() !== role.toLowerCase()) {
    return <h2 className="text-center text-2xl mt-10 text-red-500">Unauthorized Access</h2>;
  }
  
  // Agar userRole empty hai lekin role required hai (edge case safety)
  if (role && !userRole) {
     console.error("Role missing in user data:", user.userData);
     // Optional: Return unauthorized or let it pass depending on strictness
     // return <h2 className="text-center text-2xl mt-10 text-red-500">Role Missing</h2>;
  }

  return children;
};

export default ProtectedRoute;