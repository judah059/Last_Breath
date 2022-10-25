import React, {useState} from 'react';
import Header from "./Header/Header";
import Drawer from "./Drawer/Drawer";

interface HeaderDrawerProps {
    toLinkText: string
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = (props) => {

    const [isCartOpened, setIsCartOpened] = useState(false);

    return(
        <div>
            <Header toLinkText={props.toLinkText} onClickDrawer={()=>setIsCartOpened(true)}/>
            <Drawer isCartOpened={isCartOpened} onClickCloseDrawer={()=>setIsCartOpened(false)}/>
        </div>
    )
};

export default HeaderDrawer;