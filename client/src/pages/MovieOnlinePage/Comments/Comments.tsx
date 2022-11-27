import React, {useState} from 'react';
import s from './Comments.module.scss'
import CommentItem from "./CommentItem";

interface CommentsProps {

}


const Comments: React.FC<CommentsProps> = () => {

    const [selectedBlock, setSelectedBlock] = useState<'comments' | 'reviews'>('comments')

    return (
        <div className={s.container}>
            <div className={s.top}>
                <p className={selectedBlock === 'comments' ? s.active : ''}
                   onClick={() => setSelectedBlock('comments')}>Comments</p>
                <p className={selectedBlock === 'reviews' ? s.active : ''}
                   onClick={() => setSelectedBlock('reviews')}>Reviews</p>
            </div>
            <div className={s.divider}></div>
            <div className={s.comments}>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
            </div>
        </div>
    );
};

export default Comments;