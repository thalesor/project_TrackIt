import React, { useEffect } from 'react';
import GlobalStyle from "./styles/globalStyle";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './views/Header/Index';
import Footer from './views/Footer/Index';
import Habitos from './views/Habitos/Index';
import SignUp from './views/SignUp/Index';
import SignIn from './views/SignIn/Index';
import Historico from './views/Historico/Index';
import Hoje from './views/Hoje/Index';
import { GlobalProvider }  from "./contexts/GlobalContext";

function App() {
 
  return (
    <GlobalProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <SignIn />}></Route> 
            <Route path="/cadastro" element={ <SignUp />}></Route> 
              <Route path="/habitos" element={
                <>
                <Header/>
                <Habitos />
                <Footer />
                </>
              }></Route>
              <Route path="/hoje" element={
                <>
                <Header/>
                <Hoje />
                <Footer />
                </>
              }></Route>
              <Route path="/historico" element={
                <>
                <Header/>
                <Historico />
                <Footer />
                </>
              }></Route>  
          </Routes>
        </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
