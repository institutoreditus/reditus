import { Typography } from "@rmwc/typography";
import { Button } from "@rmwc/button";
import { TextField } from "@rmwc/textfield";
import { Grid, GridCell } from "@rmwc/grid";
import { Drawer, DrawerContent } from "@rmwc/drawer";
import { Checkbox } from "@rmwc/checkbox";
import { NavigationButtons } from "./action_navigate/NavigationButtons";
import { useState } from "react";

import { SelectCollege } from "./action_selectCollege/SelectCollege";

import axios from "axios";
import styles from "./Form.module.css";

import RoxContainer from "../services/rox/RoxContainer";
import service from "../services/rox/RoxService";

service(RoxContainer);

export const SuccessDonation = (props: any) => {
  const [open, setOpen] = useState(false);
  const [signupFinish, setSignupFinish] = useState(false);
  /**
   * {@link registerForm} holds the state for the fields, and {@link setField} is the function
   * that updates these states whenever needed.
   */
  const [registerForm, setField] = useState({
    firstName: "",
    lastName: "",
    university: "",
    admissionYear: "",
    degree: "",
    tutorship: false,
    mentorship: false,
    volunteering: false,
  });

  /**
   * Handles changes in fields in the form.
   *
   * This function will update the state of the fields.
   * @param {any} e the change event.
   */
  function handleChange(e: any) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setField({ ...registerForm, [e.target.name]: value });
  }

  /**
   * Validates and submits the registration form.
   * @param {any} e the submit event.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("/api/registration", {
        ...registerForm,
        email: props.form.email,
      });
    } catch (e) {
      console.log("An error occurred", e);
    }
  };

  return (
    <div>
      {!open && !signupFinish ? (
        <>
          <h1>Doação concluída com sucesso!</h1>
          <p>
            Agradecemos por escolher fazer parte dessa iniciativa. Enviaremos
            também um email de confirmação da sua doação.
          </p>
          <h4>Você pode também finalizar seu cadastro no site!</h4>
          <p>Assim ficará por dentro ...</p>
          <Button
            label="Quero realizar meu cadastro!"
            onClick={() => setOpen(!open)}
            raised
            unelevated
            id={styles.defaultButton}
          />
        </>
      ) : null}

      {signupFinish ? (
        <>
          <NavigationButtons step={4} {...props} />
          <h1>Agora você também faz parte dessa corrente do bem!</h1>
          <Typography use="body1">
            Agradecemos por escolher fazer parte dessa iniciativa.
          </Typography>
        </>
      ) : null}

      {RoxContainer.shouldShowRegistrationForm.getValue() ? (
        <>
          <Drawer
            className={styles.modalUserRegistration}
            width="100%"
            dismissible
            open={open}
            onClose={() => setOpen(false)}
          >
            <DrawerContent
              className={styles.modalUserRegistration}
              dir="ltr"
              width="100%"
            >
              <form
                dir="ltr"
                action="registration"
                method="post"
                onSubmit={handleSubmit}
              >
                <TextField
                  dir="ltr"
                  fullwidth
                  label="Nome:"
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                />

                <TextField
                  dir="ltr"
                  fullwidth
                  label="Sobrenome:"
                  name="lastName"
                  type="text"
                  onChange={handleChange}
                />

                <SelectCollege name="university" onChange={handleChange} />

                <Grid>
                  <GridCell span={6}>
                    <TextField
                      fullwidth
                      label="Curso:"
                      name="degree"
                      type="text"
                      onChange={handleChange}
                    />
                  </GridCell>
                  <GridCell span={6}>
                    <TextField
                      fullwidth
                      label="Ano de entrada:"
                      name="admissionYear"
                      type="number"
                      min="0"
                      max="9999"
                      step="1"
                      pattern="^[0-9]"
                      maxLength={4}
                      onChange={handleChange}
                    />
                  </GridCell>
                </Grid>

                <GridCell className={styles.textLabel}>
                  <Typography use="body1">
                    Como deseja contribuir com o Reditus?
                  </Typography>
                </GridCell>

                <GridCell className={styles.checkboxGroup}>
                  <Checkbox
                    className={styles.checkbox}
                    label="Programas de tutoria de alunos"
                    type="checkbox"
                    name="tutorshipInterest"
                    onChange={handleChange}
                  />

                  <Checkbox
                    className={styles.checkbox}
                    label="Programas de metoria de equipes"
                    type="checkbox"
                    name="mentorshipInterest"
                    onChange={handleChange}
                  />

                  <Checkbox
                    className={styles.checkbox}
                    label="Quero ser voluntário"
                    type="checkbox"
                    name="volunteeringInterest"
                    onChange={handleChange}
                  />
                </GridCell>

                <Button
                  type="submit"
                  label="Finalizar cadastro"
                  raised
                  unelevated
                  onClick={() => {
                    setSignupFinish(!signupFinish);
                    setOpen(!open);
                  }}
                  id={styles.defaultButton}
                />
              </form>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SuccessDonation;
