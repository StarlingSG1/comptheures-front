import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { loginUser, verifyToken } from "../api/auth/auth";

const UserContext = React.createContext({ user: null });
UserContext.displayName = "UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [theme, setTheme] = useState(false);

  const navigate = useRouter();

  const loginTheUser = async (payload, token) => {
    setLoading(true);
    setStatus("pending");
    payload.captcha = token
    const user = await loginUser(payload);
    if (!user.error) {
      localStorage.setItem("vb-bmx-token", user.token);
      setUser(user);
      setStatus("connected");
      setNoLogged(false);
      setRedirection(false);
      if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
        setRedirectionAdmin(false);
      }
      setLoading(false);
      navigate.push("/");
    } else {
      toast.error(user.message);
      setStatus("error");
      setLoading(false);
    }
  };

  const verifyTheToken = async () => {
    setLoading(true);
    const userToken = await verifyToken();
    if (userToken) {
      setUser(userToken.user);
      if (userToken?.user?.role === "ADMIN" || userToken?.user?.role === "SUPERADMIN") {
        setRedirectionAdmin(false);
        setRedirection(false);
        setNoLogged(false);
      }
      setNoLogged(false)
      setStatus("connected");
      setLoading(false);
    }
    else {
      setLoading(false);
    }
  }

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

  // useEffect(() => {
  //   verifyTheToken();
  // }, []);

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
      
    }),
    [user, setUser,  burgerOpen, getLogo, theme, setTheme, setBurgerOpen, loading, setLoading, loginTheUser, status, verifyTheToken, setStatus]
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
