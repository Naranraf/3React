import axios from "axios";
import css from "./App.css";
import { useEffect, useState } from "react";
import ResidentInfo from "./components/ResidentInfo";
import ResidentInfoDos from "./components/ResidentInfoDos";

function App() {
  const [location, setLocation] = useState({});
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [idLocation, setIdLocation] = useState(3);


  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${idLocation}`)
      .then((resp) => {
        console.log(resp.data);
        setLocation(resp.data);

        getResidentsData(resp.data?.residents);
      })
      .catch((error) => console.error(error));
  }, [idLocation]);

  const getResidentsData = (residentsArray) => {
    const idArray = residentsArray.map((url) => url.split("/")[5]);

    axios
      .get(`https://rickandmortyapi.com/api/character/${idArray}`)
      .then((resp) => {
        setResidents(resp.data);
      })
      .catch((error) => console.error(error));
  };

  /*
        10 personajes por pagina
        pagina  indicePrimer    indiceUltimo
        1           0           9
        2           10          19
        3           20          29
        4           30          39


        5 personajes por pagina
        pagina  indicePrimer    indiceUltimo
        1       0                4
        2       5                9
        3       10               14

        residentPerPage = x
        pag  indicePrimer    indiceUltimo
        1    0               x - 1
        numPage    (residentPerPage * numPage) - residentPerPage     numPage * residentPerPage 
    */

  const residentPerPage = 10;
  const indexOfLastResident = residentPerPage * currentPage;
  const indexOfFirstResident = indexOfLastResident - residentPerPage;
  // ...

  const currentResidents = Array.isArray(residents) ? residents.slice(
    indexOfFirstResident,
    indexOfLastResident
  ) : [];
  const lastPage = Math.ceil((Array.isArray(residents) ? residents.length : 0) / residentPerPage);

  // ...


  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [locationsResults, setLocationResults] = useState([]);
  const getLocationsFiltered = (searchValue) => {
    axios
      .get(`https://rickandmortyapi.com/api/location?name=${searchValue}`)
      .then((resp) => {
        console.log(resp.data);
        setLocationResults(resp.data.results);
      });
  };

  return (
    <div className="appContainer">

      <div className="h1-container">
        <h1>{location.name}</h1>
        <input
        className="input-location"
        placeholder="Buscar"
        type="text"
        onChange={(e) => getLocationsFiltered(e.target.value)}
      />
      <select
        className="select-location"
        name="locations"
        id="locations"
        onChange={(e) => setIdLocation(e.target.value)}
      >
        {locationsResults.map((location) => (
          <option value={location.id} key={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      </div>




      

      <ResidentInfo />

      {
        currentResidents.map((resident) => (
          <ResidentInfoDos key={resident.id} residentData={resident} />
        ))}
      <div className="pagination-buttons">
        <button
          onClick={() => pagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[1, 2, 3].map((number) => (
          <button key={number} onClick={() => pagination(number)}>
            {number}
          </button>
        ))}
        <button
          onClick={() => pagination(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
