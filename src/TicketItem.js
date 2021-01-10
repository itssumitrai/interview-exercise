import PropTypes from 'prop-types';
import Select from './Select';
import { getFormattedDate } from './utils';

const TicketItem = ({ index, ticket, start, lang, onChange }) => {
    const { display_name, cost, fee, tax } = ticket;
    const ticketQuantities = [];

    function onSelectChange(e) {
        const ticketQuantity = e.target.value;
        onChange?.(index, ticketQuantity);
    }

    for (let i = 0; i <= 10; i++) {
        ticketQuantities[i] = i;
    }

    return (
        <li className="ticket-itm">
            <div className="ticket-desc">
                <div>
                    <h3>{display_name}</h3>
                    <div className="ticket-price">
                        <span className="ticket-cost">{cost.display}</span>
                        {fee.value > 0 && (
                            <span className="ticket-fee">+{fee.display} Fee</span>
                        )}
                        {tax.value > 0 && (
                            <span className="ticket-tax">+{tax.display} Tax</span>
                        )}
                    </div>
                </div>
                <div className="ticket-select">
                    <Select value={0} onChange={onSelectChange}>
                        {ticketQuantities.map((quantity) => (
                            <option key={quantity} value={quantity}>
                                {quantity}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="ticket-status">
                Sales end on{' '}
                {getFormattedDate(start.local, lang, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}
            </div>
        </li>
    );
};
TicketItem.propTypes = {
    lang: PropTypes.string,
    index: PropTypes.number,
    onChange: PropTypes.func,
    ticket: PropTypes.object,
    start: PropTypes.object
};
export default TicketItem;
