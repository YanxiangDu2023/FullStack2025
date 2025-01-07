import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const api_key = '914b211f8a9ab9898a2d6ef009c46a11';

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  // 触发条件：组件首次加载时（依赖数组为空）。
  // 逻辑：
  // 通过 Axios 向 https://restcountries.com/v3.1/all 发送 GET 请求。
  // 获取所有国家的数据。
  // 将数据存储到 countries 状态中。



  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0];
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data);
        });
    }
  }, [selectedCountry, api_key]);

  // 触发条件：selectedCountry 或 api_key 改变时。
  // 逻辑：
  // 检查是否有选定的国家。
  // 如果有，从 selectedCountry 中提取首都信息。
  // 通过 Axios 向 OpenWeather API 发送 GET 请求，获取首都的天气信息。
  // 将天气数据存储到 weather 状态中。
  



  const handleFilterChange = (event) => setFilter(event.target.value);
  // 作用：当用户在输入框中输入内容时，更新 filter 状态。


  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
    setWeather(null); // 清空之前的天气数据
  };

  return (
    <div>
      <h2>Find countries</h2>
      <input value={filter} onChange={handleFilterChange} />
      <div>
        {filteredCountries.length > 10
          ? 'Too many matches, specify another filter'
          : filteredCountries.map(country => (
              <div key={country.cca3}>
                {country.name.common}
                <button onClick={() => handleShowDetails(country)}>show</button>
                {/* 当用户点击 "show" 按钮时，onClick 事件被触发。
                事件会调用 handleShowDetails，并将对应的 country 作为参数传递进去。 */}
              </div>
            ))}
      </div>
      {selectedCountry && (
        <div>
          <h3>{selectedCountry.name.common}</h3>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <h4>Languages:</h4>
          <ul>
            {Object.values(selectedCountry.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.svg} alt="flag" width="150" />
          {weather && (
            <div>
              <h4>Weather in {selectedCountry.capital[0]}</h4>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather icon"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
