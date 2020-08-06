import React from 'react';
import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponiveis.">
                <form id="search-teachers">
                <Select options= {[
                         {value:'Artes', label:'Artes'},
                         {value:'Português', label:'Português'},
                         {value:'Geografia', label:'Geografia'},
                         {value:'Biologia', label :'Biologiaes'},
                         {value:'Quimica',  label:'Quimicas'},
                                                
                     ]}
                      name="subject"
                       label="Materia"/>
                              <Select options= {[
                         {value:'0',  label:'Domingo'},
                         {value:'1', label:'Segunda-Feira'},
                         {value:'2', label:'Terça-Feira'},
                         {value:'3', label:'Quarta-Feira'},
                         {value:'4', label :'Quinta-Feira'},
                         {value:'5',  label:'Sexta-Feira'},
                         {value:'6',  label:'Sábado'},
                                                                         
                     ]}
                      name="week_day"
                       label="Dia da semana"/>
                </form>
            </PageHeader>

            <main>
         <TeacherItem/>
         <TeacherItem/>
         <TeacherItem/>
            </main>
        </div>
    )
}

export default TeacherList;