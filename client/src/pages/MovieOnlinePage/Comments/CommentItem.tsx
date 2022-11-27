import React from 'react';
import s from './Comments.module.scss'
import userLogo from '../../../assets/userLogo.svg'
import commentBtn from '../../../assets/commentBtn.svg'
import delBtn from '../../../assets/delBtn.svg'
import editBtn from '../../../assets/editBtn.svg'
import {useOutsideAlerter} from "../../../utils/hooks/useOutside";

interface CommentItemProps {

}


const CommentItem: React.FC<CommentItemProps> = () => {


    const {ref, isShow, setIsShow} = useOutsideAlerter(false);

    return (
        <div className={s.item}>
            <div className={s.right}>
                <img src={userLogo} alt="userLogo"  width={64}/>
                <div className={s.content}>
                    <div className={s.name}>StarKitten123</div>
                    <div className={s.text}>Good movie!</div>
                </div>
            </div>
            <div className={s.left} ref={ref}>
                <img src={commentBtn} alt="commentBtn" onClick={()=>setIsShow(!isShow)}/>
                {
                    isShow ? (<div className={s.popup} >
                        <button>
                            <img src={editBtn} alt=""/>
                            Edit
                        </button>
                        <button>
                            <img src={delBtn} alt=""/>
                            Delete
                        </button>
                    </div>) : ''
                }
            </div>
        </div>
    );
};

export default CommentItem;