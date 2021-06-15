import React, {CSSProperties, ReactNode, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from "./Modals.module.css"
import {deletePackTC} from '../../../m2-bll/packReducer';
import Modal from './Modal';
import {Button} from "../../common/Button/Button";

type ModalDeleteType = {
    showModalDelete: string;
    close: () => void;
    button?: ReactNode;
    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    _id: string
    show: boolean;
}

const ModalDelete: React.FC<ModalDeleteType> = (
    {
        button = 'delete',
        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {},
        modalStyle,
        modalOnClick = () => {},
        showModalDelete = "",
        close,
        _id,
        show
    }
) => {
    const dispatch = useDispatch();

    const [saveInputs, setSaveInputs] = useState({
        f: () => {}
    });

    const deletePack = () => {
        dispatch(deletePackTC(_id))
        close();
    };

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={() => {
                backgroundOnClick()
            }}
            modalOnClick={modalOnClick}
            showModalDelete={showModalDelete}
            show={true}
        >
            <div className={s.closeBtn}>
                <button onClick={() => close()}>x</button>
            </div>

            <div>
                {"Are you sure, you want to remove the pack?"}
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

export default ModalDelete;