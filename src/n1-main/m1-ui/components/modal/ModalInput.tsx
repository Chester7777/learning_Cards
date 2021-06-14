import React, {CSSProperties, ReactNode, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from "./Modals.module.css"
import style from '../../registration/Registration.module.css'
import {cardPackPostType, cardsPackTypeobj } from '../../../m3-dal/packs-api';
import { addPackTC } from '../../../m2-bll/packReducer';
import Modal from './Modal';
import {Button} from "../../common/Button/Button";

type ModalInputType = {
    show: boolean;
    close: () => void;
    setAnswer?: (answer: string) => void;
    button?: ReactNode;
    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
}

const ModalInput: React.FC<ModalInputType> = (
    {
        setAnswer = (answer: string) => {},
        button = 'save',
        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {},
        modalStyle,
        modalOnClick = () => {},
        show,
        close,
    }
) => {
    const dispatch = useDispatch();
    const [newName, setNewName] = useState("");
    const [saveInputs, setSaveInputs] = useState({
        f: () => {}
    });

    const successCloseModal = () => {
        const newcard: cardsPackTypeobj<cardPackPostType> = {cardsPack: {name: newName}}
        dispatch(addPackTC(newcard))
        setNewName('')


        saveInputs.f();
        setAnswer(newName || '');
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
            show={show}
        >
            <div className={s.closeBtn}>
                <button onClick={()=> close()}>x</button>
            </div>
            {"Creat new pack"}
            <div>
                <input className={s.setNameInput}
                       name={'name'}
                       type={'name'}
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

export default ModalInput;