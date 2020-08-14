import React from "react";
import "./styles.css";
import whatssap from "../../assets/images/icons/whatsapp.svg";
import api from "../../services";

interface TeacherItemProps {
  dados: {
    id: number;
    subject: string;
    cost: number;
    user_id: number;
    primeiroNome: string;
    ultimoNome: string;
    avatar: string;
    whatsapp: string;
    bibliografia: string;
  };
}

const TeacherItem: React.FC<TeacherItemProps> = ({ dados }) => {


  function criarConexao() {
    api.post("/conection", {
      user_id: dados.user_id,
    });
  }

  
  return (
    <article className="teacher-item">
      <header>
        <img src={dados.avatar} alt="Logo Perfil" />

        <div>
          <strong>
            {dados.primeiroNome} {dados.ultimoNome}
          </strong>
          <span>{dados.subject}</span>
        </div>
      </header>

      <p>{dados.bibliografia}</p>

      <footer>
        <p>
          Preço/hora
          <strong>AOA {dados.cost}</strong>
        </p>

        <a href={`https://wa.me/${dados.whatsapp}`} onClick={criarConexao}>
          <img src={whatssap} alt="Ligar" />
          Entrar Em Contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
