import { useState } from 'react';
import PropTypes from 'prop-types';

const Select = ({ className, children, value, onChange }) => {
    const [selectedValue, setValue] = useState(value);
    function handleChange(e) {
        setValue(e.currentTarget.value);
        onChange?.(e);
    }
    return (
        <label className={'select-wrapper ' + className} tabIndex="0">
            <div className="content">{selectedValue}</div>
            <svg viewBox="0 0 24 24">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 10.2l5 5 5-5-1.4-1.4-3.6 3.6-3.6-3.6z"
                ></path>
            </svg>
            <select
                tabIndex="-1"
                onChange={handleChange}
                value={selectedValue}
                className="hidden-select"
            >
                {children}
            </select>
        </label>
    );
};
Select.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
};
export default Select;
