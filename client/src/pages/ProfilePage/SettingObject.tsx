import React from 'react';
import s from './ProfilePage.module.scss'
import Button from "../../components/common/Buttons/Button";
import {API} from "../../utils/api";
import {IUserSub} from "../../utils/api/types";

interface ProfileProps {
    settingName: string
    settingContent?: string
    setFormOpened?: () => void
    setSelectedSettingName?: () => void
    isSub?: boolean
    userSubs?: IUserSub[]
    setUserSubs?: (subs: IUserSub[]) => void
}

const SettingObject: React.FC<ProfileProps> = (props) => {
    const onClickAction = () => {
        props.setFormOpened?.()
        props.setSelectedSettingName?.()
    }
    const onClickDeleteSub = async () => {
        const userAnswer = window.confirm('Are you sure you want to cancel subscription?')

        if (userAnswer && props.userSubs) {
            if (props.setUserSubs) {
                props.setUserSubs([])
            }

            for (let i = 0; i < props.userSubs.length; i++) {
                const item = props.userSubs[i];
                await API.deleteUserSub(item.id)

            }
        }


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
            {props.isSub && props.userSubs?.length !== 0 &&
                <Button buttonContent='Delete' onClickAction={onClickDeleteSub}/>}
        </div>
    )
};

export default SettingObject;