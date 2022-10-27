import React, {useState} from 'react';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import s from './Signing.module.scss'
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface SigningProps {
    isSigningOpened: boolean
    onClickSigningClose: () => void
}


const Signing: React.FC<SigningProps> = ({isSigningOpened, onClickSigningClose}) => {

    const [formType, setFormType] = useState<"signIn" | "signUp">("signUp");

    const onClosePopupHandler = () => {
        document.body.style.overflow = 'unset';
        onClickSigningClose()
    }


    return (
        <Popup
            open={isSigningOpened}
            onClose={onClosePopupHandler}
            modal
            nested
            {...{ overlayStyle: {overflow: 'auto'} }}
        >
            <div className={s.container}>
                {formType === "signIn" && <SignInForm onOpenSignIn={() => setFormType("signIn")}/>}
                {formType === "signUp" && <SignUpForm onOpenSignUp={() => setFormType("signUp")}/>}
            </div>
        </Popup>
    );
};

export default Signing;