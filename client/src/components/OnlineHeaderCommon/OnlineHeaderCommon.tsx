import React, {useState} from 'react';
import OnlineHeader from "../../components/OnlineHeaderCommon/OnlineHeader/OnlineHeader";
import Signing from "../../components/Forms/Signing";
import UserDrawer from "../../components/UserDrawer/UserDrawer";

interface OnlineCHeaderCommon {
    toLinkText: string
}

const OnlineCHeaderCommon: React.FC<OnlineCHeaderCommon> = (props) => {

    const [isUserDrawerOpened, setIsUserDrawerOpened] = useState(false);
    const [isSigningOpened, setIsSigningOpened] = useState(false);
    const [formType, setFormType] = useState<"signIn" | "signUp">("signIn");

    return (
        <>
            <OnlineHeader toLinkText={props.toLinkText} onClickSigningOpen={() => setIsSigningOpened(true)}
                          onClickOpenUserDrawer={() => setIsUserDrawerOpened(true)}/>

            <Signing formType={formType}
                     setFormType={setFormType}
                     isSigningOpened={isSigningOpened}
                     onClickSigningClose={() => setIsSigningOpened(false)}/>

            <UserDrawer isUserDrawerOpened={isUserDrawerOpened}
                        onClickCloseUserDrawer={() => setIsUserDrawerOpened(false)}/>
        </>
    )
};

export default OnlineCHeaderCommon;