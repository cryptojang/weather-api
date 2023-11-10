import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineWbSunny } from "react-icons/md";
import {
  BsCloudSun,
  BsCloudHaze,
  BsCloudSnow,
  BsCloudy,
  BsClouds,
  BsCloudDrizzle,
  BsCloudLightningRain,
  BsCloudRainHeavy,
} from "react-icons/bs";

const weatherIcon = {
  "01": {
    textColor: "text-red-600",
    icon: <MdOutlineWbSunny size={120} />,
    text: "해쨍쨍",
  },

  "02": {
    textColor: "text-orange-300",
    icon: <BsCloudSun size={120} />,
    text: "해 구름 쪼끔",
  },
  "03": {
    textColor: "text-gray-400",
    icon: <BsCloudy size={120} />,
    text: "구름 조금 꼈네요",
  },
  "04": {
    textColor: "text-gray-800",
    icon: <BsClouds size={120} />,
    text: "구름 짱 많아",
  },
  "09": {
    textColor: "text-blue-800",
    icon: <BsCloudDrizzle size={120} />,
    text: "비 쬐끔",
  },
  10: {
    textColor: "text-blue-600",
    icon: <BsCloudRainHeavy size={120} />,
    text: "비 와요 우산 챙기세요!",
  },
  11: {
    textColor: "text-black",
    icon: <BsCloudLightningRain size={120} />,
    text: "번개 쾅",
  },
  13: {
    textColor: "text-blue-300",
    icon: <BsCloudSnow size={120} />,
    text: "야호 눈이다!",
  },
  50: {
    textColor: "text-gray-200",
    icon: <BsCloudHaze size={120} />,
    text: "안개 조심!",
  },
};

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      console.log(latitude, longitude);
    });
  };

  const getWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
    );
    setWeatherData(response.data);
    console.log(response.data, "Hello");
  };
  useEffect(() => {
    getGeolocation();

    //날씨가져오기 // https://openweathermap.org/img/wn/10d@2x.png
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;
    //console.log(latitude, longitude);
    getWeather();
  }, [latitude, longitude]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center text-2xl  `}
    >
      {weatherData ? (
        <div
          className={`flex flex-col items-center gap-8 ${
            weatherIcon[weatherData.weather[0].icon.substring(0, 2)].textColor
          }`}
        >
          {weatherIcon[weatherData.weather[0].icon.substring(0, 2)].icon}

          <div>{weatherData.name},</div>
          <span>
            {weatherIcon[weatherData.weather[0].icon.substring(0, 2)].text}
          </span>
          <div>{weatherData.main.temp}°C</div>
        </div>
      ) : (
        <div>로딩 중... 좋은 하루 보내세요</div>
      )}
    </div>
  );
};

export default App;
