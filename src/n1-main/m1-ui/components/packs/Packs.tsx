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


const PacksContainer = () => {
    ///это для того чтоб загржались свои карточки а не игната, чтоб работало раскоментировать
    const userID = useSelector<AppRootStateType, string>(state => state.profile._id)
    if (!userID) {
        return <Loading/>
    }

    return <Packs userID={userID}/>
}


type PropsType = {
    userID: string
}

const Packs = ({userID}: PropsType) => {
    const [newpack, setNewPack] = useState('')
    const dispatch = useDispatch();
    const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>((state: AppRootStateType) => state.packs.cardPacks);
    const error = useSelector((state: AppRootStateType) => state.packs.error);
    // const _id = useSelector((state: AppRootStateType) => state.packs.cardPacks[0]._id);
    const pageCount = useSelector((state: AppRootStateType) => state.packs.pageCount);
    const page = useSelector((state: AppRootStateType) => state.packs.page);
    // const created = useSelector<AppRootStateType, Array<CardPackType>>((state: AppRootStateType) => state.packs.cardPacks[0].created);

    useEffect(() => {
        dispatch(getPacksTC(page, userID))  ///для получения своих карт по своему ид
        // dispatch(getPacksTC(page, ''))

    }, [userID])

    // if (cardPacks) {
    //     debugger
    //     dispatch(getPacksTC(cardPacks))
    // } else {
    //     dispatch(setPacksError(error))
    // }
    const addPackTitle = () => {
        const newcard: cardsPackTypeobj<cardPackPostType> = {cardsPack: {name: newpack}}
        dispatch(addPackTC(newcard))
        setNewPack('')

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
            <div>
                <input
                    value={newpack}
                    placeholder={'Enter name to new pack'}
                    onChange={(e) => {
                        setNewPack(e.currentTarget.value)
                    }}
                    className={s.inputTitlePack}/>
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
                    {/*return <tbody className={s.packData}>*/}
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




















