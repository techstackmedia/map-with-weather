type WeatherPopupProps = {
  city: string;
  forecast: any;
};

export default function WeatherPopup({ city, forecast }: WeatherPopupProps) {
  const today = forecast?.list[0];
  const tomorrow = forecast?.list[8];
  return (
    <div className="text-sm">
      <strong>{city}</strong>
      <div>Today: {today?.main.temp}°C, {today?.weather[0].description}</div>
      <div>Tomorrow: {tomorrow?.main.temp}°C, {tomorrow?.weather[0].description}</div>
    </div>
  );
}