import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import s from "./Paginator.module.css"
import cn from "classnames";
import { getPacksTC } from "../../../m2-bll/packReducer";
import { useParams } from "react-router-dom";

// type PaginatorType = {
//     page: number
//     totalItemsCount: number
//     pageCount: number
//     portionSize: number
//     onPageChanged: () => void
//     cardPacksTotalCount: number
//    
// }


export let Paginator = () => {
    const portionSize = useSelector<AppRootStateType, number>(state => state.packs.portionSize);
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount);
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.page);
    const myId = useSelector<AppRootStateType, string>(state => state.packs.id);
    const dispatch = useDispatch()


    let pagesCount = Math.ceil(cardPacksTotalCount / 10);
    let pages = [];

    const onPageChanged = (currentPage: number) => {
        dispatch(getPacksTC(currentPage, myId))
    }


    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>
            }
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return <span
                            className={cn({[s.selectedPage]: currentPage === p}, s.pageNumber)}
                            key={p}
                            onClick={(e) => {onPageChanged(p)}}>{p}</span>
                    })
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>FOLL</button>
            }
        </div>
    )
}

