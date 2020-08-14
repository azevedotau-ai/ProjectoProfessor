import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import landingImage from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClasseIcon from "../../assets/images/icons/give-classes.svg";
import totalIcon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";
import api from "../../services";

function Landing() {
  const [totalConection, setTotalConection] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("conection").then((response) => {
      const total = response.data.total;
      setTotalConection(total);

      if(totalConection <= 1){
        setMsg(" Conexão Já Realizada")
      }else{
          setMsg("Conexões Já Realizadas")
      }
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="landing-page-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={landingImage}
          alt="Plataforma de Estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClasseIcon} alt="Dar Aulas" />
            Dar Aulas
          </Link>
        </div>

        <span className="total-conections">
          Total De {totalConection} {msg} 
          <img src={totalIcon} alt="Conexões" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
