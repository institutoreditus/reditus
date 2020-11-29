import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default async function mail(to: string, userName: string) {
  if (
    process.env.HEROKU_APP_NAME &&
    !(
      process.env.HEROKU_APP_NAME in
      ["reditus-next-production", "reditus-next-staging"]
    )
  ) {
    // Emails are only sent in production and staging.
    return;
  }

  try {
    if (!to) {
      console.log("No target email defined.");
      return;
    }

    const email = process.env.MAILER_EMAIL;
    const pass = process.env.MAILER_PASS;

    if (!email || !pass) {
      console.log(
        "Mailing information not set. Credentials were not provided."
      );
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
    console.log("Error while sending email.");
  }
}
