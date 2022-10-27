import React from 'react';
import s from "./Signing.module.scss";
import logo from "../../../assets/logo.svg";
import range from "lodash.range";

interface SignUpFormProps {
    onOpenSignUp: () => void
}


const SignUpForm: React.FC<SignUpFormProps> = () => {
    return (
        <form className={s.signIn}>
            <div className={s.titleBlock}>
                <img src={logo} alt="logo"/>
                <h2>Cinema “Last Breath”</h2>
            </div>
            <div className={s.fields}>
                <div className={s.fieldBlock}>
                    <label>Full name</label>
                    <input type="text" placeholder={"Enter your full name"} className={s.field}/>
                </div>
                <div className={s.fieldBlock}>
                    <label>Email</label>
                    <input type="text" placeholder={"Enter your email"} className={s.field}/>
                </div>

                <div className={s.fieldBlock}>
                    <label>Date of birth</label>
                    <div className={s.selects}>
                        <select>
                            <option value="" disabled selected>MM</option>
                            {
                                range(1,13).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                        <select>
                            <option value="" disabled selected>DD</option>
                            {
                                range(1,32).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                        <select>
                            <option value="" disabled selected>YYYY</option>
                            {
                                range(1900, new Date().getFullYear() + 1).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className={s.fieldBlock}>
                    <label>Password</label>
                    <input type="password" className={s.field}/>
                </div>
                <div className={s.fieldBlock}>
                    <label>Repeat Password</label>
                    <input type="password" className={s.field}/>
                </div>
            </div>
            <div className={s.btnBlock}>
                <button>Sign Up</button>
                <p>Already have an account? <span>Sign in!</span></p>
            </div>
            <p className={s.backLink}>Back to site</p>
        </form>
    );
};

export default SignUpForm;