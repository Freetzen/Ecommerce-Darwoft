import style from "./Register.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAsync } from "../../redux/authSlice";
import registerValidator from "./registerValidator";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityResponse: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) navigate('/')
  }, [])

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });

    setErrors(
      registerValidator({
        ...userInfo,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validating = registerValidator(userInfo);
    if (Object.keys(validating).length) {
      return setErrors({
        firstname: validating.firstname,
        lastname: validating.lastname,
        email: validating.email,
        password: validating.password,
        securityQuestion: validating.securityQuestion,
        securityResponse: validating.securityResponse,
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
      securityQuestion: "",
      securityResponse: "",
    });
  };
  
  return (
    <div className={style.prueba}>
      <div className={style.loginContainer}>
        <h2 className={style.h2Login}>SIGN UP</h2>
        <form onSubmit={handleSubmit} className={style.formLogin}>
          <label>Nombre</label>
          <input
            type="text"
            name="firstname"
            value={userInfo.firstname}
            onChange={handleChange}
          />
          {errors.notification && (
            <p className={style.errors}>{errors.firstname}</p>
          )}

          <label>Apellido</label>
          <input
            type="text"
            name="lastname"
            value={userInfo.lastname}
            onChange={handleChange}
          />
          {errors.notification && (
            <p className={style.errors}>{errors.lastname}</p>
          )}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          {errors.notification && (
            <p className={style.errors}>{errors.email}</p>
          )}

          <label>Pregunta de Seguridad</label>
          <select
            id="securityQuestion"
            name="securityQuestion"
            onChange={handleChange}
          >
            <option value="">Elegir...</option>
            <option
              name="securityQuestion"
              value="¿Cuál es el nombre de tu mascota?"
            >
              ¿Cuál es el nombre de tu mascota?
            </option>
            <option
              name="securityQuestion"
              value="¿Cuál es tu comida favorita?"
            >
              ¿Cuál es tu comida favorita?
            </option>
            <option name="securityQuestion" value="¿En qué ciudad naciste?">
              ¿En qué ciudad naciste?
            </option>
            <option
              name="securityQuestion"
              value="¿Cuál es tu película favorita?"
            >
              ¿Cuál es tu película favorita?
            </option>
          </select>
          {errors.notification && (
            <p className={style.errors}>{errors.securityQuestion}</p>
          )}

          <label>Respuesta</label>
          <input
            type="text"
            name="securityResponse"
            value={userInfo.securityResponse}
            onChange={handleChange}
          />
          {errors.notification && (
            <p className={style.errors}>{errors.securityResponse}</p>
          )}

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
          {errors.notification && (
            <p className={style.errors}>{errors.password}</p>
          )}

          <button type="submit" className={style.buttonLogin}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
