import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../services/userService";
import { setUser, logout } from "../store/authSlice"; // changed import

const useUpdateUserData = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const updateUserData = async () => {
    setLoading(true);
    try {
      const userData = await userService.getCurrentUser();
      if (userData) {
        dispatch(setUser(userData)); // dispatch setUser instead of login
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateUserData();
  }, []);

  return updateUserData;
};

export default useUpdateUserData;