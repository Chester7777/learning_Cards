import React from 'react';
import s from "./Modals.module.css";

type ModalType = {
    enableBackground?: boolean;
    backgroundOnClick?: () => void;
    modalOnClick?: () => void;
    show: boolean
    showModalDelete?: string
}

const Modal: React.FC<ModalType> = (
    {
        enableBackground,
        backgroundOnClick = () => {},
        modalOnClick = () => {},
        show,
        children,
        showModalDelete
    }
) => {

    if (!show) return null;

    return (
        <>
            {enableBackground && <div
                className={s.divBackgroundTransparent}
                onClick={backgroundOnClick}
            />}
            <div
                className={s.divModal}
                onClick={modalOnClick}
            >
                {children}
            </div>
        </>
    );
};

export default Modal;