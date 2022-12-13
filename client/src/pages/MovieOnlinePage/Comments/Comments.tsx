import React, {useState} from 'react';
import s from './Comments.module.scss'
import CommentItem from "./CommentItem";
import Button from "../../../components/common/Buttons/Button";
import {API} from "../../../utils/api";
import {IComment, IReqComment} from "../../../utils/api/types";
import {useAppSelector} from "../../../utils/hooks/redux";
import {RootState} from "../../../store";

interface CommentsProps {
    movieId?: number
    comments: IComment[] | undefined
    setComments: (comments: IComment[]) => void
    reviews: IComment[] | undefined
    setReviews: (comments: IComment[]) => void
    lastCommentId?: number
    setLastCommentId?: (id: number) => void
    itemType: string
}


const Comments: React.FC<CommentsProps> = ({
                                               movieId,
                                               comments,
                                               setComments,
                                               reviews,
                                               setReviews,
                                               lastCommentId,
                                               setLastCommentId,
                                               itemType
                                           }) => {
    const {role, username} = useAppSelector((state: RootState) => state.user);

    const [commentContent, setCommentContent] = useState(' ')
    const [selectedBlock, setSelectedBlock] = useState<'C' | 'R'>('C')


    const onClickSendComment = async () => {
        console.log(lastCommentId)
        try {

            if (commentContent === ' ')
                return

            let obj: IReqComment = {
                comment_type: selectedBlock,
                comment_text: commentContent,
                film: +`${movieId}`,
            }
            if (selectedBlock === 'C') {
                if (comments !== undefined && lastCommentId !== undefined) {
                    console.log([...comments, {
                        ...obj,
                        id: +`${lastCommentId + 1}`,
                        author_name: username
                    }])

                    setComments([...comments, {
                        ...obj,
                        id: +`${lastCommentId + 1}`,
                        author_name: username
                    }])
                }
            } else {
                if (reviews !== undefined && lastCommentId !== undefined) {
                    setReviews([...reviews,
                        {
                            ...obj,
                            id: +`${lastCommentId + 1}`,
                            author_name: username
                        }])
                }
            }

            setCommentContent(' ')

            let res: IComment;
            if (itemType === 'film') {
                res = await API.postFilmComment(obj)
            } else {

                const {film, ...serialObj} = obj
                res = await API.postSerialComment({...serialObj, serial: +`${movieId}`})
            }


            if (setLastCommentId) {
                setLastCommentId(res.id)
            }

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
                                                                             movieId={movieId}
                                                                             selectedBlock={selectedBlock}
                                                                             setLastCommentId={setLastCommentId}
                                                                             lastCommentId={lastCommentId}

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
                                                                            setComments={setReviews}
                                                                            movieId={movieId}
                                                                            selectedBlock={selectedBlock}
                    />)
                }

                {role === 'RG' && selectedBlock === 'C' &&
                    <input type="text" onChange={onChangeCommentHandler} value={commentContent}/>}
                {role === 'RC' && selectedBlock === 'C' &&
                    <input type="text" onChange={onChangeCommentHandler} value={commentContent}/>}
                {role === 'RC' && selectedBlock === 'R' &&
                    <input type="text" onChange={onChangeCommentHandler} value={commentContent}/>}


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