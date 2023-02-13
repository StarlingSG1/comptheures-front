import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { loginUser, verifyToken } from "../api/auth/auth";

const UserContext = React.createContext({ user: null });
UserContext.displayName = "UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [theme, setTheme] = useState(false);
  const [enterprise, setEnterprise] = useState(null);

  const navigate = useRouter();

  const loginTheUser = async (payload) => {
    setLoading(true);
    setStatus("pending");
    // payload.captcha = token
    const user = await loginUser(payload);
    if (!user.error) {
      localStorage.setItem("comptheures-token", user.token);
      setUser(user);
      setStatus("connected");
      setLoading(false);
      navigate.push("/comptheures");
    } else {
      toast.error(user.message);
      setStatus("error");
      setLoading(false);
    }
  };

  const verifyTheToken = async () => {
    setLoading(true);
    const userToken = await verifyToken();
    if(userToken.error === true){
      localStorage.removeItem("comptheures-token");
      setLoading(false);
      navigate.push("/login");
    }
    else {
      setUser(userToken.user);
      setStatus("connected");
      setLoading(false);
    }
  }

  const logoutTheUser = () => {
    localStorage.removeItem("comptheures-token");
    setUser(null);
    setStatus("disconnected");
    navigate.push("/");
  };

  const getLogo = () => {
    const theme = localStorage.getItem("comptheuresTheme");
    const themeValue = theme;

    if (themeValue === 'dark') {
      setTheme(true)
    } else if (themeValue === 'light') {
      setTheme(false)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
      setTheme(true)
    } else {
      setTheme(false)
    }
  }

  useEffect(() => {
    verifyTheToken();
  }, []);

  useEffect(() => {
    setEnterprise(user?.userEnterprise?.enterprise)
  }, [user]);

  const stateValues = useMemo(
    () => ({
      user,
      setUser,
      loading,
      setLoading,
      loginTheUser,
      status,
      verifyTheToken,
      setStatus,
      burgerOpen,
      theme,
      setTheme,
      setBurgerOpen,
      getLogo,
      logoutTheUser,
      enterprise,
      setEnterprise
    }),
    [user, setUser, burgerOpen, enterprise, setEnterprise, getLogo, theme, setTheme, setBurgerOpen, loading, setLoading, loginTheUser, status, verifyTheToken, setStatus, logoutTheUser]
  );

  return (
    <UserContext.Provider value={stateValues}>{children}</UserContext.Provider>
  );
};
const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("Context was used outside of its Provider");
  }

  return context;
};

export { UserContextProvider, useUserContext, UserContext };
