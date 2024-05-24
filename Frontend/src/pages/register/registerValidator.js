
const registerValidator = (input) => {
    const regexEmail = /\S+@\S+\.\S+/;
    const regexPassword = new RegExp('[0-9]')
    const errors = {};
  
      //FIRSTNAME
      if(!input.firstname.trim().length) errors.firstname = 'Ingrese un nombre'
      if (!isNaN(input.firstname)) errors.firstname = 'El nombre no puede ser un número';
      else{
          if(input.firstname.length < 3) errors.firstname = 'Ingrese su nombre correctamente'
      }

      //LASTNAME
      if(!input.lastname.trim().length) errors.lastname = 'Ingrese un apellido'
      if (!isNaN(input.lastname)) errors.lastname = 'El nombre no puede ser un número';

      //PREGUNTA DE SEGURIDAD
      if(!input.securityQuestion.trim().length) errors.securityQuestion = 'Seleccione una pregunta de seguridad'

      //RESPUESTA DE SEGURIDAD
      if(!input.securityResponse.trim().length) errors.securityResponse = 'Ingrese su respuesta de seguridad'

      //EMAIL
      if(!input.email.trim().length) errors.email = 'Ingrese un email'
      else{
          if(!regexEmail.test(input.email)) errors.email = 'Ingrese un email válido'
          if(input.email.length > 35) errors.email = 'Ingrese un email menor de 35 caracteres'
      }
      
      //PASSWORD
      if(!input.password.trim().length) errors.password = 'Ingrese una contraseña'
      else{
          if(!regexPassword.test(input.password)) errors.password = 'Debe contener al menos un número'
          if(input.password.length < 6) errors.password = 'Al menos 6 caracteres'
          if(input.password.length > 15) errors.password = 'Máximo 15 caracteres'
      }
  
  
  
    return errors;
};

export default registerValidator