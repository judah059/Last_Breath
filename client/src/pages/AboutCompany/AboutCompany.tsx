import React from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './AboutCompany.module.scss'

const AboutCompany: React.FC = (props) => {
    return (
        <div>
            <HeaderDrawer toLinkText='About company'/>
            <div className={s.wrapper}>
                <div className={s.header_text}>About Company</div>
                <div className={s.lower_text}>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit per morbi, egestas eros gravida molestie
                        risus auctor mattis ligula, fames vel quis ullamcorper volutpat lacinia est suspendisse. Duis
                        habitant dignissim habitasse ante sollicitudin torquent risus, erat himenaeos montes odio natoque
                        ipsum suspendisse, class id tempor inceptos blandit potenti. Lobortis rhoncus hendrerit orci
                        imperdiet faucibus mollis nullam venenatis, feugiat cras potenti dignissim nascetur nec.
                    </div>
                    <div>
                        ⠀
                    </div>
                    <div>
                        Gravida est eleifend erat viverra tortor lorem in conubia, lacus maecenas pellentesque amet augue
                        aliquam ultrices, ligula arcu ut pharetra hac sapien nibh. Nullam suscipit quisque quam venenatis
                        eros ex ultrices potenti, maximus urna praesent tincidunt parturient morbi egestas dignissim
                        vulputate, iaculis etiam tristique cursus aenean ornare mi. Vehicula tellus et dictum nisl efficitur
                        amet bibendum, porta ut leo augue sagittis. Hendrerit inceptos massa molestie porta lectus orci
                        velit quisque sodales et, morbi fusce amet mauris rhoncus euismod eros tincidunt sociosqu, hac
                        bibendum laoreet per class justo suscipit eget arcu. Sodales cras feugiat urna molestie himenaeos
                        posuere cubilia laoreet maximus, ultricies nibh rutrum tortor eleifend ridiculus sociosqu enim,
                        varius adipiscing ac facilisis vel pretium lacus ornare.
                    </div>
                    <div>
                        ⠀
                    </div>
                    <div>
                        Suspendisse pellentesque faucibus lobortis ante lectus efficitur arcu aliquet suscipit, leo laoreet
                        vel gravida facilisis sapien sagittis porttitor convallis, malesuada auctor primis urna nostra
                        parturient feugiat vestibulum. Congue egestas nunc vitae cras porttitor auctor pretium eget integer,
                        molestie nisl risus ornare fringilla semper dolor tempus. Cursus senectus integer commodo malesuada
                        nostra adipiscing risus, molestie vel vivamus in mi neque, natoque euismod dapibus egestas proin
                        hendrerit. At inceptos viverra natoque nibh nec augue justo primis, nunc etiam erat fusce tempus
                        penatibus leo congue, eros mus metus sollicitudin dapibus blandit dui. Neque tellus magna vivamus
                        potenti ex sociosqu orci, nostra habitant efficitur blandit cursus suspendisse phasellus class, eget
                        pellentesque ullamcorper interdum sodales morbi. Porttitor id vivamus placerat convallis mi
                        pellentesque ullamcorper ad amet cursus, platea nulla erat tempor viverra montes sem molestie.
                        Malesuada placerat rutrum montes lobortis blandit ligula urna phasellus, imperdiet convallis posuere
                        integer semper elementum viverra nunc, arcu ante maecenas neque quisque himenaeos velit.
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AboutCompany;