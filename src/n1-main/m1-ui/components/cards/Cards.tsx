import React, {useCallback, useEffect, useState} from "react";

import s from './Cards.module.css'
import {Button} from "../../common/Button/Button";
import {SearchPack} from "../searchPack/SearchPack";
import {useDispatch, useSelector} from "react-redux";

import { AppRootStateType } from "../../../m2-bll/store";
import { CardPackType } from "../../../m3-dal/packs-api";
import {addCardsTC, deleteCardTC, getCardTC, unpdateCardTC } from "../../../m2-bll/cardsReducer";
import { useParams } from "react-router-dom";
import {cardsPostType, cardsTypeobj, CardType, updateCardType } from "../../../m3-dal/cards-api";
import Loading from "../../common/Loader/Loading";
import ModalUpdate from "../modal/ModalUpdate";
import ModalDelete from "../modal/ModalDelete";
import ModalDeleteCards from "../modal/ModalDeleteCards";
import ModalUpdateCards from "../modal/ModalUpdateCards";

type PropTyPe = {
    packID:string
};

type QuizParams = {
    id: string;
};
const CardsContainer =React.memo(
    () => {
        const cards=useSelector<AppRootStateType,Array<CardType>>(state=> state.cards.cards)
        const { id }=useParams<QuizParams>();
        const dispatch = useDispatch();


        const updateHanler=useCallback(({_id,comments,question}:updateCardType)=>{
            alert({id, _id, comments, question})
            dispatch(unpdateCardTC({id,_id,comments,question}))

        },[])

        useEffect(() => {
            debugger
            dispatch(getCardTC(1,id))

        }, [updateHanler])





        if (!cards) {
            return <Loading/>
        }

        return (<div>
                <Cards updateHanler={updateHanler}
                       cards={cards}
                        idPack={id}


                />
            </div>
        )


    }
)
type Propstype={
    cards:Array<CardType>
    updateHanler:({_id,comments,question}:updateCardType)=>void
    idPack:string
}
const Cards =React.memo(
    ({cards,updateHanler,idPack}:Propstype) => {
   
const dispatch=useDispatch()
        const [show, setShow] = useState<boolean>(false);

        const [showModalDelete, setShowModalDelete] = useState<string>("");
        const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
       ///id card for modal:
        const [update, setUpdate] = useState<string>("");


// const dellH=useCallback((id:string)=>{
//     deleteCardHandler(id)
// },[])
        const deleteCardHandler1=useCallback((idCard:string)=>{
            setShowModalDelete(idCard)

            // dispatch(deleteCardTC(idCard,idPack))
        },[])

        const updateH=useCallback((_id:string)=>{
            setShowUpdateModal(true)
            setUpdate(_id)

            // updateHanler({_id,comments,question})
        },[cards])
        
        
        const addCardHandler=useCallback(()=>{
        // const objcards:cardsTypeobj<cardsPostType>={card:{cardsPack_id:idPack,question: question,answer:comments}}
        // dispatch(addCardsTC(objcards))
        
        },[])

        return (
            <div>
                {/*если update true, откроется модалка*/}
                {showUpdateModal && <ModalUpdateCards
                    close={() => setShowUpdateModal(false)}
                    enableBackground={true}
                    backgroundOnClick={() => setShowUpdateModal(false)}
                    _id={update}
                    show={showUpdateModal}
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
                <div>
                    <input
                        placeholder={'Enter question'}
                        className={s.inputQuestion}/>
                    <input
                        placeholder={'Enter answer'}
                        className={s.inputAnswer}/>
                    <Button
                        label={'Save'}/>
                </div>

                <SearchPack />
                <table className={s.table}>
                    <thead>
                    <tr>
                        <th>Answer</th>
                        <th>Question</th>
                        <th>Grade</th>
                        <th>Shots</th>
                        <th><Button onClick={addCardHandler}
                                    label={'Add Card'}/>
                        </th>
                    </tr>
                    </thead>
                    {cards.map((c: CardType) => {
                        return <tbody key={c._id} className={s.packData}>
                        <tr>
                            <td>{c.answer}</td>
                            <td>{c.question}</td>
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

