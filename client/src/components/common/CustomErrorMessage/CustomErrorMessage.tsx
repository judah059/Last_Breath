import React from 'react';
import s from './CustomErrorMessage.module.scss'

interface CustomErrorMessageProps {
    msgContent?: string
}


const CustomErrorMessage: React.FC<CustomErrorMessageProps> = ({msgContent}) => {
    return (
        <p className={msgContent && s.error}>
            {msgContent}
        </p>
    );
};

export default CustomErrorMessage;


