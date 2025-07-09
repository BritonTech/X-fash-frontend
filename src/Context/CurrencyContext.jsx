import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CurrencyContext = createContext();

const defaultCurrency = {
  code: 'KES',
  rate: 1,
  symbol: 'KSh',
  locale: 'en-KE',
};

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    const stored = localStorage.getItem('currency');
    return stored ? JSON.parse(stored) : defaultCurrency;
  });

  const [exchangeRates, setExchangeRates] = useState(() => {
    const cachedRates = localStorage.getItem('exchangeRates');
    return cachedRates ? JSON.parse(cachedRates) : {};
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get('https://api.exchangerate-api.com/v4/latest/KES');
        setExchangeRates(res.data.rates);
        localStorage.setItem('exchangeRates', JSON.stringify(res.data.rates));
      } catch (err) {
        console.error('Failed to fetch exchange rates', err);
      }
    };

    if (!localStorage.getItem('exchangeRates')) {
      fetchRates();
    }
  }, []);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const res = await axios.get('https://ipapi.co/json');
        const countryCurrencyMap = {
          US: 'USD', GB: 'GBP', NG: 'NGN', IN: 'INR', KE: 'KES', EU: 'EUR'
        };
        const detectedCode = countryCurrencyMap[res.data.country_code] || 'KES';
        updateCurrency(detectedCode);
      } catch (err) {
        console.warn('Geolocation failed, using default currency');
      }
    };

    if (!localStorage.getItem('currency')) {
      detectCurrency();
    }
  }, [exchangeRates]);

  const updateCurrency = (currencyCode) => {
    const rate = exchangeRates[currencyCode] || 1;
    const symbolMap = {
      KES: 'KSh', USD: '$', EUR: '€', GBP: '£', INR: '₹', NGN: '₦'
    };
    const localeMap = {
      KES: 'en-KE', USD: 'en-US', EUR: 'de-DE', GBP: 'en-GB', INR: 'en-IN', NGN: 'en-NG'
    };

    const newCurrency = {
      code: currencyCode,
      rate,
      symbol: symbolMap[currencyCode] || currencyCode,
      locale: localeMap[currencyCode] || 'en-KE'
    };

    setSelectedCurrency(newCurrency);
    localStorage.setItem('currency', JSON.stringify(newCurrency));
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};