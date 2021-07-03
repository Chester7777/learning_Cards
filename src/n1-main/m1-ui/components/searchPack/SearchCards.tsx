import {Slider} from "antd";
import React, {ChangeEvent, useState} from "react";
import {Button} from "../../common/Button/Button";
import s from './searchPack.module.css';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {getPacksSearchNameTC, setPacksError} from "../../../m2-bll/packReducer";
import {AppRootStateType} from "../../../m2-bll/store";
import {getCardsSearch} from "../../../m2-bll/cardsReducer";


export let SearchCards = React.memo(() => {

        const dispatch = useDispatch();
        const cards = useSelector((state: AppRootStateType) => state.cards.cards);
        const error = useSelector((state: AppRootStateType) => state.packs.error);

        const [cardAnswer, setCardAnswer] = useState<string>("");
        const [cardQuestion, setCardQuestion] = useState<string>("");
        const [min, setMin] = useState<number>(0);
        const [max, setMax] = useState<number>(10);

        const setCardAnswerSearch = (e: ChangeEvent<HTMLInputElement>) => {
            setCardAnswer(e.currentTarget.value)
        }
        const setCardQuestionSearch = (e: ChangeEvent<HTMLInputElement>) => {
            setCardQuestion(e.currentTarget.value)
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

        const getPacksCallback = () => {
            if (!!cards.length) {
                dispatch(getCardsSearch(cardAnswer, cardQuestion, min, max))
            } else {
                dispatch(setPacksError(error))
            }
        }


        return (
            <div className={s.searchPack}>
                <div>
                    <input
                        placeholder={"Question"}
                        type="text"
                        name={"search"}
                        onChange={setCardQuestionSearch}
                    />
                </div>
                <div>
                    <input
                        placeholder={"Answer"}
                        type="text"
                        name={"search"}
                        onChange={setCardAnswerSearch}
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
                <div style={{fontSize: "50px", color: "red"}}>{cards.length === 0 && error}</div>
            </div>
        )
    }
)
