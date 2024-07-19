import nodemailer from "nodemailer";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function getAccessToken(): Promise<string> {
  const { token } = await oAuth2Client.getAccessToken();
  if (!token) throw new Error("Failed to obtain access token");
  return token;
}

export const sendReferralEmail = async (
  refereeEmail: string,
  referrerName: string,
  refereeName: string,
  course: string
) => {
  try {
    const accessToken = await getAccessToken();

    const transportOptions: SMTPTransport.Options = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    };

    const transporter = nodemailer.createTransport(transportOptions);

    const mailOptions = {
      from: "Harsh Yadav <harsh@harsh.com>",
      to: refereeEmail,
      subject: "You have been referred to a course",
      text: `Hi ${refereeName},\n\n${referrerName} has referred you to the course: ${course}.\n\nBest Regards,\nYour Team`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};