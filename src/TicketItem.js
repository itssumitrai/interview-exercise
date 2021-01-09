import PropTypes from 'prop-types';

const TicketItem = ({ ticket, start }) => {
    const { display_name, cost, fee, tax } = ticket;
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
                    <select>
                        <option>0</option>
                    </select>
                </div>
            </div>
            <div className="ticket-status">Sales end on {start.local}</div>
        </li>
    );
};
TicketItem.propTypes = {
    ticket: PropTypes.object,
    start: PropTypes.object
};
export default TicketItem;
