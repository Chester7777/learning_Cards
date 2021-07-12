import React, {useCallback, useEffect, useState} from "react";
import s from './Cards.module.css'
import {Button} from "../../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../m2-bll/store";
import {getCardTC, setcurrentIDcard} from "../../../m2-bll/cardsReducer";
import {CardType} from "../../../m3-dal/cards-api";
import Loading from "../../common/Loader/Loading";
import ModalDeleteCards from "../modal/ModalDeleteCards";
import ModalUpdateCards from "../modal/ModalUpdateCards";
import ModalAddCards from "../modal/ModalAddCards";
import {SearchCards} from "../searchPack/SearchCards";

type PropTyPe = {
    packID: string
};

type QuizParams = {
    id: string;
};
const CardsContainer = React.memo(() => {

        const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
        const idS = useSelector<AppRootStateType, string | null>(state => state.cards.currentIDpack)
        const {id} = useParams<QuizParams>();
        const dispatch = useDispatch();
        let history = useHistory();

        useEffect(() => {
            dispatch(getCardTC(1, id))
            if (!id && idS) {
                dispatch(getCardTC(1, idS))
                history.push(`/cards/${idS}`)
            }
        }, [id])


        if (!cards) {
            return <Loading/>
        }

        return (<div>
                <Cards
                    cards={cards}
                    idPack={id}
                />
            </div>
        )
    }
)

type Propstype = {
    cards: Array<CardType>
    idPack: string
}

const Cards = React.memo(({cards, idPack}: Propstype) => {

        const dispatch = useDispatch()
        const [show, setShow] = useState<boolean>(false);
        const [question, setQuestion] = useState('testmy21')
        const [comments, setComments] = useState('answer my21')
        const [showModalDelete, setShowModalDelete] = useState<string>('');
        const [showUpdateModal, setShowUpdateModal] = useState<string>("");
        const [showAddCardModal, setshowAddCardModal] = useState<string>("");
        ///id card for modal:
        //  const [updateID, setUpdate] = useState<string>("");


// const dellH=useCallback((id:string)=>{
//     deleteCardHandler(id)
// },[])

        const deleteCardHandler1 = useCallback((idCard: string) => {
            // const callcback=deleteCardTC.bind(this,idCard,idPack)

            setShowModalDelete(idCard)

            // dispatch(deleteCardTC(idCard,idPack))
        }, [])

        const updateH = useCallback((_id: string) => {
            setShowUpdateModal(_id)

        }, [cards])

        const addCardHandler = useCallback(() => {
            setshowAddCardModal('open')

        }, [])
        const showcurrencard = (id: string) => {
            dispatch(setcurrentIDcard(id))
        }

        return (
            <div>
                {/*если update true, откроется модалка*/}
                {Boolean(showUpdateModal) && <ModalUpdateCards
                    close={() => setShowUpdateModal('')}
                    enableBackground={true}
                    backgroundOnClick={() => setShowUpdateModal('')}
                    _id={showUpdateModal} ///id card
                    show={show}
                    id={idPack}
                />}
                {/*если update true, откроется ModalAddCards*/}
                {Boolean(showAddCardModal) && <ModalAddCards
                    close={() => setshowAddCardModal('')}
                    enableBackground={true}
                    backgroundOnClick={() => setshowAddCardModal('')}
                    show={show}
                    id={idPack}
                />}
                {/*если _id={showModalDelete} строка, откроется модалка*/}
                {Boolean(showModalDelete) && <ModalDeleteCards
                    close={() => setShowModalDelete('')}
                    enableBackground={true}
                    backgroundOnClick={() => setShowModalDelete('')}
                    _id={idPack}
                    idCArd={showModalDelete}
                    show={show}
                />}
                {/*<div>*/}
                {/*    <input*/}
                {/*        placeholder={'Enter question'}*/}
                {/*        className={s.inputQuestion}/>*/}
                {/*    <input*/}
                {/*        placeholder={'Enter answer'}*/}
                {/*        className={s.inputAnswer}/>*/}
                {/*    <Button*/}
                {/*        label={'Save'}/>*/}
                {/*</div>*/}

                <SearchCards/>
                <table className={s.table}>
                    <thead>
                    <tr>
                        <th>Answer</th>
                        <th>Question</th>
                        <th>Grade</th>
                        <th>Shots</th>
                        <th><Button
                            onClick={addCardHandler}
                            label={'Add Card'}
                        />
                        </th>
                    </tr>
                    </thead>
                    {cards.map((c: CardType) => {
                        return <tbody key={c._id} className={s.packData}>
                        <tr>
                            <td>{c.answer}</td>
                            <td onClick={() => showcurrencard(c._id)}><NavLink
                                to={`/card/${c._id}`}>{c.question}</NavLink></td>
                            {/*<NavLink to={`/cards/${p._id}`} onClick={() => showCards(p._id)}>Cards</NavLink>*/}
                            <td>{c.grade}</td>
                            <td>{c.shots}</td>
                            <td>
                                <Button
                                    onClick={() => updateH(c._id)}
                                    label={'Update'}/>
                                <Button
                                    onClick={() => deleteCardHandler1(c._id)}
                                    label={'Delete'}/>
                            </td>
                        </tr>
                        </tbody>
                    })
                    }
                </table>
            </div>
        );
    }
)
export default CardsContainer;

