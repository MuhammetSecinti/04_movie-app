import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: displayName
      })
      navigate("/login");
      toastSuccessNotify("registered succesfully");
      console.log(userCredential);
    } catch (error) {
      toastErrorNotify("Registration failed");
    }
  };
  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toastSuccessNotify("login succesfully");
    } catch (error) {
      toastErrorNotify("incorrect email or password");
    }
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        toastSuccessNotify("logged out succesfully");
      })
      .catch((error) => {
        toastErrorNotify("logout failed");
      });
  };
  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
      } else {
        setCurrentUser(false);
      }
    });
  };
console.log(currentUser);
  const values = { currentUser, createUser, loginUser, logOut };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
