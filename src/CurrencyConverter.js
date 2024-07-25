import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';

const CurrencyConverter = () => {


  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);
  
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        console.error('Ошибка при получении курса валют', error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);
  
  return (
    <div>
      <h1>Конвертер валют</h1>
      <div>
        <input 
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)} 
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='GBP'>GBP</option>
          <option value='RUB'>RUB</option>
        </select>
        <span>в</span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='GBP'>GBP</option>
          <option value='RUB'>RUB</option>
        </select>
      </div>
      <h2>Результат: {convertedAmount} {toCurrency} </h2>
    </div>
  )
}

export default CurrencyConverter;