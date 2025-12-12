import nodemailer, { Transporter, SentMessageInfo } from "nodemailer";

const mailSender = async (
  email: string,
  title: string,
  body: string
): Promise<SentMessageInfo | void> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info: SentMessageInfo = await transporter.sendMail({
      from: "YuvaX",
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error: any) {
    console.error(error.message);
  }
};

export default mailSender;
