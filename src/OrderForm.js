import PropTypes from 'prop-types';
import Total from './Total';
import TicketItem from './TicketItem';
import { useState } from 'react';
import { getFormattedDate } from './utils';

function getEventDates(start, end, lang) {
    const formatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    const isSameDate = start.local.substring(0, 10) === end.local.substring(0, 10);

    return `${getFormattedDate(start.local, lang, formatOptions)} - ${getFormattedDate(
        end.local,
        lang,
        !isSameDate
            ? formatOptions
            : {
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZoneName: 'short'
              }
    )}`;
}

const OrderForm = ({ onSubmit, event, lang }) => {
    const { name, logo, start, end, ticket_classes, id } = event;
    const [selectedTickets, setSelectedTickets] = useState(
        // selected tickets as an array
        new Array(ticket_classes.length).fill(0)
    );
    const [isEmpty, setEmpty] = useState(true); // whether ticket selection is empty or not
    const [isOrdering, setOrderingState] = useState(false);

    function handleTicketChange(ticketIndex, quantity) {
        // ticket changed
        selectedTickets[ticketIndex] = parseInt(quantity, 10);
        let noTickers = true;
        for (let i = 0; i < selectedTickets.length; i++) {
            if (selectedTickets[i] > 0) {
                noTickers = false;
                break;
            }
        }
        if (isEmpty && !noTickers) {
            setEmpty(false);
        } else if (!isEmpty && noTickers) {
            setEmpty(true);
        }

        setSelectedTickets([...selectedTickets]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setOrderingState(true);

        try {
            const payload = await fetch(`/api/events/${id}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: 'Harry',
                    lastName: 'Potter',
                    email: 'harrypotter@yahoo.com',
                    ticketClasses: ticket_classes,
                    ticketQuantities: selectedTickets
                })
            }).then((response) => response.json());
            setOrderingState(false);
            onSubmit(payload); // go to the confirmation page
        } catch (ex) {
            setOrderingState(false);
            // Stay on same screen & show an error message
        }
    }

    return (
        <>
            <form className="check-article" onSubmit={handleSubmit}>
                <header>
                    <h2>{name.text}</h2>
                    <span className="event-time">{getEventDates(start, end, lang)}</span>
                </header>
                <article className="check-ticketing">
                    <ul className="ticket-list">
                        {ticket_classes.map((ticket, index) => {
                            return (
                                <TicketItem
                                    key={ticket.id}
                                    index={index}
                                    ticket={ticket}
                                    start={start}
                                    lang={lang}
                                    onChange={handleTicketChange}
                                />
                            );
                        })}
                    </ul>
                    <div className="attribution">
                        <a
                            href="https://eventbrite.com"
                            target="__blank"
                            rel="noopener noreferrer"
                        >
                            Powered by
                            <svg viewBox="0 0 200 36">
                                <g fillRule="evenodd">
                                    <path d="M186.292 17.513c2.693-.61 5.381.495 6.878 2.584l-11.905 2.693c.411-2.52 2.333-4.668 5.027-5.277zm6.945 9.91a6.57 6.57 0 01-3.98 2.679c-2.711.614-5.417-.51-6.907-2.626l11.941-2.702 1.945-.44 3.72-.841a11.782 11.782 0 00-.31-2.372c-1.514-6.426-8.056-10.432-14.612-8.949-6.556 1.484-10.644 7.896-9.13 14.321 1.513 6.426 8.055 10.433 14.611 8.95 3.863-.875 6.868-3.46 8.376-6.751l-5.654-1.269zM165.135 35.118V18.082h-3.677v-5.804h3.677V4.289h6.244v7.989h4.69v5.804h-4.69v17.036zM153.207 35.118h6.03v-22.84h-6.03v22.84zm-.784-30.853c0-2.114 1.667-3.7 3.824-3.7s3.775 1.586 3.775 3.7c0 2.115-1.618 3.748-3.775 3.748s-3.824-1.633-3.824-3.748zM151.108 12.342c-3.083.16-4.901.633-6.75 1.973v-2.037h-6.027v22.84h6.026v-11.2c0-3.524.86-5.529 6.751-5.726v-5.85zM117.507 24.057c.15 3.333 3.051 6.128 6.602 6.128 3.602 0 6.553-2.942 6.553-6.422 0-3.432-2.951-6.373-6.553-6.373-3.55 0-6.452 2.843-6.602 6.128v.539zm-5.88 11.061V1.38l6.03-1.364v13.962c1.863-1.49 4.07-2.115 6.472-2.115 6.864 0 12.355 5.286 12.355 11.918 0 6.583-5.49 11.965-12.355 11.965-2.402 0-4.609-.624-6.472-2.114v1.487h-6.03zM98.792 35.118V17.965h-3.677v-5.687h3.677V4.283l6.244-1.413v9.408h4.69v5.687h-4.69v17.153zM87.742 35.118V22.915c0-4.421-2.403-5.382-4.806-5.382-2.402 0-4.804.913-4.804 5.286v12.299h-6.03v-22.84h6.03v1.699c1.323-.961 2.941-2.115 6.129-2.115 5.098 0 9.511 2.932 9.511 10.092v13.164h-6.03zM56.831 17.513c2.694-.61 5.382.495 6.878 2.584L51.805 22.79c.41-2.52 2.333-4.668 5.026-5.277zm6.945 9.91a6.57 6.57 0 01-3.98 2.679c-2.71.614-5.416-.51-6.907-2.626l11.942-2.702 1.945-.44 3.719-.841a11.782 11.782 0 00-.31-2.372c-1.514-6.426-8.056-10.432-14.612-8.949-6.556 1.484-10.644 7.896-9.13 14.321 1.514 6.426 8.055 10.433 14.612 8.95 3.863-.875 6.868-3.46 8.375-6.751l-5.654-1.269zM32.238 35.118l-9.365-22.84h6.57l5.933 15.49 5.981-15.49h6.57l-9.364 22.84zM11.05 17.507c2.694-.61 5.382.495 6.879 2.584L6.024 22.785c.41-2.52 2.333-4.668 5.026-5.278zm6.945 9.91a6.57 6.57 0 01-3.98 2.68c-2.71.613-5.416-.51-6.907-2.626l11.942-2.702 1.945-.44 3.719-.842a11.782 11.782 0 00-.31-2.371c-1.514-6.426-8.055-10.433-14.612-8.95C3.236 13.65-.85 20.063.662 26.489c1.514 6.426 8.056 10.432 14.612 8.949 3.863-.874 6.868-3.46 8.376-6.75l-5.655-1.27z"></path>
                                </g>
                            </svg>
                        </a>
                    </div>
                </article>
                <footer>
                    <div className="footer-container">
                        <button
                            type="submit"
                            className="checkoutBtn"
                            disabled={isEmpty || isOrdering}
                        >
                            {isOrdering ? 'Loading...' : 'Checkout'}
                        </button>
                    </div>
                </footer>
            </form>
            <aside className="check-aside">
                <img src={logo.url} alt={name.text} />
                <Total
                    selectedTickets={selectedTickets}
                    tickets={ticket_classes}
                    lang={lang}
                    isEmpty={isEmpty}
                />
            </aside>
        </>
    );
};
OrderForm.propTypes = {
    event: PropTypes.object,
    onSubmit: PropTypes.func,
    lang: PropTypes.string
};
export default OrderForm;
