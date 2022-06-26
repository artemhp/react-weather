import { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [obj, setObj] = useState({});
  const [dynamicCity, setDynamicCity] = useState('Kiev');
  const promise = fetch(
    'https://api.weatherapi.com/v1/current.json?key=b677082ac19f45aca07212645220401&q=' +
      dynamicCity +
      '&aqi=no'
  );
  useEffect(
    function () {
      promise
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setObj({
            country: data.location.country,
            city: data.location.name,
            condition: data.current.condition.text,
            date: data.location.localtime,
          });
        });
    },
    [dynamicCity]
  );

  console.log('!!!');

  return (
    <div className='wrapper'>
      <input
        type='text'
        onChange={(event) => {
          setDynamicCity(event.target.value);
        }}
        value={dynamicCity}
      />
      <header className='header'>
        <div id='city'>{obj.city}</div>
        <div id='country'>{obj.country}</div>
        <div id='date'>{obj.date}</div>
      </header>
      <div className='main'>
        <div className='main__primary-wrap'>
          <div id='icon'></div>
          <div id='condition'>{obj.condition}</div>
        </div>
        <div className='main__secondary-wrap'>
          <div className='main-secondary-wrap__item main__temp'>
            <span id='temp'></span>&deg;
          </div>
          <div className='main-secondary-wrap__item'>
            Feelslike: <span id='feelslike'></span>&deg;
          </div>
          <div className='main-secondary-wrap__item'>
            Humidity: <span id='humidity'></span>%
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
