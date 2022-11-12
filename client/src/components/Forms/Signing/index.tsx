import React from 'react';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import s from './Signing.module.scss'
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface SigningProps {
    isSigningOpened: boolean
    onClickSigningClose: () => void
    setFormType: (type:"signIn" | "signUp") => void
    formType: "signIn" | "signUp"
}


const Signing: React.FC<SigningProps> = ({
                                             isSigningOpened,
                                             onClickSigningClose,
                                             formType,
                                             setFormType
                                         }) => {


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
            contentStyle={{width: '45%'}}
            {...{overlayStyle: {overflow: 'auto'}}}
        >
            <div className={s.container}>
                {formType === "signIn" && <SignInForm onOpenSignUp={() => setFormType("signUp")} onClickSigningClose={onClickSigningClose}/>}
                {formType === "signUp" && <SignUpForm onOpenSignIn={() => setFormType("signIn")} onClickSigningClose={onClickSigningClose}/>}
                <p className={s.backLink} onClick={onClosePopupHandler}>Back to site</p>
            </div>
        </Popup>
    );
};

export default Signing;