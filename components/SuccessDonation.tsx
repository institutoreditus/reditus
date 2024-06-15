import { Button } from "@rmwc/button";
import { Dispatch, SetStateAction, useContext, useState } from "react";

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
import { red } from "@material-ui/core/colors";

import axios from "axios";
import styles from "./Form.module.css";

import RoxContainer from "../services/rox/RoxContainer";
import service from "../services/rox/RoxService";
import { DonationContext } from "./contexts/DonationContext";

service(RoxContainer);

function createYearList(): Array<number> {
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

export const SuccessDonation = () => {
  const donation = useContext(DonationContext);

  const [loading, setLoading] = useState(false);
  const [signupFinish, setSignupFinish] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorDegree, setErrorDegree] = useState(false);
  const [errorAdmissionYear, setErrorAdmissionYear] = useState(false);
  const [errorUrl, setErrorUrl] = useState(false);

  const isUserAlreadyRegistered = () => donation.userExists.value;
  const registrationFlagEnabled = () =>
    JSON.parse(RoxContainer.shouldShowRegistrationForm.getValue());

  const yearsList = createYearList();

  const stateFuncs: { [Key: string]: Dispatch<SetStateAction<boolean>> } = {
    firstName: setErrorFirstName,
    lastName: setErrorLastName,
    admissionYear: setErrorAdmissionYear,
    degree: setErrorDegree,
    url: setErrorUrl,
  };

  /**
   * {@link registerForm} holds the state for the fields, and {@link setField} is the function
   * that updates these states whenever needed.
   */
  const [registerForm, setField] = useState({
    firstName: "",
    lastName: "",
    admissionYear: "",
    degree: "",
    url: "",
    // disabled fields
    university: "UFRJ",
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

    if (reason == "input") {
      if (key == "admissionYear" && yearsList.indexOf(+value) > -1) {
        setField({ ...registerForm, [key]: value });
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
        email: donation.email.value,
        dob: donation.birthday.value,
      });
      setSignupFinish(true);
    } catch (e) {
      const err = e as any;
      const message = err.response?.data?.message;
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
        <>
          <h1>Muito obrigado!</h1>
          <p>Agradecemos por escolher fazer parte dessa iniciativa.</p>
          <p>Enviaremos também um email de confirmando sua doação.</p>
          {registrationFlagEnabled() && !isUserAlreadyRegistered() ? (
            <>
              <p>
                Conclua o seu cadastro para somar pontos à sua turma no Ranking
                de Turmas!
              </p>

              <form
                dir="ltr"
                action="registration"
                method="post"
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.30)",
                  padding: "20px",
                  borderRadius: "10px",
                  marginTop: "20px",
                  gap: "40px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControl error={errorFirstName} fullWidth={true}>
                  <TextField
                    id="first-name"
                    dir="ltr"
                    fullWidth={true}
                    style={{ paddingTop: "6px" }}
                    label="Nome"
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
                    label="Sobrenome"
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

                <FormControl error={errorAdmissionYear} fullWidth={true}>
                  <Autocomplete
                    id="admissionYear"
                    options={yearsList}
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

                <FormControl error={errorUrl} fullWidth={true}>
                  <TextField
                    id="url"
                    dir="ltr"
                    fullWidth={true}
                    style={{ paddingTop: "6px" }}
                    label="Site (LinkedIn):"
                    name="url"
                    type="text"
                    onChange={handleTextInputChange}
                  />
                  {errorUrl && (
                    <FormHelperText id="url-component-error-text">
                      Link inválido
                    </FormHelperText>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  label="Finalizar cadastro"
                  raised
                  unelevated
                  disabled={loading}
                  id={styles.defaultButton}
                  style={{ marginTop: "20px" }}
                />
                {loading && <LinearProgress color="primary" />}
              </form>
            </>
          ) : (
            <>
              <Button
                label="Voltar ao site do Reditus"
                raised
                unelevated
                onClick={() =>
                  (window.location.href = "https://reditus.org.br")
                }
                id={styles.defaultButton}
              />
            </>
          )}
        </>
      </div>
    </ThemeProvider>
  );
};

export default SuccessDonation;
