import { Button } from "@rmwc/button";
import { useState } from "react";

import axios from "axios";
import styles from "./Form.module.css";

import RoxContainer from "../services/rox/RoxContainer";
import service from "../services/rox/RoxService";
service(RoxContainer);

export const SuccessDonation = () => {
  /**
   * {@link registerForm} holds the state for the fields, and {@link setField} is the function
   * that updates these states whenever needed.
   */
  const [registerForm, setField] = useState({
    firstName: "",
    lastName: "",
    university: "",
    admisionYear: "",
    degree: "",
    tutorship: false,
    mentorship: false,
    volunteering: false,
  });

  /**
   * Handles changes in fields in the form.
   *
   * This function will update the state of the fields.
   * @param e the change event.
   */
  function handleChange(e: any) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setField({ ...registerForm, [e.target.name]: value });
  }

  /**
   * Validates and submits the registration form.
   * @param e the submit event.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/register`, registerForm);
    } catch (e) {
      console.log("An error occurred", e);
    }
  };

  return (
    <div>
      <h1>Doação concluída com sucesso!</h1>
      <p>
        Agradecemos por escolher fazer parte dessa iniciativa. Enviaremos também
        um email de confirmação da sua doação.
      </p>
      {RoxContainer.shouldShowRegistrationForm.getValue() ? (
        <div>
          <p>Finalize seu cadastro no nosso site</p>
          <form action="register" method="post" onSubmit={handleSubmit}>
            Nome: <input type="text" name="firstName" onChange={handleChange} />
            Sobrenome:{" "}
            <input type="text" name="lastName" onChange={handleChange} />
            Universidade:{" "}
            <input type="text" name="university" onChange={handleChange} />
            Curso: <input type="text" name="degree" onChange={handleChange} />
            Ano de entrada:{" "}
            <input type="text" name="admissionYear" onChange={handleChange} />
            Como deseja contribuir com o Reditus? <br />
            <input type="checkbox" name="tutorship" onChange={handleChange} />
            <label htmlFor="tutorship">Programas de tutoria de alunos</label>
            <br />
            <input type="checkbox" name="mentorship" onChange={handleChange} />
            <label htmlFor="mentorship">Programas de mentoria de equipes</label>
            <br />
            <input
              type="checkbox"
              name="volunteering"
              onChange={handleChange}
            />
            <label htmlFor="volunteering">Quero ser voluntário</label>
            <br />
            <Button
              type="submit"
              label="Finalizar"
              raised
              unelevated
              id={styles.defaultButton}
            />
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SuccessDonation;
