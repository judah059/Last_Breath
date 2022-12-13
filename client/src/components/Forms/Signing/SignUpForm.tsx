import React, {useState} from 'react';
import s from "./Signing.module.scss";
import logo from "../../../assets/logo.svg";
import range from "lodash.range";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../utils/hooks/redux";
import {registration} from "../../../store/authentication/authentication.actions";
import {ErrorMessage} from "@hookform/error-message";
import CustomErrorMessage from "../../common/CustomErrorMessage/CustomErrorMessage";

interface SignUpFormProps {
    onOpenSignIn: () => void
    onClickSigningClose: () => void
}

interface registerInputs {
    userName: string
    firstName: string
    lastName: string
    email: string
    month: string
    day: string
    year: string
    password: string
    repeatPassword: string
}

interface IResError {
    username?: string[]
    email?: string[]
    custom?: string
}

const SignUpForm: React.FC<SignUpFormProps> = ({onOpenSignIn, onClickSigningClose}) => {
    const [responseErrorMsg, setResponseErrorMsg] = useState<IResError>({});
    const [isResponseError, setIsResponseError] = useState(false);

    const {register, handleSubmit, formState: {errors}, watch} = useForm<registerInputs>();

    const dispatch = useAppDispatch();


    const onSubmit: SubmitHandler<registerInputs> = async formData => {

        try {
            console.log(formData)

            const birthDate = `${formData.year}-${formData.month}-${formData.day}`

            let userData = {
                username: formData.userName,
                first_name: formData.firstName,
                last_name: formData.lastName,
                birth_date: birthDate,
                email: formData.email,
                password: formData.password
            }


            const res = await dispatch(registration(userData))

            console.log(res)
            if (res.payload === undefined) {
                setResponseErrorMsg({custom: 'ERR_CONNECTION_REFUSED'})
                setIsResponseError(true)
            } else if (typeof res.payload === 'string') {
                const resMsg: IResError = JSON.parse(res.payload as string)
                setResponseErrorMsg(resMsg)
                setIsResponseError(true)
            } else {
                onClickSigningClose()
            }


        } catch (e) {

            console.log(e)
        }
    };


    return (
        <form className={s.signIn} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.titleBlock}>
                <img src={logo} alt="logo"/>
                <h2>Cinema “Last Breath”</h2>
            </div>
            <div className={s.fields}>
                <div className={s.fieldBlock}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={"Enter your username name"}
                        className={s.field}
                        maxLength={14}
                        {...register("userName", {required: "This field is required"})}
                    />
                    <ErrorMessage errors={errors} name="userName" as="p" className={s.errorMsg}/>
                </div>

                <div className={s.fieldBlock}>
                    <label>First name</label>
                    <input
                        type="text"
                        placeholder={"Enter your first name"}
                        className={s.field}
                        {...register("firstName", {required: "This field is required"})}
                    />
                    <ErrorMessage errors={errors} name="firstName" as="p" className={s.errorMsg}/>
                </div>
                <div className={s.fieldBlock}>
                    <label>Last name</label>
                    <input
                        type="text"
                        placeholder={"Enter your last name"}
                        className={s.field}
                        {...register("lastName", {required: "This field is required"})}
                    />
                    <ErrorMessage errors={errors} name="lastName" as="p" className={s.errorMsg}/>
                </div>

                <div className={s.fieldBlock}>
                    <label>Email</label>
                    <input type="text" placeholder={"Enter your email"} className={s.field}
                           maxLength={14}
                           {...register("email", {
                               required: "This field is required", pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: "Invalid email address"
                               }
                           })}

                    />
                    <ErrorMessage errors={errors} name="email" as="p" className={s.errorMsg}/>
                </div>

                <div className={s.fieldBlock}>
                    <label>Date of birth</label>
                    <div className={s.selects}>
                        <select {...register("month", {required: "This field is required"})}>
                            <option value="" disabled selected>MM</option>
                            {
                                range(1, 13).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                        <select {...register("day", {required: "This field is required"})}>
                            <option value="" disabled selected>DD</option>
                            {
                                range(1, 32).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                        <select {...register("year", {required: "This field is required"})}>
                            <option value="" disabled selected>YYYY</option>
                            {
                                range(1900, new Date().getFullYear() + 1).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                    </div>
                    {(errors.month || errors.day || errors.year) &&
                        <CustomErrorMessage msgContent={"These fields are required"}/>}

                </div>

                <div className={s.fieldBlock}>
                    <label>Password</label>
                    <input type="password"
                           className={s.field} {...register("password", {required: "This field is required"})}/>
                    <ErrorMessage errors={errors} name="password" as="p" className={s.errorMsg}/>
                </div>
                <div className={s.fieldBlock}>
                    <label>Repeat Password</label>
                    <input type="password" className={s.field} {...register("repeatPassword", {
                        required: "This field is required", validate: (val: string) => {
                            if (watch('password') != val) {
                                return "Your passwords do no match";
                            }
                        }
                    })}/>
                    <ErrorMessage errors={errors} name="repeatPassword" as="p" className={s.errorMsg}/>
                </div>
            </div>
            <div className={s.btnBlock}>

                {isResponseError && <CustomErrorMessage msgContent={responseErrorMsg?.username?.toString()}/>}
                {isResponseError && <CustomErrorMessage msgContent={responseErrorMsg?.email?.toString()}/>}
                {isResponseError && <CustomErrorMessage msgContent={responseErrorMsg?.custom}/>}
                <button type="submit">Sign Up</button>
                <p>Already have an account? <span onClick={onOpenSignIn}>Sign in!</span></p>
            </div>
        </form>
    );
};

export default SignUpForm;