import React from 'react';
import s from './Comments.module.scss'
import userLogo from '../../../assets/userLogo.svg'
import commentBtn from '../../../assets/commentBtn.svg'
import delBtn from '../../../assets/delBtn.svg'
import editBtn from '../../../assets/editBtn.svg'
import {useOutsideAlerter} from "../../../utils/hooks/useOutside";
import {API} from "../../../utils/api";
import {IComment} from "../../../utils/api/types";

interface CommentItemProps {
    id?: number
    comment: string
    username: string
    avatarUrl?: string
    comments?: IComment[]
    setComments?: (comments: IComment[]) => void
    reviews?: IComment[] | undefined
    setReviews?: (comments: IComment[]) => void
    type: string
    author: string
}


const CommentItem: React.FC<CommentItemProps> = ({
                                                     comment,
                                                     username,
                                                     avatarUrl,
                                                     id,
                                                     comments,
                                                     setComments,
                                                     reviews,
                                                     setReviews,
                                                     type,
                                                     author
                                                 }) => {


    const {ref, isShow, setIsShow} = useOutsideAlerter(false);

    const onClickDeleteComment = async () => {
        try {
            console.log(type)
            if (type === 'C') {
                if (comments && setComments) {
                    setComments(comments?.filter(c => c.id !== id))
                }
            } else {
                if (reviews && setReviews) {
                    setReviews(reviews?.filter(c => c.id !== id))
                }
            }
            await API.deleteComment(`${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    console.log(author, username)
    return (
        <div className={s.item}>
            <div className={s.right}>
                <img src={userLogo} alt="userLogo" width={64}/>
                <div className={s.content}>
                    <div className={s.name}>{author}</div>
                    <div className={s.text}>{comment}</div>
                </div>
            </div>
            {
                author === username ? <div className={s.left} ref={ref}>
                    <img src={commentBtn} alt="commentBtn" onClick={() => setIsShow(!isShow)}/>
                    {
                        isShow ? (<div className={s.popup}>
                            <button>
                                <img src={editBtn} alt=""/>
                                Edit
                            </button>
                            <button onClick={onClickDeleteComment}>
                                <img src={delBtn} alt=""/>
                                Delete
                            </button>
                        </div>) : ''
                    }
                </div> : <></>
            }
        </div>
    );
};

export default CommentItem;