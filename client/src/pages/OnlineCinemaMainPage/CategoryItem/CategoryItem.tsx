import React from 'react';
import s from './CategoryItem.module.scss'
import SerialItem from "./SerialItem/SerialItem";

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
            <SerialItem poster={'https://thumbs.dfs.ivi.ru/storage32/contents/7/8/f59c54b1e43edd7fa8bdc94df8bff6.jpg/858x483/?q=60'} name={'Object name'}/>
            <SerialItem poster={'https://thumbs.dfs.ivi.ru/storage32/contents/7/8/f59c54b1e43edd7fa8bdc94df8bff6.jpg/858x483/?q=60'} name={'Object name'}/>
            <SerialItem poster={'https://thumbs.dfs.ivi.ru/storage32/contents/7/8/f59c54b1e43edd7fa8bdc94df8bff6.jpg/858x483/?q=60'} name={'Object name'}/>
        </div>
    </div>
);

export default CategoryItem;