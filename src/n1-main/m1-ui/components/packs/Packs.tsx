import React, {useEffect, useState} from "react";
import s from './Packs.module.css'
import {Button} from "../../common/Button/Button";
import {SearchPack} from "../searchPack/SearchPack";
import {Paginator} from "../searchPack/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {addPackTC, deletePackTC, getPacksTC, setPacksError, unpdatePackTC} from "../../../m2-bll/packReducer";
import {NavLink} from "react-router-dom";
import {cardPackPostType, CardPackType, cardsPackTypeobj, updatePackType} from "../../../m3-dal/packs-api";
import Loading from "../../common/Loader/Loading";
import ModalInput from "../modal/ModalInput";


const PacksContainer = () => {
    ///это для того чтоб загржались свои карточки а не игната, чтоб работало раскоментировать
    const userID = useSelector<AppRootStateType, string>(state => state.profile._id)
    const [show, setShow] = useState(false);

    if (!userID) {
        return <Loading/>
    }

    return (<div>
            <Packs userID={userID}/>
        </div>
    )
}


type PropsType = {
    userID: string
}

const Packs = ({userID}: PropsType) => {
    //для открытия модалки
    const [show, setShow] = useState(false);


    const dispatch = useDispatch();
    const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>((state: AppRootStateType) => state.packs.cardPacks);
    const error = useSelector((state: AppRootStateType) => state.packs.error);
    const pageCount = useSelector((state: AppRootStateType) => state.packs.pageCount);
    const page = useSelector((state: AppRootStateType) => state.packs.page);

    useEffect(() => {
        dispatch(getPacksTC(page, userID))  ///для получения своих карт по своему ид
        // dispatch(getPacksTC(page, ''))

    }, [userID])



    const addPackTitle = () => {
        //открывает модалку для добавления PACK
        setShow(true)
    }
    const changeTitle = (_id: string) => {
        const objUpdatePack: cardsPackTypeobj<updatePackType> = {cardsPack: {_id: _id, name: 'new name'}}

        dispatch(unpdatePackTC(objUpdatePack))
    }
    const deletePack = (_id: string) => {
        dispatch(deletePackTC(_id))

    }
    const showCards = (_id: string) => {

    }

    return (
        <div>
            {/*если show true, откроется модалка*/}
            {show && <ModalInput
                show={show}
                close={() => setShow(false)}
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
            />}
            <div>
                <Button onClick={addPackTitle} label={'Add Pack'}/>
            </div>
            <SearchPack/>
            <table className={s.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Cards count</th>
                    <th>Created</th>
                    <th>Last update</th>
                    <th>Controls</th>
                </tr>
                </thead>
                {cardPacks.map((p: any) => {
                    return <tbody key={p._id} className={s.packData}>
                    <tr>
                        <td>{p.name}</td>
                        <td>{p.cardsCount}</td>
                        <td>{p.created}</td>
                        <td>{p.updated}</td>
                        <td>
                            <Button
                                onClick={() => changeTitle(p._id)}
                                label={'Update'}/>
                            <Button
                                onClick={() => deletePack(p._id)}
                                label={'Delete'}/>
                            <NavLink to='/cards' onClick={() => showCards(p._id)}>Cards</NavLink>

                        </td>
                    </tr>
                    </tbody>
                })
                }
            </table>
            <Paginator/>
        </div>
    );
}


export default PacksContainer;




















