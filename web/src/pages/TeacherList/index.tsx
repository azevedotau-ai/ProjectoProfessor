import React, { useState, FormEvent } from 'react';
import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input/';
import Select from '../../components/Select';
import api from '../../services';

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
  
  



function TeacherList() {

    const [subject,setSubject] = useState("");
    const [dia,setDiaSemana] = useState("");
    const [hora,setHora] = useState("");
    const [result, setResult] = useState([]);

    async function pesquisar(e:FormEvent) {
        e.preventDefault();
        
        const response = await api.get('classes',{
            params:{
                week_day:dia,
                subject,
                time:hora
            }
        });

        setResult(response.data);
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader titulo="Estes são os proffys disponíveis.">
                <form id="search-teacher" onSubmit={pesquisar}>
                <Select 
                        name="subject" 
                        label="Máteria" 
                        options={disciplinas}
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)}
                />

                <Select 
                        name="week-day" 
                        label="Dia de Semana" 
                        options={diasSemana}
                        value={dia}
                        onChange={(e)=>setDiaSemana(e.target.value)}
                />
                    
                   
                <Input 
                        type="time" 
                        name="horario" 
                        label="Hora"
                        value={hora}
                        onChange={(e)=>setHora(e.target.value)}
                />
                <button type="submit" >Pesquisar</button>
                </form>
            </PageHeader>

            <main>
              
              {result.map((el,index)=>{
                  return  <TeacherItem key={index} dados={el}/>
              })}
            
            </main>
        </div>
    )
};

export default TeacherList;