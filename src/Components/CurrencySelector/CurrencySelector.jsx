import React, { useContext, useState, useEffect } from 'react';
import { CurrencyContext } from '../../Context/CurrencyContext';
import './CurrencySelector.css';

const currencies = [
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' }
];

const CurrencySelector = () => {
  const { updateCurrency, selectedCurrency } = useContext(CurrencyContext);

  const [showSelector, setShowSelector] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setShowSelector(false);
    } else {
      // Scrolling up
      setShowSelector(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleChange = (e) => {
    updateCurrency(e.target.value);
  };

  return (
    <div className={`currency-selector-fixed ${showSelector ? 'selector--visible' : 'selector--hidden'}`}>
      <select value={selectedCurrency.code} onChange={handleChange}>
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.name} ({c.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
