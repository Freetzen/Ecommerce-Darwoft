import style from './Login.module.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {loginAsync } from '../../redux/authSlice'
import loginValidator from './loginValidator'


const Login = () => {

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({})

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });

    setErrors(loginValidator({
      ...userInfo,
      [e.target.name]: e.target.value
    }))
  };

  const submitLogin = async () => {
    
    const validating = loginValidator(userInfo)
    if(Object.keys(validating).length){
      return setErrors({
        email: validating.email,
        password: validating.password,
        notification: true
      })
    }

    setErrors({
      ...errors,
      notification: false
    })
    const dis = await dispatch(loginAsync(userInfo));
    if (dis.payload.success) return navigate("/");
    return setUserInfo({
      email: "",
      password: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className={style.prueba}>
      <div className={style.loginContainer}>
        <div>
        <h2 className={style.h2Login}>SIGN IN</h2>
        <form onSubmit={handleSubmit} className={style.formLogin}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          {errors.notification && <p className={style.errors}>{errors.email}</p>}

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
          {errors.notification && <p className={style.errors}>{errors.password}</p>}

          <button type="submit" className={style.buttonLogin} >
            Iniciar sesión
          </button>
        </form>
        <Link to="/restore-password" className={style.forgotPassword}>
          Olvidé mi contraseña
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Login