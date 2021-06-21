import React, {CSSProperties, ReactNode, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from "./Modals.module.css"
import {deletePackTC} from '../../../m2-bll/packReducer';
import Modal from './Modal';
import {Button} from "../../common/Button/Button";
import { deleteCardTC } from '../../../m2-bll/cardsReducer';

type ModalDeleteType = {
    close: () => void;
    button?: ReactNode;
    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    _id: string
    show: boolean;
    idCArd:string
}

const ModalDeleteCards: React.FC<ModalDeleteType> = (
    {
        button = 'delete',
        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {},
        modalStyle,
        modalOnClick = () => {},
        close,
        _id,
        show,
        idCArd
    }
) => {
    const dispatch = useDispatch();



    const deletePack = () => {
        // dispatch(deletePackTC(_id))
        dispatch(deleteCardTC(idCArd,_id))

        close();
    };

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={() => {
                backgroundOnClick()
            }}
            modalOnClick={modalOnClick}
            show={true}
        >
            <div className={s.closeBtn}>
                <button onClick={() => close()}>x</button>
            </div>

            <div>
                {"Are you sure, you want to remove the card?"}
            </div>
            <div className={s.rowBtn}>
                <div>
                    <Button
                        onClick={() => close()}
                        label={'cancel'}
                        backgroundColor={'blue'}/>
                </div>
                <div>
                    <Button
                        onClick={() => deletePack()}
                        label={'delete'}
                        backgroundColor={'blue'}/>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDeleteCards;