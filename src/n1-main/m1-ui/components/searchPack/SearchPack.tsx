import {Slider} from "antd";
import React from "react";
import {Button} from "../../common/Button/Button";
import s from './searchPack.module.css';
import 'antd/dist/antd.css';


export let SearchPack = () => {



    return (
        <div className={s.searchPack}>
            <div>
                <input
                    type="text"
                    name={"search"}
                />
            </div>
            <Button
                label={'Search'}
                backgroundColor={'blue'}
            />
            <div className={s.search_table}>
                <Slider className={s.slider} range={{draggableTrack: true}}
                        defaultValue={[0, 10]}/>
            </div>
        </div>
    )
}

