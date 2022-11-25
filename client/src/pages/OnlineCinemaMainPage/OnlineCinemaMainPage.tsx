import React, {useState} from 'react';
import OnlineCHeaderCommon from "../../components/OnlineHeaderCommon/OnlineHeaderCommon";
import CategoryItem from "./CategoryItem/CategoryItem";

const OnlineCinemaMainPage: React.FC = (props) => {
    return (
        <>
            <OnlineCHeaderCommon toLinkText={'Online'}/>
            <CategoryItem categoryName={'POPULAR SERIES'}/>
        </>
    )
};

export default OnlineCinemaMainPage;