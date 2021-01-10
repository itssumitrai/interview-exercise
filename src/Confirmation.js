import PropTypes from 'prop-types';

const Confirmation = ({ order, event, lang, onClose }) => {
    function onSubmit(e) {
        e.preventDefault();
        alert('You have placed your order successfully!');
        onClose();
    }
    const { base_price, eventbrite_fee, tax, gross } = order;

    return (
        <section className="confirmation">
            <header>
                <h2>Confirm your order</h2>
            </header>
            <form onSubmit={onSubmit}>
                <dl>
                    <div>
                        <dt>Event:</dt>
                        <dd>{event.name.text}</dd>
                    </div>
                    <div>
                        <dt>Name:</dt>
                        <dd>{order.name}</dd>
                    </div>
                    <div>
                        <dt>Base Price:</dt>
                        <dd>
                            {new Intl.NumberFormat(lang, {
                                style: 'currency',
                                currency: base_price.currency
                            }).format(base_price.value)}
                        </dd>
                    </div>
                    <div>
                        <dt>Eventbrite Fees:</dt>
                        <dd>
                            {new Intl.NumberFormat(lang, {
                                style: 'currency',
                                currency: eventbrite_fee.currency
                            }).format(eventbrite_fee.value)}
                        </dd>
                    </div>
                    <div>
                        <dt>Taxes:</dt>
                        <dd>
                            {new Intl.NumberFormat(lang, {
                                style: 'currency',
                                currency: tax.currency
                            }).format(tax.value)}
                        </dd>
                    </div>
                    <div>
                        <dt>Total Amount:</dt>
                        <dd>
                            {new Intl.NumberFormat(lang, {
                                style: 'currency',
                                currency: gross.currency
                            }).format(gross.value)}
                        </dd>
                    </div>
                </dl>
                <button type="submit">Place Order</button>
            </form>
        </section>
    );
};
Confirmation.propTypes = {
    event: PropTypes.object,
    order: PropTypes.object,
    lang: PropTypes.string,
    onClose: PropTypes.func
};
export default Confirmation;
