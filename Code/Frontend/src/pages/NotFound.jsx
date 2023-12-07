import React from 'react';
import UnderConstruction from "../../src/assets/UnderConstruction.gif";
import Header from "../../src/Header";
import { useNavigate } from 'react-router-dom';
import '../css/NotFound.css';

export default function NotFound() {

  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate('/');
  };


  return (
    <>
    <Header />
    <div class="notFoundDiv">
      <p class="notFoundHeader">Sorry, the page you're looking for is under construction.</p>
      <div class="notFoundImgDiv">
       <img class="notFoundImage" src={UnderConstruction} />
      </div>
      <div class="notFoundButtonDiv">
       <button class="notFoundButton" onClick={handleReturnClick}>Return</button>
      </div>
    </div>
    </>
  );
};

