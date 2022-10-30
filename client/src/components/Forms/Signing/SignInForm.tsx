import React, {useState} from 'react';
import s from './Signing.module.scss'
import logo from '../../../assets/logo.svg'
import {useForm, SubmitHandler} from "react-hook-form";
import {login} from "../../../store/authentication/authentication.actions";
import {useAppDispatch} from "../../../utils/hooks/redux";
import {IReqUser} from "../../../utils/api/types";



interface SignInFormProps {
    onOpenSignUp: () => void
    onClickSigningClose: ()=>void

}


const SignInForm: React.FC<SignInFormProps> = ({onOpenSignUp, onClickSigningClose}) => {

    const [responseError, setResponseError] = useState(false);
    const [responseErrorMsg, setResponseErrorMsg] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm<IReqUser>();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IReqUser> = async formData => {

        try {
            const res = await dispatch(login(formData))


            if(res.payload === undefined){
                setResponseErrorMsg('ERR_CONNECTION_REFUSED')
            }else if(typeof res.payload === 'string'){
                const resMsg = JSON.parse(res.payload as string)
                setResponseErrorMsg(resMsg.detail)
            }else {
                onClickSigningClose()
            }



        } catch (e) {
            setResponseError(true);
            console.log((e as Error).message)        }
    };

    return (
        <form className={s.signIn} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.titleBlock}>
                <img src={logo} alt="logo"/>
                <h2>Cinema “Last Breath”</h2>
            </div>
            <div className={s.fields}>
                <div className={s.fieldBlock}>
                    <label>Email</label>
                    <input type="text"
                           placeholder={"Enter your email"}
                           className={s.field}
                           {...register("email", {required: true})}
                    />
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className={s.fieldBlock}>
                    <label>Password</label>
                    <input type="password"
                           className={s.field}
                           {...register("password", {required: true})}
                    />
                    {errors.password && <span>This field is required</span>}
                    <br/>
                    {responseError && <span>Incorrect Email/Password</span>}
                    <ul>
                        <li>

                            <label htmlFor="rememberMe">Remember me
                                <input type="checkbox"
                                       id="rememberMe"
                                       className={s.rememberMe}
                                       {...register("rememberMe")}
                                />
                                <span className={s.checkmark}></span>
                            </label>
                        </li>
                        <li>Forgot Password</li>
                    </ul>
                </div>
            </div>
            <div className={s.btnBlock}>
                {responseErrorMsg && <p>{responseErrorMsg}</p>}
                <button type="submit">Sign In</button>
                <p>Don’t have an account? <span onClick={onOpenSignUp}>Sign up for free!</span></p>
            </div>
        </form>
    );
};

export default SignInForm;