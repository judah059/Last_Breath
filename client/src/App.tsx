import React, {useEffect} from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import MainPage from "./pages/MainPage/MainPage";
import AboutCompany from "./pages/AboutCompany/AboutCompany";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import TicketsOrderPage from "./pages/TicketsOrderPage/TicketsOrderPage";
import SnackOrderPage from "./pages/TicketsOrderPage/SnackOrderPage/SnackOrderPage";
import Cart from "./pages/Cart/Cart";
import MoviePage from "./pages/MoviePage/MoviePage";
import PaymentHistory from "./pages/PaymentHistory/PaymentHistory";
import Cinema from "./pages/Cinema/Cinema";
import {API} from "./utils/api";
import {setPayment} from "./store/user/user.slice";
import {useAppDispatch} from "./utils/hooks/redux";
import OnlineCinemaMainPage from "./pages/OnlineCinemaMainPage/OnlineCinemaMainPage";
import MovieOnlinePage from "./pages/MovieOnlinePage/MovieOnlinePage";


const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const fetchPayment = async () => {
        const res = await API.getPayment();
        dispatch(setPayment(res))
    }

    useEffect(() => {
        fetchPayment()
    }, [])

    return (
        <div className="wrapper">

            <Routes>
                <Route path='/' element={<StartPage/>}></Route>
                <Route path='main' element={<MainPage/>}></Route>
                <Route path='main/movies/:id' element={<MoviePage/>}></Route>
                <Route path='about-company' element={<AboutCompany/>}></Route>
                <Route path='profile' element={<ProfilePage/>}></Route>
                <Route path='tickets-order' element={<TicketsOrderPage/>}></Route>
                <Route path='tickets-order/snack' element={<SnackOrderPage/>}></Route>
                <Route path='cart' element={<Cart/>}></Route>
                <Route path='payment-history' element={<PaymentHistory/>}></Route>
                <Route path='cinema/:id' element={<Cinema/>}></Route>
                <Route path='online' element={<OnlineCinemaMainPage/>}></Route>
                <Route path='online/watch/:id' element={<MovieOnlinePage/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
