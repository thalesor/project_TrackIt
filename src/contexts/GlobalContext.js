import { createContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const persistedAuth = JSON.parse(localStorage.getItem('auth'));
  const [auth, setAuth] = useState(persistedAuth);

  const [todayProgressState, setTodayProgressState] = useState(0);

  const getTodayProgress = (progressData) => {
      const total = progressData.length;
      const completed = progressData.filter(habit=> habit.done).length;
      setTodayProgressState(parseInt((completed/total)*100));
  }

  const login = (authData) => {
    setAuth(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  }

  const logoff = () => {
    setAuth('');
    localStorage.removeItem('auth');
    window.location.replace("/");
  }

  return (
    <GlobalContext.Provider value={{ auth, login, logoff, todayProgressState, setTodayProgressState, getTodayProgress }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;