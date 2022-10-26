import React from 'react';
import s from './ChooseCinemaDrawer.module.scss'


interface ChooseCinemaDrawerProps {
    refOne: React.Ref<HTMLDivElement>;
    isShow: boolean
}


const ChooseCinemaDrawer: React.FC<ChooseCinemaDrawerProps> = ({isShow, refOne}) => {




    return (
        <div className={`${s.overlay} ${isShow ? s.overlayOut : ""}`}  >
            <div className={s.drawer} ref={refOne}>
                <div className={s.city}>
                    <h2>City:</h2>
                    <ul>
                        <li className={s.active}>Kharkiv</li>
                        <li>Kyiv</li>
                        <li>Dnipro</li>
                    </ul>
                </div>
                <div className={s.cinema}>
                    <h2>Cinema:</h2>
                    <ul>
                        <li>
                            <p className={s.name}>KinoLand</p>
                            <p className={s.street}>Yuvileyny avenue</p>
                        </li>
                        <li>
                            <p className={s.name}>Planet Cinema</p>
                            <p className={s.street}>"French Boulevard" Shopping Center, 44 B., Akademika Pavlova St</p>
                        </li>
                        <li>
                            <p className={s.name}>Dafa Multiplex</p>
                            <p className={s.street}>Heroiv Pratsi street, 9</p>
                        </li>
                        <li>
                            <p className={s.name}>Cinema Kyiv</p>
                            <p className={s.street}>Yuryeva Boulevard, 1</p>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChooseCinemaDrawer;