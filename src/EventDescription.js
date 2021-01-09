import '../styles/event.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Checkout from './Checkout';
import Modal from './Modal';

const EventDescription = ({ event, lang }) => {
    const [timeDisp, setTimeDisplay] = useState(null);
    const [isModalOpen, setModal] = useState(false);
    const { name, description, logo, start } = event;
    useEffect(() => {
        setTimeDisplay(
            Intl.DateTimeFormat(lang, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date(start.local))
        );
    });
    function onSubmit(e) {
        e.preventDefault();
        setModal(true);
    }
    function onClose() {
        setModal(false);
    }

    return (
        <>
            <div className="eventContainer">
                <img src={logo.url} alt={name.text} />
                <div className="eventDesc">
                    <h1>{name.text}</h1>
                    <p>{description.text}</p>
                    {timeDisp && <p className="eventTime">{timeDisp}</p>}
                </div>
            </div>
            <form className="ticketForm" onSubmit={onSubmit}>
                <button type="submit" className="ticketBtn">
                    Tickets
                </button>
            </form>
            <Modal isVisible={isModalOpen} onClose={onClose}>
                <Checkout event={event} lang={lang} />
            </Modal>
        </>
    );
};
EventDescription.propTypes = {
    event: PropTypes.object,
    lang: PropTypes.string
};
export default EventDescription;
