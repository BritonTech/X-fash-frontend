import React, { useContext } from 'react';
import { CurrencyContext } from '../../Context/CurrencyContext';
import './Price.css'

const Price = ({ amountInKES }) => {
  const { selectedCurrency } = useContext(CurrencyContext);
  const converted = amountInKES * selectedCurrency.rate;

  const formatted = new Intl.NumberFormat(selectedCurrency.locale, {
    style: 'currency',
    currency: selectedCurrency.code,
  }).format(converted);

  return <span>{formatted}</span>;
};

export default Price;