import s from "./SortPacks.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {getSortPacksTC} from "../../../m2-bll/packReducer";
import React, {useState} from "react";

// type PropsType = {
//     property: string
// }

export const SortPacks = React.memo((props: { property: string }) => {

        const dispatch = useDispatch();
        const page = useSelector((state: AppRootStateType) => state.packs.page);
        const id = useSelector((state: AppRootStateType) => state.packs.id);
        const sortPack = useSelector((state: AppRootStateType) => state.packs.sortPacks);

        const [up, setUp] = useState<boolean>(false);
        const [down, setDown] = useState<boolean>(false);

    const upSortPacks = `0${props.property}`;
    const downSortPacks = `1${props.property}`;



    const upCallback = () => {
            setUp(true)
            setDown(false)
            dispatch(getSortPacksTC(page, id, upSortPacks))
        }

        const downCallback = () => {
            setUp(false)
            setDown(true)
            dispatch(getSortPacksTC(page, id, downSortPacks))
        }

        return <div className={s.sortContainer}>
            <div>
                <button
                    className={sortPack.substr(1) === props.property && up ? s.active : ""}
                    onClick={upCallback}>
                    ☝
                </button>
            </div>
            <div>
                <button
                    className={sortPack.substr(1) === props.property && down ? s.active : ""}
                    onClick={downCallback}>
                    ☟
                </button>
            </div>
        </div>
    }
)