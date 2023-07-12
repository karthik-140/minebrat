import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { stateActions } from "../store/stateSlice";

import "./states.css";

const States = () => {
  const [display, setDisplay] = useState();
  const dispatch = useDispatch();
  const states = useSelector((state) => state.country.states);
  const cities = useSelector((state) => state.country.cities);

  useEffect(() => {
    const fetchStates = async () => {
      const response = await axios.get(
        "https://api.minebrat.com/api/v1/states"
      );
      const data = await response.data;
      console.log(data);
      dispatch(stateActions.fetchStates({ addStates: data }));
    };
    fetchStates();
  }, [dispatch]);
  console.log(states);

  const stateHandler = async (state) => {
    const stateData = states.filter((i) => i.stateName === state);
    let id;
    for (let ele of stateData) {
      id = ele.stateId;
    }
    const response = await axios.get(
      `https://api.minebrat.com/api/v1/states/cities/${id}`
    );
    const data = await response.data;
    dispatch(stateActions.fetchCities({ addCities: data }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const state = e.target.state.value;
    const city = e.target.city.value;
    console.log(state, city);
    setDisplay(`${state}, ${city}`);
  };

  return (
    <>
      <section className="states_section">
        <form onSubmit={submitHandler}>
          <select
            name="state"
            onChange={(e) => {
              stateHandler(e.target.value);
            }}
          >
            <option>--select state--</option>
            {states &&
              states.map((state, index) => (
                <option key={index} value={state.stateName}>
                  {state.stateName}
                </option>
              ))}
          </select>
          <select name="city">
            <option>--select city--</option>
            {cities &&
              cities.map((city, index) => (
                <option key={index} value={city.cityName}>
                  {city.cityName}
                </option>
              ))}
          </select>
          <button type="submit">Submit</button>
        </form>
        {display && <h1>You have selcted {display}</h1>}
      </section>
    </>
  );
};

export default States;
