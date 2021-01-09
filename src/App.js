import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import EventDescription from './EventDescription';
import Spinner from './Spinner';

const App = ({ eventId, lang }) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`/api/events/${eventId}`)
            .then((response) => response.json())
            .then((payload) => setEvent(payload));
    }, []);

    return (
        <section className="eds-l-mar-all-4">
            {event ? <EventDescription event={event} lang={lang} /> : <Spinner />}
        </section>
    );
};

App.propTypes = {
    eventId: PropTypes.number,
    lang: PropTypes.string
};
export default App;
