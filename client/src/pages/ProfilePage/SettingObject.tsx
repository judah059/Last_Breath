import React from 'react';
import s from './ProfilePage.module.scss'
import Button from "../../components/common/Buttons/Button";

interface ProfileProps {
    settingName: string
    settingContent?: string
    setFormOpened?: () => void
    setSelectedSettingName?: () => void
    isSub?: boolean
}

const SettingObject: React.FC<ProfileProps> = (props) => {
    const onClickAction = () => {
        props.setFormOpened?.()
        props.setSelectedSettingName?.()
    }
    const onClickAction1 = () => {
        window.confirm('Are you sure you want to cancel subscription?')
    }

    return (
        <div className={s.settingsBlock}>
            <div>
                <div className={s.settingName}>
                    {props.settingName}:
                </div>
                <div className={s.settingContent}>
                    {
                        !props.settingContent ? 'Empty' : props.settingContent
                    }
                </div>
            </div>
            <Button buttonContent='Edit' onClickAction={onClickAction}/>
            {props.isSub && props.settingContent && <Button buttonContent='Delete' onClickAction={onClickAction1}/>}
        </div>
    )
};

export default SettingObject;