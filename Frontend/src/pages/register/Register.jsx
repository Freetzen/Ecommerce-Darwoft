import style from './Register.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAsync } from '../../redux/authSlice';
import registerValidator from './registerValidator';

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const [userInfo, setUserInfo] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    });
    const [errors, setErrors] = useState({})
  
    const handleChange = (e) => {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value
      });
      
      setErrors(registerValidator({
        ...userInfo,
        [e.target.name]: e.target.value        
      }))
    };
  console.log('USUARIO',userInfo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validating = registerValidator(userInfo);
      if (Object.keys(validating).length) {
        return setErrors({
          firstname: validating.firstname,
          lastname: validating.lastname,
          email: validating.email,
          password: validating.password,
          notification: true,
        });
      }

      setErrors({
        ...errors,
        notification: false,
      });
      const registering = await dispatch(registerAsync(userInfo));
      if (registering.payload.success) return navigate("/");

      return setUserInfo({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    };
  
    return (
      <div className={style.prueba}>
        <div className={style.loginContainer}>
          <h2 className={style.h2Login}>SIGN IN</h2>
          <form onSubmit={handleSubmit} className={style.formLogin}>
            <label>Nombre</label>
            <input
              type="text"
              name="firstname"
              value={userInfo.firstname}
              onChange={handleChange}
            />
            {errors.notification && <p className={style.errors}>{errors.firstname}</p>}

            <label>Apellido</label>
            <input
              type="text"
              name="lastname"
              value={userInfo.lastname}
              onChange={handleChange}
            />
            {errors.notification && <p className={style.errors}>{errors.lastname}</p>}

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
            />
            {errors.notification && <p className={style.errors}>{errors.email}</p>}

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
            />
            {errors.notification && <p className={style.errors}>{errors.password}</p>}

            <button type="submit" className={style.buttonLogin}>
              Registrarse
            </button>
          </form>
        </div>
      </div>
    );
}

export default Register