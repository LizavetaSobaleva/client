import React, { useState } from 'react';
import './selector.less';

const Selector = ({ value, options, onChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="selector" {...props}>
      <div className="selector__trigger" onClick={() => setIsOpen(!isOpen)} data-testid="selector-trigger"
      >
        {options.find((option) => option.value === value)?.label || 'Select'}
        <span className={`arrow ${isOpen ? 'open' : ''}`} />
      </div>

      {isOpen && (
        <div className="selector__options" data-testid="selector-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`selector__option ${option.value}`}
              onClick={() => handleOptionClick(option.value)}
              data-testid={`selector-option-${option.value}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;