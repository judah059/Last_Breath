import React from 'react';
import s from './ProfilePage.module.scss'

interface ProfileProps {
    settingName: string
}

const SettingObject: React.FC<ProfileProps> = (props) => {
    return(
        <>
            <div className={s.settingsBlock}>
                <div>
                    <div className={s.settingName}>
                        {props.settingName}
                    </div>
                    <div className={s.settingContent}>
                        User
                    </div>
                </div>
                <button className={s.editButton}>Edit</button>
            </div>
        </>
    )
};

export default SettingObject;