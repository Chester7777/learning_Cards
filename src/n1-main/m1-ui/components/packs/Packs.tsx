import React, {useEffect, useState} from "react";
import s from './Packs.module.css'
import {Button} from "../../common/Button/Button";
import {SearchPack} from "../searchPack/SearchPack";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {getPacksTC} from "../../../m2-bll/packReducer";
import {NavLink} from "react-router-dom";
import {CardPackType} from "../../../m3-dal/packs-api";
import Loading from "../../common/Loader/Loading";
import ModalDelete from "../modal/ModalDelete";
import ModalUpdate from "../modal/ModalUpdate";
import ModalAddPack from "../modal/ModalAddPack";
import { Paginator } from "../paginator_searchPack/Paginator";


const PacksContainer = () => {
    ///это для того чтоб загржались свои карточки а не игната, чтоб работало раскоментировать
    const userID = useSelector<AppRootStateType, string>(state => state.profile._id)

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
    const [show, setShow] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [update, setUpdate] = useState<string>("");
    const [showModalDelete, setShowModalDelete] = useState<string>("");


    const dispatch = useDispatch();
    const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>((state: AppRootStateType) => state.packs.cardPacks);
    const error = useSelector((state: AppRootStateType) => state.packs.error);
    const pageCount = useSelector((state: AppRootStateType) => state.packs.pageCount);
    const page = useSelector((state: AppRootStateType) => state.packs.page);

    useEffect(() => {
        dispatch(getPacksTC(page, userID))  ///для получения своих карт по своему ид
    }, [userID])


    const addPackTitle = () => {
        //открывает модалку для добавления PACK
        setShow(true)
    }
    const changeTitle = (_id: string) => {
        //открывает модалку для обновления PACK
        setShowUpdateModal(true)
        setUpdate(_id)
    }
    const deletePack = (_id: string) => {
        //открывает модалку для удаления PACK
        setShowModalDelete(_id)
    }

    const showCards = (_id: string) => {

    }

    return (
        <div>
            {/*если show true, откроется модалка*/}
            {show && <ModalAddPack
                show={show}
                close={() => setShow(false)}
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
            />}
            {/*если update true, откроется модалка*/}
            {showUpdateModal && <ModalUpdate
                close={() => setShowUpdateModal(false)}
                enableBackground={true}
                backgroundOnClick={() => setShowUpdateModal(false)}
                _id={update}
                show={show}
            />}
            {/*если _id={showModalDelete} строка, откроется модалка*/}
            {Boolean(showModalDelete) && <ModalDelete
                close={() => setShowModalDelete('')}
                enableBackground={true}
                backgroundOnClick={() => setShowModalDelete('')}
                _id={showModalDelete}
                show={show}
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




















