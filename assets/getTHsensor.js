export function getTHsensor(text) {
  if (text == "weather_temperature") {
    return "อุณหภูมิอากาศ";
  } else if (text == "weather_humidity") {
    return "ความชื้นอากาศ";
  } else if (text == "weather_light_lux") {
    return "ความเข้มแสง";
  } else if (text == "weather_Light_par") {
    return "ความเข้มแสง";
  } else if (text == "weather_co2") {
    return "คาร์บอนไดออกไซด์ในอากาศ";
  } else if (text == "weather_pm25") {
    return "PM2.5 ในอากาศ";
  } else if (text == "weather_pm10") {
    return "PM10 ในอากาศ";
  } else if (text == "weather_wind_direc") {
    return "ทิศทางลม";
  } else if (text == "weather_wind_speed") {
    return "ความเร็วลม";
  } else if (text == "weather_rain_gauge") {
    return "ปริมาณน้ำฝน";
  } else if (text == "weather_pressure") {
    return "ความดันอากาศ";
  } else if (text == "weather_o2") {
    return "ออกซิเจน";
  } else if (text == "weather_smoke") {
    return "ควัน";
  } else if (text == "soil_temperature") {
    return "อุณหภูมิในดิน";
  } else if (text == "soil_moisture") {
    return "ความชื้นในดิน";
  } else if (text == "soil_ec") {
    return "การนำไฟฟ้า:EC";
  } else if (text == "soil_ph") {
    return "กรด-ด่าง";
  } else if (text == "soil_n") {
    return "ไนโตรเจน:N";
  } else if (text == "soil_p") {
    return "ฟอสฟอรัส:P";
  } else if (text == "soil_k") {
    return "โพรแทสเซียม:K";
  } else if (text == "water_temperature") {
    return "อุณหภูมิ";
  } else if (text == "water_ph") {
    return "กรด-ด่าง";
  } else if (text == "water_do") {
    return "ปริมาณออกซิเจนละลายในน้ำ";
  } else if (text == "water_ec") {
    return "การนำไฟฟ้า:EC";
  } else if (text == "water_nh3") {
    return "แอมโนเนีย";
  } else if (text == "water_cl") {
    return "คลอรีน";
  } else if (text == "water_phosphate") {
    return "ฟอสฟีน";
  } else if (text == "water_nitrite") {
    return "ไนไตรท์";
  } else if (text == "water_turbidity") {
    return "ความขุ่นน้ำ";
  } else if (text == "gas_pressure") {
    return "ความดัน";
  } else if (text == "gas_no2") {
    return "ไนโตรเจนไดออกไซด์";
  } else if (text == "gas_so2") {
    return "ซัลเฟอร์ไดออกไซด์";
  } else if (text == "gas_pm25") {
    return "PM2.5";
  } else if (text == "gas_temperature") {
    return "อุณหภูมิ";
  } else {
    return text;
  }
}
