import {Slider} from "antd";
import React, {ChangeEvent, useState} from "react";
import {Button} from "../../common/Button/Button";
import s from './searchPack.module.css';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {getPacksSearchNameTC, setPacksError} from "../../../m2-bll/packReducer";
import {AppRootStateType} from "../../../m2-bll/store";


export let SearchPack = React.memo(() => {

        const dispatch = useDispatch();
        const cardPacks = useSelector((state: AppRootStateType) => state.packs.cardPacks);
        const error = useSelector((state: AppRootStateType) => state.packs.error);

        const [packName, setPackName] = useState<string>("");
        const [min, setMin] = useState<number>(0);
        const [max, setMax] = useState<number>(10);

        const setPackNameSearch = (e: ChangeEvent<HTMLInputElement>) => {
            setPackName(e.currentTarget.value)
        }

        const setMinMaxValue = (arr: number[]) => {
            let min = arr[0]
            let max = arr[1]
            if (min > 0) {
                setMin(min)
            }
            if (max < 100) {
                setMax(max)
            }
        }

        //отправка запросов и поиск по первым буквам до нажатия кнопки поиска
        // useEffect(() => {
        //     setTimeout(() => {
        //         dispatch(getPacksSearchNameTC(packName, min, max))
        //     }, 2000)
        // }, [packName, min, max])

        const getPacksCallback = () => {
            if (!!cardPacks.length) {
                dispatch(getPacksSearchNameTC(packName, min, max))
            } else {
                dispatch(setPacksError(error))
            }
        }


        return (
            <div className={s.searchPack}>
                <div>
                    <input
                        type="text"
                        name={"search"}
                        onChange={setPackNameSearch}
                    />
                </div>
                <Button
                    primary={true}
                    onClick={getPacksCallback}
                    label={'Search'}
                    backgroundColor={'blue'}
                />
                <div className={s.search_table}>
                    <Slider
                        onChange={setMinMaxValue}
                        className={s.slider}
                        range={{draggableTrack: true}}
                        defaultValue={[0, 10]}/>
                </div>
                <div style={{fontSize: "50px", color: "red"}}>{cardPacks.length === 0 && error}</div>
            </div>
        )
    }
)
