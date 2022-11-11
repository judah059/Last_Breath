import React from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import MainPage from "./pages/MainPage/MainPage";
import AboutCompany from "./pages/AboutCompany/AboutCompany";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import TicketsOrderPage from "./pages/TicketsOrderPage/TicketsOrderPage";
import SnackOrderPage from "./pages/TicketsOrderPage/SnackOrderPage/SnackOrderPage";

const App: React.FC = () => {
    return (
        <div className="wrapper">
            <Routes>
                <Route path='/' element={<StartPage/>}></Route>
                <Route path='main' element={<MainPage/>}></Route>
                <Route path='about-company' element={<AboutCompany/>}></Route>
                <Route path='profile' element={<ProfilePage/>}></Route>
                <Route path='tickets-order' element={<TicketsOrderPage/>}></Route>
                <Route path='tickets-order/snack' element={<SnackOrderPage/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
