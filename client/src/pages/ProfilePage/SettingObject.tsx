import React from 'react';
import s from './ProfilePage.module.scss'
import Button from "../../components/common/Buttons/Button";

interface ProfileProps {
    settingName: string
    settingContent: string
    setFormOpened?: () => void
    setSelectedSettingName?: () => void
}

const SettingObject: React.FC<ProfileProps> = (props) => {
    const onClickAction = () => {
        props.setFormOpened?.()
        props.setSelectedSettingName?.()
    }

    return (
        <div className={s.settingsBlock}>
            <div>
                <div className={s.settingName}>
                    {props.settingName}:
                </div>
                <div className={s.settingContent}>
                    {props.settingContent}
                </div>
            </div>
            <Button buttonContent='Edit' onClickAction={onClickAction}/>
        </div>
    )
};

export default SettingObject;