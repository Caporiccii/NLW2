import React from 'react';
import './styles.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
function TeacherItem(){
    
        return(
        <article className="teacher-item">
        <header>
            <img src="https://scontent.fcgh39-1.fna.fbcdn.net/v/t1.0-9/81379711_765361653984175_4657391935109988352_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=HzjeQzN_q4cAX8v_uQk&_nc_ht=scontent.fcgh39-1.fna&oh=020f97b038c0f3dacc88631c78c3993d&oe=5F4DE8A3" alt="Marco Coelho"/>
     <div>
         <strong>Marco David</strong>
         <span>Fisica Aerodinâmica Espacial</span>
     </div>
        </header>
        <p>
            Eu sou zika demais, me contrata muito,
            <br/>
             posso te fazer voar!
        </p>
        <footer>
            <p>
                Preço/Hora 
                <strong>R$500.000.000</strong>
            </p>
            <button type="button">
                <img src={whatsappIcon} alt="Whatsapp"/>
                Entrar em contato.
            </button>
        </footer>
        </article>
         );
    
}

export default TeacherItem;