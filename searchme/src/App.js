import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
function App() {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        if(!response.ok){
          throw new Error('error in fetching');


        }

        const data = await response.json();
        setCountries(data);
      }catch(e){
        console.error("error",e);
      }
    }
    fetchData();
  },[search])


  const filterCountry = countries.filter((country)=>
  country.name.common.toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
    <div className='searchbar'>
      <input placeholder='Search for Countries...' type='text' value={search} onChange={(e)=>setSearch(e.target.value)}></input>
      </div>
      <div className="App">
      {filterCountry.map((country)=>(
        <div className='countryCard' key={country.cca3}>
          <img src={country.flags.png} alt={country.flags.alt}></img>

          <h2>{country.name.common}</h2>
        </div>
      ))}  
    </div>
    </>
  );
}

export default App;
