import React from "react";

const Forecast = ({ title, items }) => {
  return (
    <div className="">
      <div className="flex item-center justify-start my-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {items &&
          items.map((item) => (
            <div className="flex flex-col items-center justify-center">
              <p className="font-light text-sm">{item}</p>
              <img
                src="http://openweathermap.org/img/wn/01d@2x.png"
                alt=""
                className="w-12 my-1"
              />
              <p className="font-medium">22°</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Forecast;
