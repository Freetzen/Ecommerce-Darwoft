import { useState } from "react";
import style from "./RestorePassword.module.css";
import userProvider from "../../utils/userProvider/userProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RestorePassword = () => {
  const navigate = useNavigate();

  const [restore, setRestore] = useState({
    step: 1,
    email: "",
    securityQuestion: "",
    securityResponse: "",
    password: "",
  });

  const handleChange = (e) => {
    setRestore({
      ...restore,
      [e.target.name]: e.target.value,
    });
  };
  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const send = await userProvider.restorePassword(restore);
      switch (restore.step) {
        case 1:
          if (send.data.success) {
            setRestore({
              ...restore,
              step: 2,
              securityQuestion: send.data.securityQuestion,
              id: send.data.id,
            });
          } else {
            showErrorAlert(send.data.message);
          }
          break;
        case 2:
          if (send.data.success) {
            setRestore({
              ...restore,
              step: 3,
              password: "",
            });
          } else {
            showErrorAlert(send.data.message);
          }
          break;
        case 3:
          if (send.data.success) {
            showSuccessAlert(send.data.message);
            navigate("/login");
          } else {
            showErrorAlert(send.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <div className={style.containerResetPassword}>
      {restore.step === 1 ? (
        <div className={style.loginContainer}>
          <label>Ingrese su Email:</label>
          <input
            type="email"
            name="email"
            value={restore.email}
            onChange={handleChange}
          />
          <button onClick={handleSendEmail}>Enviar</button>
        </div>
      ) : restore.step === 2 ? (
        <div className={style.loginContainer}>
          <label>{restore.securityQuestion}</label>
          <input
            type="text"
            name="securityResponse"
            value={restore.securityResponse}
            onChange={handleChange}
          />
          <button onClick={handleSendEmail}>Enviar</button>
        </div>
      ) : restore.step === 3 ? (
        <div className={style.loginContainer}>
          <label>Ingrese una contraseña nueva</label>
          <input
            type="password"
            name="password"
            value={restore.password}
            onChange={handleChange}
          />
          <button onClick={handleSendEmail}>Cambiar</button>
        </div>
      ) : null}
    </div>
  );
};

export default RestorePassword;
