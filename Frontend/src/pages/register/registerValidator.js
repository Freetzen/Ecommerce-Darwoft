
const registerValidator = (input) => {
    const regexEmail = /\S+@\S+\.\S+/;
    const regexPassword = new RegExp('[0-9]')
    const errors = {};
  
      //FIRSTNAME
      if(!input.firstname.trim().length) errors.firstname = 'Ingrese un nombre'
      else{
          if(input.firstname.length < 3) errors.firstname = 'Ingrese su nombre correctamente'
      }

      //LASTNAME
      if(!input.lastname.trim().length) errors.lastname = 'Ingrese un apellido'
      else{
          if(input.lastname.length < 3) errors.lastname = 'Ingrese su apellido correctamente'
      }

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
          if(input.password.length > 10) errors.password = 'Máximo 10 caracteres'
      }
  
  
  
    return errors;
};

export default registerValidator