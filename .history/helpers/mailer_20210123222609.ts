import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const email: string = process.env.MAILER_EMAIL || "";
const pass: string = process.env.MAILER_PASS || "";
 
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

  if (["reditus-next-production", "reditus-next-staging"].indexOf(env) == -1) {
    console.log(
      `Emails are only sent in production and staging. Currently in ${process.env.HEROKU_APP_NAME}`
    );
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
 * contribution attempt was made in production, but was unsuccessful.
 *
 * @param {string} userEmail Email for the user that unsuccessfully attempted to donate.
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: pass,
      },
    });

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
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: email,
            pass: pass,
          },
        });

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
