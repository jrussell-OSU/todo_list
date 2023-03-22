/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import './App.css';
import PropTypes from 'prop-types';

function App() {
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
    name: '',
    age: 0,
    date: '',
    programming: '',
  });
  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy

    fetch('/data')
      .then((res) => res.json()
        .then((newData) => {
        // Setting a data from api
          setdata({
            name: newData.Name,
            age: newData.Age,
            date: newData.Date,
            programming: newData.programming,
          });
        }))
      // eslint-disable-next-line no-console
      .catch((error) => console.error(`Error fetching '/': ${error}`));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React and flask</h1>
        {/* Calling a data from setdata for showing */}
        <p>{data.name}</p>
        <p>{data.age}</p>
        <p>{data.date}</p>
        <p>{data.programming}</p>

      </header>
    </div>
  );
}

App.propTypes = {

};

export default App;
