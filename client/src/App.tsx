import React from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import MainPage from "./pages/MainPage/MainPage";
import AboutCompany from "./pages/AboutCompany/AboutCompany";

const App: React.FC = () => {
    return (
        <div className="wrapper">
            <Routes>
                <Route path='/' element={<StartPage/>}></Route>
                <Route path='main' element={<MainPage/>}></Route>
                <Route path='about-company' element={<AboutCompany/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
