import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const email: string = process.env.MAILER_EMAIL || "";
const pass: string = process.env.MAILER_PASS || "";
const service: string = process.env.MAILER_SERVICE || "mailhog";

/**
 * Validates current environment and configs.
 *
 * @return {boolean} true if configs are valid; false otherwise.
 */
function hasValidConfigs(): boolean {
  const env = process.env.HEROKU_APP_NAME;

  if (env === undefined) {
    return false;
  }

  if (!email || !pass) {
    console.log("Mailing information not set. Credentials were not provided.");
    return false;
  }

  return true;
}

/**
 * Sends an email to pre-defined recipients alerting them that a
 * some action was attempted in production, but was unsuccessful.
 *
 * @param {string} userEmail Email for the user that unsuccessfully attempted to donate/register.
 * @param {string} error Error information.
 */
export async function mailError(userEmail: string, error: any) {
  if (!hasValidConfigs()) {
    return;
  }

  try {
    if (!userEmail) {
      console.log("No user email defined.");
      return;
    }

    const recipients = process.env.PRODUCTION_FAILURE_MAIL_RECIPIENTS;

    if (!recipients) {
      console.log("No recipient emails registered.");
      return;
    }

    const transporter = buildMailTransport();

    const mailOptions = {
      from: email,
      to: recipients.split(";"),
      subject: "Falha em contribuição para o Reditus!",
      text: `Usuário ${userEmail} tentou contribuir pelo site, mas sem sucesso. \n Erro: ${error}.`,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(`Error sending email: ${error}, info: ${info ? info : ""}`);
      }
    });
  } catch (err) {
    console.log(`Error while sending error email: ${err}`);
  }
}

/**
 * Sends a confirmation email to the donating user after a successful contribution was made.
 *
 * @param {string} to Email of the user.
 * @param {string} userName Name of the user.
 */
export default async function mail(to: string, userName: string) {
  if (!hasValidConfigs()) {
    return;
  }

  try {
    if (!to) {
      console.log("No target email defined.");
      return;
    }

    ejs.renderFile(
      path.join(serverRuntimeConfig.PROJECT_ROOT, "./helpers/template.ejs"),
      { name: userName },
      (err: any, html: string) => {
        if (err) throw err;
        const transporter = buildMailTransport();

        const mailOptions = {
          from: email,
          to: to,
          subject: "A comunidade Reditus agradece a sua contribuição!",
          html: html,
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
          if (error) {
            console.log(
              `Error sending email: ${error}, info: ${info ? info : ""}`
            );
          } else {
            console.log("Confirmation email sent to " + to);
          }
        });
      }
    );
  } catch (err) {
    console.log(`Error while sending error email: ${err}`);
  }
}

function buildMailTransport() {
  const auth = {
    user: email,
    pass: pass,
  };

  return nodemailer.createTransport({
    ...getServiceOptions(service),
    auth,
  });
}

/**
 * Get the nodemailer options based on configured service.
 *
 * This is used to switch between gmail for production and SMTP (to mailhog) in local development.
 *
 * @param {string} service The service being used currently.
 * @return {object} The options for nodemailer
 */
function getServiceOptions(service: string) {
  if (service !== "mailhog") return { service };

  return {
    host: "localhost",
    port: 1025,
  };
}
