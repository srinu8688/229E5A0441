import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:9876/numbers';

const AverageCalculator = () => {
  const [numberType, setNumberType] = useState('e');
  const [prevState, setPrevState] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  const fetchNumbers = async () => {
    try {
      const response = await axios.get(`${API_URL}/${numberType}`);
      const data = response.data;
      setPrevState(data.windowPrevState);
      setCurrState(data.windowCurrState);
      setNumbers(data.numbers);
      setAvg(data.avg);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const handleTypeChange = (e) => {
    setNumberType(e.target.value);
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <div>
        <label>
          Select Number Type:
          <select value={numberType} onChange={handleTypeChange}>
            <option value="p">Prime</option>
            <option value="f">Fibonacci</option>
            <option value="e">Even</option>
            <option value="r">Random</option>
          </select>
        </label>
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      <div>
        <h2>Results</h2>
        <p><strong>Previous State:</strong> {JSON.stringify(prevState)}</p>
        <p><strong>Current State:</strong> {JSON.stringify(currState)}</p>
        <p><strong>Fetched Numbers:</strong> {JSON.stringify(numbers)}</p>
        <p><strong>Average:</strong> {avg}</p>
      </div>
    </div>
  );
};

export default AverageCalculator;