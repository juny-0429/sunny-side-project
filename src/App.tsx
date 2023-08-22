import React, { useState } from 'react';
import { useQuery } from 'react-query';

import './App.scss';

interface WeatherData {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    icon: string;
  }[];
}

const cityKoreanNames: Record<string, string> = {
  Seoul: '서울',
  Busan: '부산',
  GOYANG: '고양',
  SUWON: '수원',
  GANGNEUNG: '강릉',
  ANDONG: '안동',
  GUNSAN: '군산',
  Gwangju: '광주',
  POHANG: '포항',
  ULSAN: '울산',
  Daegu: '대구',
  Daejeon: '대전',
  Incheon: '인천',
  JEJU: '제주도',
};

const API_KEY = "4f487d3b4e0b2f063fe4b518f0ec87c6";
// const API_KEY = process.env.REACT_APP_API_KEY;
const country_code: String = "KR";   // 국가명 저장

const fetchWeather = async (city: string) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

function WeatherBox({ selectedCity, setSelectedCity, selectedKoreanCity }: any) {
  const { data: weatherData, isError } = useQuery<WeatherData, Error>(
    ["weather", selectedCity],
    () => fetchWeather(selectedCity),
    {
      staleTime: 0,
    }
  );

  if (isError) {
    return <p>Error fetching weather data.</p>;
  }

  return (
    <div className='weatherCityBox'>
      <select className='weatherSelect' onChange={e => setSelectedCity(e.target.value)} value={selectedCity}>
        {Object.keys(cityKoreanNames).map(city => (
          <option key={city} value={city}>
            {cityKoreanNames[city]}
          </option>
        ))}
      </select>

      <div className='weatherInfo'>
        <p className='SCTitle'>{cityKoreanNames[selectedCity]}</p>
        {weatherData ? (
          <>
            <img
              className='weather-icon'
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt='Weather Icon'
            />
            <p className='SCTemp'>{Math.floor(weatherData.main.temp)}°C</p>
            <div className='SCTempMaxMin'>
              <span>최고 : {Math.floor(weatherData.main.temp_max)}°C</span>
              <span> / </span>
              <span>최저 : {Math.floor(weatherData.main.temp_min)}°C</span>
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

function App() {
  const [selectedCity1, setSelectedCity1] = useState("");
  const [selectedKoreanCity1, setSelectedKoreanCity1] = useState("");
  
  const [selectedCity2, setSelectedCity2] = useState("");
  const [selectedKoreanCity2, setSelectedKoreanCity2] = useState("");

  return (
    <div className='App'>
      <header className='App-header'>
        <p className='appTitle'>Sunnyside App</p>
        <p>원하는 지역의 날씨를</p>
        <p>간편하게 비교해보세요.</p>
      </header>

      <div className='weather'>

        <WeatherBox
          selectedCity={selectedCity1}
          setSelectedCity={setSelectedCity1}
          selectedKoreanCity={selectedKoreanCity1}
        />

        <WeatherBox
          selectedCity={selectedCity2}
          setSelectedCity={setSelectedCity2}
          selectedKoreanCity={selectedKoreanCity2}
        />
        
      </div>
    </div>
  );
}

export default App;