import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const URL ='https://api.thecatapi.com/v1/images/search?api_key=live_NqArTRe5VMXge5WCCxiPqMTV0efmO6lUlaOE3O8OTVXyUCHpaKm6KyWJeSV03O5n';
  //const URL = `https://api.thecatapi.com/v1/images/search?api_key=live_YCb1o71pDxKSCY_breeds=true?include_breeds=true`;

  const [currentImage, setCurrentImage] = useState(null);
  const [currentWeight, setCurrentWeight] = useState([]);
  const [currentHeight, setCurrentHeight] = useState([]);
  const [currentName, setCurrentName] = useState([]);
  const [bannedAttributes, setBannedAttributes] = useState([]);

  function apiCall() {
    fetch(URL).then((response) => response.json())
    .then((data) => {
      setCurrentImage(data[0]);
      setCurrentName(data[0].breeds[0].name);
      setCurrentWeight(data[0].breeds[0].weight.imperial);
      setCurrentHeight(data[0].breeds[0].height.imperial);
      console.log(data[0]);
    })
  }

  function addToBanList(attribute) {
    if(!bannedAttributes.includes(attribute)){
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  }

  return (
    <div className="whole-page">
      <h1>Cat Finder: Find Your Purrfect Match</h1>
      <button onClick={addToBanList(currentName)}>Name: {currentName}</button><br></br>
      <button onClick={addToBanList(currentHeight)}>Height: {currentHeight}</button><br></br>
      <button onClick={addToBanList(currentWeight)}>Weight: {currentWeight}</button><br></br>
        <img className="screenshot" src={currentImage ? currentImage.url : 'No current image!'} />
        <br></br>
        <button onClick={apiCall}>Meow!</button>
      <div className="ban-list">
        Ban List: {bannedAttributes}
      </div><br></br>
      <div className="history">
        History: {bannedAttributes}
      </div>
    </div>
  )
}

export default App