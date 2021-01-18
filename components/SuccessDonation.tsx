import { Typography } from "@rmwc/typography";
import { Button } from "@rmwc/button";
import { Grid, GridCell } from "@rmwc/grid";
import { Checkbox } from "@rmwc/checkbox";
import { Dispatch, SetStateAction, useState } from "react";

import { collegeData } from "./datasets/collegeData";
import { graduationCourseData } from "./datasets/graduationCourseData";

import { Autocomplete } from "@material-ui/lab";
import {
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { red, blueGrey } from "@material-ui/core/colors";

import axios from "axios";
import styles from "./Form.module.css";

import RoxContainer from "../services/rox/RoxContainer";
import service from "../services/rox/RoxService";

service(RoxContainer);

function yearList() {
  const year = new Date().getFullYear();
  const range = 89;
  return Array.from(new Array(90), (_v, i) => year - range + i).reverse();
}

/**
 * Checks whether a string is null, empty or whitespace-only.
 *
 * @param {string} s a string to be validated.
 * @return {boolean} true if any of the above; false otherwise.
 */
function isNullOrWhitespace(s: string): boolean {
  return s == null || s.trim() == "";
}

/**
 * Theme to be used with Material UI componenets.
 *
 * TODO(jonatasteixeira): Once RMWC is removed,
 * this should be the default theme to be used across the application.
 *
 * @return {Theme} returns a theme which is consistent to the rest of the site.
 */
const reditusTheme = () =>
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#00d4ff",
        light: blueGrey[100],
      },
      secondary: {
        main: "#000",
      },
      error: {
        main: red.A400,
      },
      background: {
        default: "#fff",
      },
    },
    typography: {
      fontFamily: [
        "'Open Sans'",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    overrides: {
      MuiIconButton: {
        root: {
          padding: 0,
          marginTop: "-5px !important",
        },
      },
      MuiInputLabel: {
        root: {
          fontWeight: 400,
        },
        formControl: {
          transform: "translate(0px, 0px) scale(1)",
        },
      },
    },
  });

