import {Slider} from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import s from './searchPack.module.css'



export const SearchTable = () => {

    return <div className={s.search_table}>
        <Slider className={s.slider} range={{draggableTrack: true}} defaultValue={[20, 50]}/>
    </div>
}

