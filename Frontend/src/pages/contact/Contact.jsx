import style from './Contact.module.css'
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Contact = () => {

    const navigate = useNavigate()

  const [state, handleSubmit] = useForm("xrgndrnk");
  if (state.succeeded) {
       Swal.fire({
        position: "center",
        icon: "success",
        title: `Gracias por ponerte en contacto con nostros!`,
        showConfirmButton: false,
        timer: 2000,
      });;
      return navigate('/')
  }
  return (
    <div className={style.prueba}>
        <div className={style.loginContainer}>
        <h2 className={style.h2Login}>CONTACTO</h2>
        <form onSubmit={handleSubmit} className={style.formLogin}>
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <textarea
        id="message"
        name="message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
        </div>
    </div>
  );
}

export default Contact