import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  let request = await req.json();
  let email = request.email;
  let modelname = request.model;
  let total = request.total;
  let limit = request.limit;

  console.log("email: " + email);

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, // Office 365 often requires secure to be false for port 587
        auth: {
          user: "pvmohamad.2024@lpu.in",
          pass: process.env.EMAIL_PASSWORD, // Replace with app-specific password
        },
      });
      const mailOption = {
        from: "pvmohamad.2024@lpu.in",
        to: email,
        subject: "You have exceeded your maximum water limit for today!",
        html: `
        <h3>Hello ${email}</h3>
        <h4> You have hit your water limit for ${modelname}</h4>
        <h4> You have hit your water-limit of ${limit} litres, 
        You have used ${total - limit} litres more than permitted!!!</h4> 
        `,
      };

      await transporter.sendMail(mailOption);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
      console.log(error);
    return NextResponse.json({ Mailerror: error });
  }
}
