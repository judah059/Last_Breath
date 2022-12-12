import React from 'react';
import s from './CategoryItem.module.scss'
import SerialItem from "./SerialItem/SerialItem";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import {IOnlineCinemaItem} from "../../../utils/api/types";
import {useNavigate} from "react-router-dom";
import {setItemId, setItemType} from "../../../store/onlineItem/onlineItem.slice";
import {useAppDispatch} from "../../../utils/hooks/redux";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './forSwiper.css'


interface CategoryItemPros {
    categoryName: string
    films: IOnlineCinemaItem[]
    serials: IOnlineCinemaItem[]
}

const CategoryItem: React.FC<CategoryItemPros> = (props) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onClickAction = (id: number, itemType: string) => {
        dispatch(setItemId(id))
        dispatch(setItemType(itemType))
        navigate(`watch/${id}`)
    }

    return (
        <div className={s.content}>
            <div className={s.categoryName}>
                {props.categoryName}
            </div>
            <div className={s.serial}>
               {props.films.length < 4 ?
                   props.films.map((f, index) =><SerialItem key={index} poster={f.poster} name={f.name} onClickAction={onClickAction} id={f.id} type={'film'}/>)
                   :
                   <Swiper
                       spaceBetween={50}
                       slidesPerView={3}
                       // onSlideChange={() => console.log('slide change')}
                       // onSwiper={(swiper) => console.log(swiper)}
                       modules={[Navigation, Pagination, Scrollbar, A11y]}
                       navigation
                       pagination={{ clickable: true }}
                       scrollbar={{ draggable: true }}
                   >
                      {props.films.map(f =><SwiperSlide><SerialItem poster={f.poster} name={f.name} onClickAction={onClickAction} id={f.id} type={'film'}/></SwiperSlide>)}
                   </Swiper>
               }
               {props.serials.length < 4 ?
                   props.serials.map((f, index) =><SerialItem key={index} poster={f.poster} name={f.name} onClickAction={onClickAction} id={f.id} type={'serial'}/>)
                   :
                   <Swiper
                       spaceBetween={50}
                       slidesPerView={3}
                       // onSlideChange={() => console.log('slide change')}
                       // onSwiper={(swiper) => console.log(swiper)}
                       modules={[Navigation, Pagination, Scrollbar, A11y]}
                       navigation
                       pagination={{ clickable: true }}
                       scrollbar={{ draggable: true }}
                   >
                      {props.serials.map(f =><SwiperSlide><SerialItem poster={f.poster} name={f.name} onClickAction={onClickAction} id={f.id} type={'serial'}/></SwiperSlide>)}

                   </Swiper>
               }
            </div>
        </div>
    )
};

export default CategoryItem;