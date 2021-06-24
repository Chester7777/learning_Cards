import {Slider} from "antd";
import React, {ChangeEvent, useState} from "react";
import {Button} from "../../common/Button/Button";
import s from './searchPack.module.css';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {getPacksNameSeurchTC, setPacksError} from "../../../m2-bll/packReducer";
import {AppRootStateType} from "../../../m2-bll/store";


export let SearchPack = () => {
    const dispatch = useDispatch();
    // const cardPacks = useSelector((state: AppRootStateType) => state.packs.cardPacks);
    // const packName = useSelector((state: AppRootStateType) => state.packs.name);
    // const userId = useSelector((state: AppRootStateType) => state.packs.id);
    // const pageN = useSelector((state: AppRootStateType) => state.packs.page);
    const error = useSelector((state: AppRootStateType) => state.packs.error);

    const [packName, setPackName] = useState<string>("");

    const setPackNameSeurch = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        setPackName(e.currentTarget.value)
    }

    const getPacksCallback = () => {
        if (packName) {
            debugger
            dispatch(getPacksNameSeurchTC( packName))
        } else {
            debugger
            dispatch(setPacksError(error))
        }
    }


    return (
        <div className={s.searchPack}>
            <div>
                <input
                    type="text"
                    name={"search"}
                    onChange={setPackNameSeurch}
                />
            </div>
            <Button
                primary={true}

                onClick={getPacksCallback}
                label={'Search'}
                backgroundColor={'blue'}
            />
            <div className={s.search_table}>
                <Slider className={s.slider} range={{draggableTrack: true}}
                        defaultValue={[0, 10]}/>
            </div>
            <div>{error}</div>
        </div>
    )
}

