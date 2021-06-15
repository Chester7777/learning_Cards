import React, {CSSProperties, ReactNode, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from "./Modals.module.css"
import {unpdatePackTC} from '../../../m2-bll/packReducer';
import Modal from './Modal';
import {Button} from "../../common/Button/Button";
import {cardsPackTypeobj, updatePackType} from '../../../m3-dal/packs-api';

type ModalUpdateType = {
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

const ModalUpdate: React.FC<ModalUpdateType> = (
    {
        button = 'save',
        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {},
        modalStyle,
        modalOnClick = () => {},
        show,
        close,
        _id
    }
) => {
    const dispatch = useDispatch();
    const [newName, setNewName] = useState("");
    const [saveInputs, setSaveInputs] = useState({
        f: () => {}
    });

    const successCloseModal = () => {
        const objUpdatePack: cardsPackTypeobj<updatePackType> = {cardsPack: {_id: _id, name: newName}}
        dispatch(unpdatePackTC(objUpdatePack))
        setNewName('')

        saveInputs.f();
        setNewName(newName || '');
        setSaveInputs({
            f: () => {}
        }); // unsubscribe
        close();
    };

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={() => {
                setNewName(newName);
                backgroundOnClick()
            }}
            modalOnClick={modalOnClick}
            show={true}
        >
            <div className={s.closeBtn}>
                <button onClick={()=> close()}>x</button>
            </div>
            {"update name pack"}
            <div>
                <input className={s.setNameInput}
                       name={'name'}
                       type={'text'}
                       value={newName}
                       onChange={e => setNewName(e.currentTarget.value)}
                />
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
                        onClick={successCloseModal}
                        label={'save'}
                        backgroundColor={'blue'}/>
                </div>
            </div>
        </Modal>
    );
};

export default ModalUpdate;