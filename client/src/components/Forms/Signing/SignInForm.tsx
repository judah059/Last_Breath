import React from 'react';
import s from './Signing.module.scss'
import logo from '../../../assets/logo.svg'


interface SignInFormProps {
    onOpenSignUp: () => void
}


const SignInForm: React.FC<SignInFormProps> = ({onOpenSignUp}) => {
    return (
        <form className={s.signIn}>
            <div className={s.titleBlock}>
                <img src={logo} alt="logo"/>
                <h2>Cinema “Last Breath”</h2>
            </div>
            <div className={s.fields}>
                <div className={s.fieldBlock}>
                    <label>Email</label>
                    <input type="text" placeholder={"Enter your email"} className={s.field}/>
                </div>
                <div className={s.fieldBlock}>
                    <label>Password</label>
                    <input type="password" className={s.field}/>
                    <ul>
                        <li>

                            <label htmlFor="rememberMe">Remember me
                                <input type="checkbox" id={"rememberMe"} className={s.rememberMe} />
                                <span className={s.checkmark}></span>
                            </label>
                        </li>
                        <li>Forgot Password</li>
                    </ul>
                </div>
            </div>
            <div className={s.btnBlock}>
                <button>Sign In</button>
                <p>Don’t have an account? <span onClick={onOpenSignUp}>Sign up for free!</span></p>
            </div>
            <p className={s.backLink}>Back to site</p>
        </form>
    );
};

export default SignInForm;