export const SuccessDonation = (props: any) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupFinish, setSignupFinish] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorDegree, setErrorDegree] = useState(false);
  const [errorUniversity, setErrorUniversity] = useState(false);
  const [errorAdmissionYear, setErrorAdmissionYear] = useState(false);

  const isUserAlreadyRegistered = () => props.form.userExists;

  const stateFuncs: { [Key: string]: Dispatch<SetStateAction<boolean>> } = {
    firstName: setErrorFirstName,
    lastName: setErrorLastName,
    university: setErrorUniversity,
    admissionYear: setErrorAdmissionYear,
    degree: setErrorDegree,
  };

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

  function validateInputs(): boolean {
    let valid = true;

    if (isNullOrWhitespace(registerForm.firstName)) {
      setErrorFirstName(true);
      valid = false;
    }
    if (isNullOrWhitespace(registerForm.lastName)) {
      setErrorLastName(true);
      valid = false;
    }
    if (isNullOrWhitespace(registerForm.university)) {
      setErrorUniversity(true);
      valid = false;
    }
    if (isNullOrWhitespace(registerForm.admissionYear)) {
      setErrorAdmissionYear(true);
      valid = false;
    }
    if (isNullOrWhitespace(registerForm.degree)) {
      setErrorDegree(true);
      valid = false;
    }
    return valid;
  }

  /**
   * Handles changes in fields in the form.
   *
   * This function will update the state of the fields.
   * @param {any} e the change event.
   */
  function handleCheckboxChange(e: any) {
    setField({ ...registerForm, [e.target.name]: e.target.checked });
  }

  /**
   * Handles changes in autocomplete fields in the form.
   *
   * This function will update the state of the fields.
   * @param {key} key key of the state being changed.
   * @param {string} value the new value of the input.
   * @param {string} reason the reason of the change. Can be: "input" (user input), "reset" (programmatic change), "clear"
   */
  function handleAutocompleteChange(
    key: string,
    value: string,
    reason: string
  ) {
    if (reason == "reset") {
      setField({ ...registerForm, [key]: value });
      const resetFunction = stateFuncs[key];
      if (resetFunction) {
        resetFunction(false);
      }
    }
  }

  /**
   * Handles changes in fields in the form.
   *
   * This function will update the state of the fields.
   * @param {any} e the change event.
   */
  function handleTextInputChange(e: any) {
    setField({ ...registerForm, [e.target.name]: e.target.value });
    const resetFunction = stateFuncs[e.target.name];
    if (resetFunction) {
      resetFunction(false);
    }
  }

  /**
   * Validates and submits the registration form.
   * @param {any} e the submit event.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    setLoading(true);

    try {
      await axios.post("/api/registration", {
        ...registerForm,
        email: props.form.email,
      });
      setSignupFinish(true);
      setOpen(false);
    } catch (e) {
      const message = e.response?.data?.message;
      if (message) {
        alert(message);
      } else {
        alert(
          "Ops! Algum erro ocorreu. Tente finalizar seu cadastro mais tarde !"
        );
      }
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={reditusTheme()}>
      <div>
        {!open && !signupFinish ? (
          <>
            <h1>Doação concluída com sucesso!</h1>
            <p>
              Agradecemos por escolher fazer parte dessa iniciativa. Enviaremos
              também um email de confirmação da sua doação.
            </p>

            {RoxContainer.shouldShowRegistrationForm.getValue() &&
              !isUserAlreadyRegistered() && (
                <>
                  <h4>Finalize seu cadastro no site!</h4>
                  <Button
                    label="Quero realizar meu cadastro!"
                    onClick={() => setOpen(!open)}
                    raised
                    unelevated
                    id={styles.defaultButton}
                  />
                </>
              )}
          </>
        ) : null}

        {signupFinish ? (
          <>
            {/* <NavigationButtons step={4} {...props} /> */}
            <h1>
              Obrigado! Agora você também faz parte dessa corrente do bem!
            </h1>
            <Typography use="body1">
              Agradecemos por escolher fazer parte dessa iniciativa.
            </Typography>
          </>
        ) : null}

        {open ? (
          <>
            <form
              dir="ltr"
              action="registration"
              method="post"
              onSubmit={handleSubmit}
            >
              <FormControl error={errorFirstName} fullWidth={true}>
                <TextField
                  id="first-name"
                  dir="ltr"
                  fullWidth={true}
                  style={{ paddingTop: "6px" }}
                  label="Nome:"
                  name="firstName"
                  type="text"
                  onChange={handleTextInputChange}
                />
                {errorFirstName && (
                  <FormHelperText id="first-name-component-error-text">
                    Nome inválido
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl error={errorLastName} fullWidth={true}>
                <TextField
                  dir="ltr"
                  fullWidth={true}
                  style={{ paddingTop: "6px" }}
                  label="Sobrenome:"
                  name="lastName"
                  type="text"
                  onChange={handleTextInputChange}
                />
                {errorLastName && (
                  <FormHelperText id="last-name-component-error-text">
                    Sobrenome inválido
                  </FormHelperText>
                )}
              </FormControl>

              <Grid>
                <GridCell span={6}>
                  <FormControl error={errorDegree} fullWidth={true}>
                    <Autocomplete
                      id="degree"
                      options={graduationCourseData}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          style={{ paddingTop: "6px" }}
                          label="Curso"
                        />
                      )}
                      onInputChange={(_e, v, r) =>
                        handleAutocompleteChange("degree", v, r)
                      }
                    />
                    {errorDegree && (
                      <FormHelperText id="degree-component-error-text">
                        Curso inválido
                      </FormHelperText>
                    )}
                  </FormControl>
                </GridCell>
                <GridCell span={6}>
                  <FormControl error={errorAdmissionYear} fullWidth={true}>
                    <Autocomplete
                      id="admissionYear"
                      options={yearList()}
                      getOptionLabel={(option) => `${option}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          style={{ paddingTop: "6px" }}
                          label="Ano de entrada:"
                        />
                      )}
                      onInputChange={(_e, v, r) =>
                        handleAutocompleteChange("admissionYear", v, r)
                      }
                    />
                    {errorAdmissionYear && (
                      <FormHelperText id="admission-year-component-error-text">
                        Ano de admissão inválido
                      </FormHelperText>
                    )}
                  </FormControl>
                </GridCell>
              </Grid>

              <FormControl error={errorUniversity} fullWidth={true}>
                <Autocomplete
                  id="uni"
                  options={collegeData}
                  getOptionLabel={(option) =>
                    `(${option.name}) ${option.label}`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ paddingTop: "6px" }}
                      label="Universidade"
                    />
                  )}
                  onInputChange={(_e, v, r) =>
                    handleAutocompleteChange("university", v, r)
                  }
                />
                {errorUniversity && (
                  <FormHelperText id="university-component-error-text">
                    Univrsidade inválida
                  </FormHelperText>
                )}
              </FormControl>

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
                  onChange={handleCheckboxChange}
                />

                <Checkbox
                  className={styles.checkbox}
                  label="Programas de metoria de equipes"
                  type="checkbox"
                  name="mentorshipInterest"
                  onChange={handleCheckboxChange}
                />

                <Checkbox
                  className={styles.checkbox}
                  label="Quero ser voluntário"
                  type="checkbox"
                  name="volunteeringInterest"
                  onChange={handleCheckboxChange}
                />
              </GridCell>

              <Button
                type="submit"
                label="Finalizar cadastro"
                raised
                unelevated
                disabled={loading}
                id={styles.defaultButton}
              />
              {loading && <LinearProgress />}
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </ThemeProvider>
  );
};

export default SuccessDonation;
