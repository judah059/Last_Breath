import React, {useState} from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";

const App: React.FC = () => {

    const [isCartOpened, setIsCartOpened] = useState(false);

    return (
        <div className="wrapper">
            <Header onClickDrawer={()=>setIsCartOpened(true)}/>
            <Drawer isCartOpened={isCartOpened} onClickCloseDrawer={()=>setIsCartOpened(false)}/>
        </div>
    );
}

export default App;
