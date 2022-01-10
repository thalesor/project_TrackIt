import React, { useState, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from "./contexts/UserContext";
import Header from './components/Header/Index';
import Footer from './components/Footer/Index';
import Habitos from './components/Habitos/Index';
import SignUp from './components/SignUp/Index';
import SignIn from './components/SignIn/Index';
import Historico from './components/Historico/Index';
import Hoje from './components/Hoje/Index';
import axios from 'axios';

function App() {

  const [userData, setUserData] = useState(localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null);
  const [todayProgressState, setTodayProgressState] = useState(0);
  const [isVisibleMessage, setIsVisibleMessage] = useState(false);
  const initialMessageState = 
  {
    showCancel : false,
    message: '',
    type: 'error',
    confirmBtnText: '',
    cancelBtnText: '',
    fn: null,
    messageTitle: ''
  };
  const [messageData, setMessageData] = useState(initialMessageState);

  const displayMessage = (messageConfig) =>
  {
    setMessageData(messageConfig);
    setIsVisibleMessage(true);
  }

  const hideMessage = () => 
  {
    setIsVisibleMessage(false);
    setMessageData(initialMessageState);
  }

  const getTodayProgress = () =>
  {
    axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, {
      headers: {
              "Authorization": `Bearer ${userData.token}`
          }
      })
      .then(response => 
      {
          const total = response.data.length;
          const completed = response.data.filter(habit=> habit.done).length;
          setTodayProgressState(parseInt((completed/total)*100));
      })
  }

  useEffect(() => {
    if(userData)
    {
      getTodayProgress();
    }
  }, [])

  const logout = () =>
  {
    localStorage.clear();
    window.location.replace("/");
  }

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={
      <UserContext.Provider value={{userData, setUserData, displayMessage}}>
      <SignIn />
      </UserContext.Provider>
      }></Route> 
      <Route path="/cadastro" element={
        <UserContext.Provider value={{displayMessage}}>
        <SignUp />
        </UserContext.Provider>
      }></Route> 
      <Route path="/habitos" element={
        <>
        <UserContext.Provider value={{userData, setUserData, logout, todayProgressState, getTodayProgress, displayMessage, hideMessage}}>
        <Header/>
        <Habitos />
        <Footer />
        </UserContext.Provider>
         </>
      }></Route>
      <Route path="/hoje" element={
        <>
        <UserContext.Provider value={{userData, setUserData, logout, todayProgressState, setTodayProgressState, getTodayProgress}}>
        <Header/>
        <Hoje />
        <Footer />
        </UserContext.Provider>
         </>
      }></Route>
      <Route path="/historico" element={
        <>
        <UserContext.Provider value={{userData, displayMessage, logout}}>
        <Header/>
        <Historico />
        <Footer />
        </UserContext.Provider>
         </>
      }></Route>  
      </Routes>
      { isVisibleMessage && 
        <SweetAlert
            type={messageData.type}
            showCancel={messageData.showCancel}
            confirmBtnText= {messageData.confirmBtnText ? messageData.confirmBtnText : "Ok"}
            cancelBtnText= {messageData.cancelBtnText}
            title={messageData.title}
            onConfirm={()=> {
              if(messageData.fn)
              messageData.fn()
              else
              hideMessage();
            }}
            onCancel={()=> hideMessage()}
            >
            {messageData.message}
        </SweetAlert>
        }
    </BrowserRouter>
  );
}


export default App;
