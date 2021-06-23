import React, {useEffect, useState} from "react";
import s from "../login/Login.module.css";
import {Button} from "../../common/Button/Button";
import {loginTC} from "../../../m2-bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {LoginParamsType} from "../../../m3-dal/auth-api";
import {AppRootStateType} from "../../../m2-bll/store";
import {Redirect, useHistory, useParams} from "react-router-dom";
import Profile from "../profile/Profile";
import {Simulate} from "react-dom/test-utils";
import {minMaxLength, validEmail} from "../../common/validators.ts";
import {resetPasswordInfo, setForgotPasswordError} from "../../../m2-bll/forgotReducer";
import {findCardToLearn, setGradeTC} from "../../../m2-bll/cardsReducer";
import {CardType, putGradeType} from "../../../m3-dal/cards-api";
import Loading from "../../common/Loader/Loading";

type  LoginContentPropsType = {

    onClickHandler: ({email, password, rememberMe}: LoginParamsType) => void
}
type QuizParams = {
    id: string;
};
export const Card = () => {
    const dispatch = useDispatch()
    const {id} = useParams<QuizParams>()
    dispatch(findCardToLearn(id))
    const cardToLearn = useSelector<AppRootStateType, CardType>(state => state.cards.cardToLearn['0'])
    const idcard=useSelector<AppRootStateType,string|null>(state=> state.cards.currentIDcard)
    let history = useHistory();
    useEffect(()=>{
        dispatch(findCardToLearn(id))
        if(!id&&idcard){
            dispatch(findCardToLearn(idcard))
            history.push(`/card/${idcard}`)

        }

    },[id])

    const onClickHandler = ({email, password, rememberMe}: LoginParamsType) => {
        dispatch(loginTC({email, password, rememberMe}))
    }
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!cardToLearn) {
    return <div><h1>No picked card</h1></div>
    }

    return <CardContent id={id} cardToLearn={cardToLearn}/>


}
type PropType = {
    cardToLearn: CardType
    id: string
}

// export  type CardType = {
//     answer: string
//     question: string
//     cardsPack_id: string
//     grade: number
//     rating: number
//     shots: number
//     type: string
//     user_id: string
//     created: string
//     updated: string
//     __v: number
//     _id: string
//
//     answerImg: string
//     answerVideo: string
//     comments: string
//     more_id: string
//     questionImg: string
//     questionVideo: string}

const CardContent: React.FC<PropType> = ({
                                             cardToLearn, id

                                         }: PropType) => {

    const dispatch = useDispatch()
    const [grade, setGrade] = useState('')
    const [answer, showAnswer] = useState(false)
    const onClickAnswwrButton = () => {
        showAnswer(!answer)
    }
    if (answer) {
        const onValueChange = (e: any) => {
            setGrade(e.target.value)
        }
        const formSubmit = (event: any) => {
            let gr = Number(grade)
           const gradeto:putGradeType={grade:gr,card_id:id}
            event.preventDefault();
            dispatch(setGradeTC(gradeto))
            console.log(grade)
        }
        return (
            <div className={s.background}>
                <div className={s.registerBlock}>
                    <p> Please fill in the blank fields and press Login </p>

                    <div><h2>Question:</h2>
                        {cardToLearn.question}</div>
                    <div><h2>Answer:</h2>
                        {cardToLearn.answer}</div>

                    <div><h2>Grade your answear:</h2>
                    </div>
                    <form onSubmit={formSubmit}>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="1"
                                    checked={grade == "1"}
                                    onChange={onValueChange}
                                />
                                1
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="2"
                                    checked={grade == "2"}
                                    onChange={onValueChange}
                                />
                                2
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="3"
                                    checked={grade == "3"}
                                    onChange={onValueChange}
                                />
                                3
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="4"
                                    checked={grade == "4"}
                                    onChange={onValueChange}
                                />
                                4
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="5"
                                    checked={grade == "5"}
                                    onChange={onValueChange}
                                />
                                5
                            </label>
                        </div>
                        <div>
                            Selected Grade is : {grade}
                        </div>
                        <button className="btn btn-default" type="submit">
                            Send Grade
                        </button>


                    </form>

                    <Button
                        primary={true}
                        onClick={onClickAnswwrButton}
                        label={!answer?'show':'Hide'}
                    />
                </div>

            </div>

        )
    }
    return (
        <div className={s.background}>
            <div className={s.registerBlock}>
                <p> Please fill in the blank fields and press Login </p>
                <div><h2>Question:</h2>
                    {cardToLearn.question}</div>
                <Button
                    primary={true}
                    onClick={onClickAnswwrButton}
                    label={'Show Answer'}
                />
                {/*отобразить сообщение при успешной смене пароля*/}
            </div>

        </div>

    )
}




