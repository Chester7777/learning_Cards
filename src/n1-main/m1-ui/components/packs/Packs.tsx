import React, {useEffect} from "react";
import s from './Packs.module.css'
import {Button} from "../../common/Button/Button";
import {SearchPack} from "../searchPack/SearchPack";
import {Paginator} from "../searchPack/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {getPacksTC, setPacksError} from "../../../m2-bll/packReducer";
import {NavLink} from "react-router-dom";
import {CardPackType} from "../../../m3-dal/packs-api";


const Packs = () => {

    const dispatch = useDispatch();
    const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>((state: AppRootStateType) => state.packs.cardPacks);
    const error = useSelector((state: AppRootStateType) => state.packs.error);
    // const _id = useSelector((state: AppRootStateType) => state.packs.cardPacks[0]._id);
    const pageCount = useSelector((state: AppRootStateType) => state.packs.pageCount);
    const page = useSelector((state: AppRootStateType) => state.packs.page);
    // const created = useSelector<AppRootStateType, Array<CardPackType>>((state: AppRootStateType) => state.packs.cardPacks[0].created);


    useEffect(() => {
        dispatch(getPacksTC(page, cardPacks))
    }, [dispatch, page, cardPacks])

    // if (cardPacks) {
    //     debugger
    //     dispatch(getPacksTC(cardPacks))
    // } else {
    //     dispatch(setPacksError(error))
    // }
    const addPackTitle = () => {

    }
    const changeTitle = (_id: string) => {

    }
    const deletePack = (_id: string) => {

    }
    const showCards = (_id: string) => {

    }


    return (
        <div>
            <div>
                <input

                    placeholder={'Enter name to new pack'}

                    className={s.inputTitlePack}/>
                <Button label={'Save'}/></div>
            <SearchPack/>
            <table className={s.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Cards count</th>
                    <th>Created</th>
                    <th>Lest update</th>
                    <th><Button onClick={addPackTitle} label={'Add Pack'}/></th>
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


export default Packs;




















