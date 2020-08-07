import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
function TeacherForm() {

    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        {
            Week_day: 0,
            from: '',
            to: ''
        }
    ])
    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                Week_day: 0,
                from: '',
                to: ''
            }]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if (index == position) {
                return { ...scheduleItem, [field]: value };
            }
            return scheduleItem;
        });
        setScheduleItems(updateScheduleItem);
    }


    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('/classes', { name, avatar, whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems })
            .then(() => { alert("Cadastrado com sucesso"); 
        history.push('/');
        }).catch(() => { alert("Erro"); });
    }



    return (
        <div id="page-teacher-form" className="container">
            <PageHeader description='O primeiro passo é preencher este 
        formulário de inscrição'
                title="Que bom que você escolheu dar aulas" />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input name="name" label="Nome Completo" value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        <Input name="avatar" label="Avatar" value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }} />
                        <Input name="whatsapp" label="Whatsapp" value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }} />
                        <TextArea name="bio" label="Biografia" value={bio}
                            onChange={(e) => { setBio(e.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a Aula</legend>
                        <Select options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Biologia', label: 'Biologiaes' },
                            { value: 'Quimica', label: 'Quimicas' },

                        ]}
                            name="subject"
                            label="Materia"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }} />

                        <Input name="cost" label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }} />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários Disponiveis
                        <button type='button' onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.Week_day} className="schedule-item">
                                    <Select options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-Feira' },
                                        { value: '2', label: 'Terça-Feira' },
                                        { value: '3', label: 'Quarta-Feira' },
                                        { value: '4', label: 'Quinta-Feira' },
                                        { value: '5', label: 'Sexta-Feira' },
                                        { value: '6', label: 'Sábado' },

                                    ]}
                                        name="week_day"
                                        label="Dia da semana"
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        value={scheduleItem.Week_day} />


                                    <Input name="from" label="Das" type="time"
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        value={scheduleItem.from} />
                                    <Input name="to" label="Até as" type="time"
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        value={scheduleItem.to} />
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                    Importante! <br />
                    Preencha todos os dados.
                </p>
                        <button type="submit">Salvar Cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;