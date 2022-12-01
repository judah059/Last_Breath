import React, {useState} from 'react';
import s from './Comments.module.scss'
import userLogo from '../../../assets/userLogo.svg'
import commentBtn from '../../../assets/commentBtn.svg'
import delBtn from '../../../assets/delBtn.svg'
import editBtn from '../../../assets/editBtn.svg'
import {useOutsideAlerter} from "../../../utils/hooks/useOutside";
import {API} from "../../../utils/api";
import {IComment, IReqComment} from "../../../utils/api/types";
import Button from "../../../components/common/Buttons/Button";

interface CommentItemProps {
    id: number
    comment: string
    username: string
    avatarUrl?: string
    comments?: IComment[]
    setComments?: (comments: IComment[]) => void
    reviews?: IComment[] | undefined
    setReviews?: (comments: IComment[]) => void
    type: string
    author?: string
    movieId?: number
    selectedBlock?: string
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
                                                     author,
                                                     movieId,
                                                     selectedBlock
                                                 }) => {


    const {ref, isShow, setIsShow} = useOutsideAlerter(false);
    const [changeCommentMode, setChangeCommentMode] = useState(false)
    const [changeCommentContent, setChangeCommentContent] = useState(comment)


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

    const onClickEditComment = () => {
        setIsShow(false)
        setChangeCommentMode(true)
    }

    const onChangeCommentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeCommentContent(e.target.value)
    }

    const onClickSaveChangedComment = async () => {
        try {
            let obj: IReqComment = {
                comment_type: `${selectedBlock}`,
                comment_text: changeCommentContent,
                film: +`${movieId}`,
            }

            setChangeCommentMode(false)

            if (type === 'C') {
                if (comments && setComments) {
                    setComments(comments?.map(c => {
                        if (c.id === id) {
                            return {...obj, id, author_name: username}
                        }
                        return c
                    }))
                }
            } else {
                if (reviews && setReviews) {
                    setReviews(reviews?.map(c => {
                        if (c.id === id) {
                            return {...obj, id, author_name: username}
                        }
                        return c
                    }))
                }
            }

            console.log(id)
            await API.updateComment(obj, `${id}`)


        } catch (e) {
            console.log(e)
        }

    }

    const onClickCancelChangeComment = () => {
        setChangeCommentMode(false)
        setChangeCommentContent(comment)
    }

    return (
        <div className={s.item}>
            <div className={s.right}>
                <img src={userLogo} alt="userLogo" width={64}/>
                <div className={s.content}>
                    <div className={s.name}>{author}</div>
                    <div className={s.text}>
                        {
                            changeCommentMode ? <div className={s.changeBlock}>
                                <input type="text" className={s.changeComment} value={changeCommentContent}
                                       onChange={onChangeCommentHandler}/>
                                <Button buttonContent='Save' onClickAction={onClickSaveChangedComment}/>
                                <Button buttonContent='Cancel' onClickAction={onClickCancelChangeComment}/>
                            </div> : <>{comment}</>
                        }

                    </div>
                </div>
            </div>
            {
                author === username ? <div className={s.left} ref={ref}>
                    <img src={commentBtn} alt="commentBtn" onClick={() => setIsShow(!isShow)} className={s.dotsBtn}/>
                    {
                        isShow ? (<div className={s.popup}>
                            <button onClick={onClickEditComment}>
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