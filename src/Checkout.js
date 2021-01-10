import '../styles/checkout.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import OrderForm from './OrderForm';
import Confirmation from './Confirmation';

const Checkout = ({ event, lang, onClose }) => {
    const [orderData, setOrderData] = useState(null);
    function handlePlaceOrder(payload) {
        // set order data
        setOrderData(payload);
    }

    return (
        <section className="check-container">
            {!orderData ? (
                <OrderForm event={event} onSubmit={handlePlaceOrder} lang={lang} />
            ) : (
                <Confirmation order={orderData} event={event} lang={lang} onClose={onClose} />
            )}
        </section>
    );
};

Checkout.propTypes = {
    lang: PropTypes.string,
    onClose: PropTypes.func,
    event: PropTypes.object
};

export default Checkout;
