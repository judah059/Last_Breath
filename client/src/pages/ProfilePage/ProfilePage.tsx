import React, {useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './ProfilePage.module.scss'
import avatar from '../../assets/userAvatar.svg'
import SettingObject from "./SettingObject";
import DeleteForm from "../../components/Forms/EditingProfile/DeleteForm";
import BaseEditForm from "../../components/Forms/EditingProfile/BaseEditForm";
import DateOfBirthEditForm from "../../components/Forms/EditingProfile/DateOfBirthEditForm";

const ProfilePage: React.FC = (props) => {
    const [isBaseEditFormOpened, setBaseEditFormOpened] = useState(false)
    const [isDateOfBirthEditOpened, setDateOfBirthEditOpened] = useState(false)
    const [isDeleteFormOpened, setDeleteFormOpened] = useState(false)
    const [selectedSettingName, setSelectedSettingName] = useState('')

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
                        <SettingObject settingName='Full name' settingContent='User'
                                       setFormOpened={() => setBaseEditFormOpened(true)}
                                       setSelectedSettingName={() => setSelectedSettingName('Full name')}/>
                        <SettingObject settingName={'Email'} settingContent='a@gmail.com'
                                       setFormOpened={() => setBaseEditFormOpened(true)}
                                       setSelectedSettingName={() => setSelectedSettingName('Email')}/>
                        <SettingObject settingName='Date of birth' settingContent='01/01/1900'
                                       setFormOpened={() => setDateOfBirthEditOpened(true)}/>
                        <SettingObject settingName='Phone' settingContent='080050505'
                                       setFormOpened={() => setBaseEditFormOpened(true)}
                                       setSelectedSettingName={() => setSelectedSettingName('Phone')}/>
                    </div>
                    <div>
                        <SettingObject settingName='Payment method' settingContent='**** 4444'/>
                        <SettingObject settingName='Subscription' settingContent='Premium'/>
                    </div>
                </div>
                <div className={s.deleteText} onClick={() => setDeleteFormOpened(true)}>
                    Do you want to delete your account?
                    {<DeleteForm isDeleteFormOpened={isDeleteFormOpened}
                                 onClickDeleteFormClose={() => setDeleteFormOpened(false)}/>}
                </div>
            </div>
            <BaseEditForm isBaseEditOpened={isBaseEditFormOpened}
                          onClickBaseEditClose={() => setBaseEditFormOpened(false)} settingName={selectedSettingName}/>
            <DateOfBirthEditForm isDateOfBirthEditOpened={isDateOfBirthEditOpened}
                                 onClickDateOfBirthClose={() => setDateOfBirthEditOpened(false)}/>
        </div>
    )
};

export default ProfilePage;