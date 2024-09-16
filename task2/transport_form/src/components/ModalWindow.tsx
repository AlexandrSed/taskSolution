type Props = {
    isModal: boolean,
    handleOk?: () => void
}

export default function ModalWindow({isModal, handleOk}: Props) {

    return (
        <>
        {
            isModal? 
            <div className="modal">
                <div className="modalWindow">
                    <p>Форма успешно отправлена!</p>
                    <button className="primary" onClick={handleOk}> Ok</button>
                </div>
            </div>
            :
            <div></div>
        }
        </>
    )

}