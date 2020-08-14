import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input/";
import "./styles.css";
import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/TextArea";
import Select from "../../components/Select";
import api from "../../services";


const diasSemana = [
  { value: "0", label: "Segunda-Feira" },
  { value: "1", label: "Terça-Feira" },
  { value: "2", label: "Quarta-Feira" },
  { value: "3", label: "Quinta-Feira" },
  { value: "4", label: "Sexta-Feira" },
  { value: "5", label: "Sábado" },
  { value: "6", label: "Domingo" },
];

const disciplinas = [
  { value: "Artes", label: "Artes" },
  { value: "Química", label: "Química" },
  { value: "Fisica", label: "Física" },
  { value: "Programação", label: "Programação" },
  { value: "Matemática", label: "Matemática" },
  { value: "Direito", label: "Direito" },
  { value: "História", label: "História" },
  { value: "Mecânica", label: "Mecânica" },
  { value: "Algebra", label: "Algebra" },
];



function TeacherForm() {
  const [pNome,setPNome] = useState("");
  const [uNome,setUNome] = useState("");
  const [avatar,setAvatar] = useState("");
  const [whatssap,setWhatssap] = useState("");
  const [bio,setBio] = useState("");

  const [subject,setSubject] = useState("");
  const [cost,setCost] = useState("");

  const [schandulesItems, setSchandulesItems] = useState([{ week_day: 0,  from: "",to: "",}]);

  const history = useHistory();

  function addSchalesItems() {
    setSchandulesItems([
      ...schandulesItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }


  function criarClasse(e: FormEvent) {
    e.preventDefault();

    api.post('classes',{
      primeiroNome: pNome,
      ultimoNome: uNome,
      avatar,
      whatssap,
      bibliografia: bio,
      subject,
      cost:Number(cost),
      schadule: schandulesItems

    }).then(()=>{
      alert("Cadastro Realizado Com Sucesso");
      history.push('/');
    }).catch((e)=>{
      alert('Erro Cadastro Não Feito');
    })
    
    
  }

  function setSchandulesItemValue(index: number, field: string, valor: string) {
    const newArray = schandulesItems.map((el, indice)=>{
      if(indice === index){
        return {...el, [field]: valor};
      }
      return el;
    });

    setSchandulesItems(newArray);
  }


  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        titulo="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={criarClasse}>
        <fieldset>
          <legend>Seus Dados</legend>
          <Input 
                name="pNome" 
                label="Primeiro Nome" 
                value={pNome} 
                onChange={(e)=> setPNome(e.target.value)} 
          />

          <Input 
                name="uNome" 
                label="Ultimo Nome"
                value={uNome}
                onChange={(e)=>setUNome(e.target.value)} 
          />

          <Input 
                name="avatar" 
                label="Avatar"
                value={avatar}
                onChange={(e)=>setAvatar(e.target.value)} 
          />

          <Input 
                name="whatssap" 
                label="WhatsApp"
                value={whatssap}
                onChange={(e)=>setWhatssap(e.target.value)} 
          />

          <Textarea 
                  name="bio" 
                  label="Biográfia"
                  value={bio}
                  onChange={(e)=>setBio(e.target.value)} 
          />
        </fieldset>
        <fieldset>
          <legend>Sobre a aula</legend>
          <Select
            name="subject"
            label="Máteria"
            options={disciplinas}
            value={subject}
            onChange={(e)=>setSubject(e.target.value)}
          />
          <Input 
                name="cost" 
                label="Custo Por Aula" 
                value={cost}
                onChange={(e)=>setCost(e.target.value)}      
          />
        </fieldset>
        <fieldset>
          <legend>
            Horários disponiveis
            <button type="button" onClick={addSchalesItems}>
              {" "}
              + Novo Horário
            </button>
          </legend>
          {schandulesItems.map((el,index) => {
            return (
              <div key={el.week_day} className="schadule-item">
                <Select
                  name="week-day"
                  label="Dia de Semana"
                  value={el.week_day}
                  options={diasSemana}
                  onChange={e=>setSchandulesItemValue(index, 'week_day',e.target.value)}
                />

                <Input 
                      type="time" 
                      name="from" 
                      label="Das"
                      value={el.from}
                      onChange={e=>setSchandulesItemValue(index, 'from',e.target.value)}
                />

                <Input 
                       type="time" 
                       name="to" 
                       label="Até"
                       value={el.to}
                       onChange={e=>setSchandulesItemValue(index, 'to',e.target.value)}
                />
              </div>
            );
          })}
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso Importante" />
            Inportante! <br />
            Preencha Todos os Dados
          </p>
          <button type="submit" >Salvar Cadastro</button>
        </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
///ODIAG.zip