import React, {CSSProperties, ReactNode, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from "./Modals.module.css"
import {unpdatePackTC} from '../../../m2-bll/packReducer';
import Modal from './Modal';
import {Button} from "../../common/Button/Button";
import {cardPackPostType, cardsPackTypeobj, updatePackType} from '../../../m3-dal/packs-api';
import { addCardsTC, unpdateCardTC } from '../../../m2-bll/cardsReducer';
import {cardsPostType, cardsTypeobj } from '../../../m3-dal/cards-api';

type ModalUpdateType = {
    close: () => void;
    button?: ReactNode;
    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    show: boolean;
    id:string

}

const ModalAddCards: React.FC<ModalUpdateType> = (
    {
        button = 'save',
        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {},
        modalStyle,
        modalOnClick = () => {},
        show,
        close,
        id    //pack

    }
) => {
    const dispatch = useDispatch();
    const [question,setQuestion]=useState('qestion')
    const [answer,setAnswer]=useState('answer')
    const [saveInputs, setSaveInputs] = useState({
        f: () => {}
    });

    const successCloseModal = () => {

debugger
        const objcards:cardsTypeobj<cardsPostType>={card:{cardsPack_id:id,question: question,answer:answer}}

        dispatch(addCardsTC(objcards))
        setQuestion('')

        saveInputs.f();
        // setNewName(newName || '');
        setSaveInputs({
            f: () => {}
        }); // unsubscribe
        close();
    };

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={() => {
                // setNewName(newName);
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
                       value={question}
                       onChange={e => setQuestion(e.currentTarget.value)}
                />
            </div>
            <div>
                <input className={s.setNameInput}
                       name={'name'}
                       type={'text'}
                       value={answer}
                       onChange={e => setAnswer(e.currentTarget.value)}
                />
            </div>
            <div className={s.rowBtn}>
                <div>
                    <Button
                        primary={true}
                        onClick={() => close()}
                        label={'cancel'}
                        backgroundColor={'blue'}/>
                </div>
                <div>
                    <Button
                        primary={true}
                        onClick={successCloseModal}
                        label={'save'}
                        backgroundColor={'blue'}/>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAddCards;