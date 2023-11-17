import React, { useState, useEffect } from 'react';

const NobelPrizeList = () => {
  const [prizes, setPrizes] = useState([]);
  const [filteredPrizes, setFilteredPrizes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://api.nobelprize.org/v1/prize.json');
      const data = await response.json();
      const prizeData = data.prizes || [];
      setPrizes(prizeData);
      setFilteredPrizes(prizeData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterPrizes = () => {
    let filtered = prizes || [];

    if (selectedCategory) {
      filtered = filtered.filter(prize => prize.category === selectedCategory);
    }

    if (selectedYear) {
      filtered = filtered.filter(prize => prize.year === selectedYear);
    }

    setFilteredPrizes(filtered);
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  const handleYearChange = event => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterPrizes();
  }, [selectedCategory, selectedYear]);

  return (
    <div className='noblePrizeList'>
      <h1 className='main-heading'>Nobel Prize Winners</h1>
      <div className='label-div'>
        <label className='category'>
          Category:
          <select value={selectedCategory} onChange={handleCategoryChange} className='category-select'>
            <option value="">All Categories</option>
            {[...new Set(prizes.map(prize => prize.category))].map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className='year'>
          Year:
          <select value={selectedYear} onChange={handleYearChange} className='year-select'>
            <option value="">All Years</option>
            {[...new Set(prizes.map(prize => prize.year))].filter(
              year => year >= 1900 && year <= 2018
            ).map(filteredYear => (
              <option key={filteredYear} value={filteredYear}>
                {filteredYear}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ul className='list-items'>
        {(filteredPrizes || []).map(prize => (
          <li key={prize.id}>
            <strong>{prize.category}</strong> - {prize.year}
            <ul>
              {(prize.laureates || []).map(laureate => (
                <li key={laureate.id} className='item'>
                  {laureate.firstname} {laureate.surname}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NobelPrizeList;