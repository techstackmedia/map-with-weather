type Forecast = {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
  city: {
    name: string;
    country: string;
  };
};

export default Forecast