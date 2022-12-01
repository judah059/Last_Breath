import React, {useState} from 'react';
import s from './Comments.module.scss'
import CommentItem from "./CommentItem";
import Button from "../../../components/common/Buttons/Button";
import {API} from "../../../utils/api";
import {IComment} from "../../../utils/api/types";
import {useAppSelector} from "../../../utils/hooks/redux";
import {RootState} from "../../../store";

interface CommentsProps {
    movieId?: number
    comments: IComment[] | undefined
    setComments: (comments: IComment[]) => void
    reviews: IComment[] | undefined
    setReviews: (comments: IComment[]) => void
}


const Comments: React.FC<CommentsProps> = ({
                                               movieId,
                                               comments,
                                               setComments,
                                               reviews,
                                               setReviews
                                           }) => {
    const {role, username} = useAppSelector((state: RootState) => state.user);

    const [commentContent, setCommentContent] = useState('')
    const [selectedBlock, setSelectedBlock] = useState<'C' | 'R'>('C')

    const onClickSendComment = async () => {
        try {

            let obj: IComment = {
                comment_type: selectedBlock,
                comment_text: commentContent,
                film: +`${movieId}`,
                author_name: username,
            }
            if (selectedBlock === 'C') {
                if (comments) {
                    setComments([...comments, obj])
                }
            } else {
                if (reviews) {
                    setReviews([...reviews, obj])
                }
            }

            await API.postFilmComment(obj)

        } catch (e) {
            console.log(e)
        }
    }

    const onChangeCommentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentContent(e.target.value)
    }


    return (
        <div className={s.container}>
            <div className={s.top}>
                <p className={selectedBlock === 'C' ? s.active : ''}
                   onClick={() => setSelectedBlock('C')}>Comments</p>
                <p className={selectedBlock === 'R' ? s.active : ''}
                   onClick={() => setSelectedBlock('R')}>Reviews</p>
            </div>
            <div className={s.divider}></div>
            <div className={s.comments}>
                {
                    selectedBlock === 'C' && comments?.map(c => <CommentItem key={c.id}
                                                                             author={c.author_name}
                                                                             id={c.id}
                                                                             type={c.comment_type}
                                                                             comment={c.comment_text}
                                                                             username={username}
                                                                             avatarUrl={c.author_picture}
                                                                             comments={comments}
                                                                             setComments={setComments}

                    />)
                }
                {
                    selectedBlock === 'R' && reviews?.map(c => <CommentItem key={c.id}
                                                                            author={c.author_name}
                                                                            type={c.comment_type}
                                                                            id={c.id}
                                                                            comment={c.comment_text}
                                                                            username={username}
                                                                            avatarUrl={c.author_picture}
                                                                            setReviews={setReviews}
                                                                            reviews={reviews}
                    />)
                }

                {role === 'RG' && selectedBlock === 'C' && <input type="text" onChange={onChangeCommentHandler}/>}
                {role === 'RC' && selectedBlock === 'C' && <input type="text" onChange={onChangeCommentHandler}/>}
                {role === 'RC' && selectedBlock === 'R' && <input type="text" onChange={onChangeCommentHandler}/>}


            </div>
            {<div className={s.blockBtn}>
                {role === 'RG' && selectedBlock === 'C' &&
                    <Button buttonContent='Send' onClickAction={onClickSendComment}/>}
                {role === 'RC' && selectedBlock === 'C' &&
                    <Button buttonContent='Send' onClickAction={onClickSendComment}/>}
                {role === 'RC' && selectedBlock === 'R' &&
                    <Button buttonContent='Send' onClickAction={onClickSendComment}/>}

            </div>}
        </div>
    );
};

export default Comments;