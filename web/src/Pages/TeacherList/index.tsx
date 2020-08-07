import React, { useState, FormEvent } from 'react';
import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [Week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

   async function searchTeachers(e: FormEvent){
        e.preventDefault();

      const response = await api.get('classes',{
            params:{
                subject,
                Week_day,
                time,
            }
        });
        setTeachers(response.data);
    }
        return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Português', label: 'Português' },
                        { value: 'Geografia', label: 'Geografia' },
                        { value: 'Biologia', label: 'Biologiaes' },
                        { value: 'Quimica', label: 'Quimicas' },

                    ]}
                    onChange = {(e) => {setSubject(e.target.value)}}
                    value={subject}
                        name="subject"
                        label="Materia" />
                    <Select options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-Feira' },
                        { value: '2', label: 'Terça-Feira' },
                        { value: '3', label: 'Quarta-Feira' },
                        { value: '4', label: 'Quinta-Feira' },
                        { value: '5', label: 'Sexta-Feira' },
                        { value: '6', label: 'Sábado' },

                    ]}
                    onChange = {(e) => {setWeek_day(e.target.value)}}
                    value={Week_day}
                        name="Week_day"
                        label="Dia da semana" />


                    <Input value={time} name="time" 
                    onChange = {(e) => {setTime(e.target.value)
                    }}
                    label="Hora" type="time"/>

                    <button type='submit'> Buscar</button>
                </form>
            </PageHeader>

                <main>
                    {teachers.map((teacher: Teacher) =>{
                        return <TeacherItem key={teacher.id} teacher={teacher} />
                    })}
                    
                </main>
        </div>
    )
};

export default TeacherList;