import PropTypes from 'prop-types';

const Total = ({ selectedTickets, lang, tickets, isEmpty }) => {
    let subTotal = 0;
    let fees = 0;
    let taxes = 0;
    let costCurrency, taxCurrency, feesCurrency; // Ideally they would already be in same currency, but just keeping it strictly based on data.
    return (
        <div className="check-total">
            {isEmpty ? (
                <div className="empty">
                    <svg viewBox="0 0 24 24">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20 14l2-9H9v1h11.9l-1.7 7.1L7 14V2H2v3h4v12h14v-1H7v-1l13-1zM3 3h3v1H3V3z"
                        ></path>
                        <g fillRule="evenodd" clipRule="evenodd">
                            <path d="M8 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM18 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"></path>
                        </g>
                    </svg>
                </div>
            ) : (
                <>
                    <h4 className="title">Order summary</h4>
                    <ul className="list">
                        {selectedTickets.map((quantity, index) => {
                            if (!quantity || quantity < 1) {
                                return null;
                            }

                            const { cost, fee, tax, display_name, id } = tickets[index];
                            const costValue = (cost.value / 100) * quantity;
                            subTotal += costValue;
                            fees += (fee.value / 100) * quantity;
                            taxes += (tax.value / 100) * quantity;
                            costCurrency = cost.currency;
                            feesCurrency = fee.currency;
                            taxCurrency = tax.currency;
                            return (
                                <li key={id} className="item">
                                    <span>
                                        {quantity} x {display_name}
                                    </span>
                                    <span>
                                        {new Intl.NumberFormat(lang, {
                                            style: 'currency',
                                            currency: costCurrency
                                        }).format(costValue)}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <dl>
                        <div className="subtotal">
                            <dt>Subtotal</dt>
                            <dd>
                                {new Intl.NumberFormat(lang, {
                                    style: 'currency',
                                    currency: costCurrency
                                }).format(subTotal)}
                            </dd>
                        </div>
                        {fees > 0 && (
                            <div className="fees">
                                <dt>Fees</dt>
                                <dd>
                                    {new Intl.NumberFormat(lang, {
                                        style: 'currency',
                                        currency: feesCurrency
                                    }).format(fees)}
                                </dd>
                            </div>
                        )}
                        {taxes > 0 && (
                            <div className="taxes">
                                <dt>Taxes</dt>
                                <dd>
                                    {new Intl.NumberFormat(lang, {
                                        style: 'currency',
                                        currency: taxCurrency
                                    }).format(taxes)}
                                </dd>
                            </div>
                        )}
                        <div className="total">
                            <span>Total</span>
                            <span>
                                {new Intl.NumberFormat(lang, {
                                    style: 'currency',
                                    currency: costCurrency
                                }).format(subTotal + fees + taxes)}
                            </span>
                        </div>
                    </dl>
                </>
            )}
        </div>
    );
};
Total.propTypes = {
    isEmpty: PropTypes.bool,
    tickets: PropTypes.array,
    lang: PropTypes.string,
    selectedTickets: PropTypes.array
};
export default Total;
