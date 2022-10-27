import React from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './ProfilePage.module.scss'
import avatar from '../../assets/userAvatar.svg'
import SettingObject from "./SettingObject";

const ProfilePage: React.FC = (props) => {
    return (
        <div>
            <div>
                <HeaderDrawer toLinkText='Account'/>
            </div>
            <div className={s.container}>
                <div className={s.avatarBlock}>
                    <img src={avatar} className={s.avatar} alt={'avatar'}/>
                    <div>Hi, user!</div>
                </div>
                <div className={s.settings}>
                    <div>
                        <SettingObject settingName='Full_name:'/>
                        <SettingObject settingName='Email:'/>
                        <SettingObject settingName='Date_of_birth:'/>
                        <SettingObject settingName='Phone:'/>
                    </div>
                    <div>
                        <SettingObject settingName='Payment_method:'/>
                        <SettingObject settingName='Subscription:'/>
                    </div>
                </div>
            </div>
            <div className={s.delete}>
            </div>
        </div>
    )
};

export default ProfilePage;