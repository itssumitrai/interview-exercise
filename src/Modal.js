import PropTypes from 'prop-types';

const Modal = ({ children, isVisible, onClose }) => {
    function handleClose() {
        if (typeof onClose === 'function') {
            onClose();
        }
    }

    if (!isVisible) {
        return null;
    }
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button
                    tabIndex="0"
                    className="modal-closeBtn"
                    onClick={handleClose}
                    title="Close modal"
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M13.4 12l3.5-3.5-1.4-1.4-3.5 3.5-3.5-3.5-1.4 1.4 3.5 3.5-3.5 3.5 1.4 1.4 3.5-3.5 3.5 3.5 1.4-1.4z"></path>
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
};
Modal.propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
    onClose: PropTypes.func
};
export default Modal;
