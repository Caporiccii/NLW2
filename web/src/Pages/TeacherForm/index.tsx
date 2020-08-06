import React, {useState} from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
function TeacherForm() {

    const [scheduleItems, setScheduleItems]  = useState( [
        {  week_day: 0,
            from: '',
            to:''
          }
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
          {  week_day: 0,
            from: '',
            to:''
          }]);
       }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader description='O primeiro passo é preencher este 
        formulário de inscrição'
                title="Que bom que você escolheu dar aulas" />

            <main>
                <fieldset>
                    <legend>Seus Dados</legend>
                    <Input name="name" label="Nome Completo" />
                    <Input name="avatar" label="Avatar" />
                    <Input name="whatsapp" label="Whatsapp" />
                    <TextArea name="bio" label="Biografia" />
                </fieldset>

                <fieldset>
                    <legend>Sobre a Aula</legend>


                    <Input name="cost" label="Custo da sua hora por aula" />
                </fieldset>
                <fieldset>
                    <legend>
                        Horários Disponiveis
                        <button type='button' onClick={addNewScheduleItem}>+ Novo horário</button>
                    </legend>
                    {scheduleItems.map(scheduleItem => {
                        return (
                            <div key={scheduleItem.week_day} className="schedule-item">
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
                                    label="Dia da semana" />
                                <Input name="from" label="Das" type="time" />
                                <Input name="to" label="Até as" type="time" />
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
                    <button type="button">Salvar Cadastro</button>
                </footer>

            </main>
        </div>
    )
}

export default TeacherForm;