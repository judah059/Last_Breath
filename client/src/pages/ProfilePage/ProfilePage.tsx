import React, {useEffect, useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './ProfilePage.module.scss'
import avatar from '../../assets/userAvatar.svg'
import SettingObject from "./SettingObject";
import DeleteForm from "../../components/Forms/EditingProfile/DeleteForm";
import DateOfBirthEditForm from "../../components/Forms/EditingProfile/DateOfBirthEditForm";
import {useAuth} from "../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../utils/hooks/redux";
import {RootState} from "../../store";
import EmailEdit from "../../components/Forms/EditingProfile/EmailEditForm";
import UsernameEdit from "../../components/Forms/EditingProfile/UsernameEditForm";
import PasswordEditForm from "../../components/Forms/EditingProfile/PasswordEditForm";
import PaymentChangeForm from "../../components/Forms/EditingProfile/PaymentChangeForm/PaymentChangeForm";
import PaymentForm from "../../components/Forms/EditingProfile/PaymentForm/PaymentForm";

const ProfilePage: React.FC = (props) => {
    const [isUsernameEditFormOpened, setUsernameEditFormOpened] = useState(false)
    const [isEmailEditFormOpened, setEmailEditFormOpened] = useState(false)
    const [isDateOfBirthEditOpened, setDateOfBirthEditOpened] = useState(false)
    const [isPasswordEditFormOpened, setPasswordEditFormOpened] = useState(false)
    const [isPaymentEditFormOpened, setPaymentEditFormOpened] = useState(false)
    const [isDeleteFormOpened, setDeleteFormOpened] = useState(false)

    const [selectedSettingName, setSelectedSettingName] = useState('')

    const {email, username, birth_date} = useAppSelector((state: RootState) => state.user);

    const isAuth = useAuth()

    let navigate = useNavigate();

    const onClickToSub = () => {
        navigate('../subscription')
    }

    useEffect(() => {
        if (!isAuth) {
            return navigate("/main");
        }
    }, [!isAuth]);

    return (
        <div>
            <div>
                <HeaderDrawer toLinkText='Account'/>
            </div>
            <div className={s.container}>
                <div className={s.avatarBlock}>
                    <img src={avatar} className={s.avatar} alt={'avatar'}/>
                    <div>Hi, {username}!</div>
                </div>
                <div className={s.settings}>
                    <div>
                        <SettingObject settingName='User name' settingContent={username}
                                       setFormOpened={() => setUsernameEditFormOpened(true)}
                                       setSelectedSettingName={() => setSelectedSettingName('Username')}/>
                        <SettingObject settingName={'Email'} settingContent={email}
                                       setFormOpened={() => setEmailEditFormOpened(true)}
                                       setSelectedSettingName={() => setSelectedSettingName('Email')}/>
                        <SettingObject settingName='Date of birth' settingContent={birth_date}
                                       setFormOpened={() => setDateOfBirthEditOpened(true)}/>
                    </div>
                    <div>
                        <SettingObject settingName='Payment method' settingContent='**** 4444'
                                       setFormOpened={() => setPaymentEditFormOpened(true)}
                        />
                        <SettingObject settingName='Subscription' settingContent='Premium'
                                        setFormOpened={onClickToSub}
                        />
                        <SettingObject settingName='Password' settingContent='*********'
                                       setFormOpened={() => setPasswordEditFormOpened(true)}
                        />
                    </div>
                </div>
                <span className={s.deleteText} onClick={() => setDeleteFormOpened(true)}>
                    Do you want to delete your account?
                    {<DeleteForm isDeleteFormOpened={isDeleteFormOpened}
                                 onClickDeleteFormClose={() => setDeleteFormOpened(false)}/>}
                </span>
            </div>
            <UsernameEdit
                settingName={selectedSettingName} isUsernameEditOpened={isUsernameEditFormOpened}
                onClickUsernameEditClose={() => setUsernameEditFormOpened(false)}/>
            <EmailEdit isEmailEditOpened={isEmailEditFormOpened}
                       onClickEmailEditClose={() => setEmailEditFormOpened(false)} settingName={selectedSettingName}/>
            <DateOfBirthEditForm isDateOfBirthEditOpened={isDateOfBirthEditOpened}
                                 onClickDateOfBirthClose={() => setDateOfBirthEditOpened(false)}/>
            <PasswordEditForm isPasswordEditFormOpened={isPasswordEditFormOpened} onClickUsernameEditClose={
                () => setPasswordEditFormOpened(false)}/>
            <PaymentForm isPaymentChangeFormOpened={isPaymentEditFormOpened}
                         onClickPaymentChangeFormClose={() => setPaymentEditFormOpened(false)}
                         isProfilePage
                         />
        </div>
    )
};

export default ProfilePage;