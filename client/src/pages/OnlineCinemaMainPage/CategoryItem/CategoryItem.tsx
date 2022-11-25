import React from 'react';
import s from './CategoryItem.module.scss'

interface CategoryItemPros {
    categoryName: string
    // poster: string
    // name: string
}

const CategoryItem: React.FC<CategoryItemPros> = (props) => (
    <div className={s.content}>
        <div className={s.categoryName}>
            {props.categoryName}
        </div>
        <div className={s.serial}>
            <div className={s.seriesBlock}>
                <div>
                    <img src={'https://thumbs.dfs.ivi.ru/storage32/contents/7/8/f59c54b1e43edd7fa8bdc94df8bff6.jpg/858x483/?q=60'} alt={'poster'}/>
                </div>
                <div className={s.name}>
                    Object name
                </div>
            </div>
            <div className={s.seriesBlock}>
                <div>
                    <img src={'https://thumbs.dfs.ivi.ru/storage32/contents/7/8/f59c54b1e43edd7fa8bdc94df8bff6.jpg/858x483/?q=60'} alt={'poster'}/>
                </div>
                <div className={s.name}>
                    Object name
                </div>
            </div>
            <div className={s.seriesBlock}>
                <div>
                    <img src={'https://thumbs.dfs.ivi.ru/storage32/contents/7/8/f59c54b1e43edd7fa8bdc94df8bff6.jpg/858x483/?q=60'} alt={'poster'}/>
                </div>
                <div className={s.name}>
                    Object name
                </div>
            </div>
        </div>
    </div>
);

export default CategoryItem;