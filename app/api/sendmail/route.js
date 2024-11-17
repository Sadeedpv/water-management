import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  let request = await req.json();
  let email = request.email;

  console.log("email: " + email);

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, // Office 365 often requires secure to be false for port 587
        auth: {
          user: "pvmohamad.2024@lpu.in",
          pass: "", // Replace with app-specific password
        },
      });
      const mailOption = {
        from: "pvmohamad.2024@lpu.in",
        to: email,
        subject: "Send Email Tutorial",
        html: `
        <h3>Hello Augustine</h3>
        <li> title: ${"You have hit your water limit"}</li>
        <li> message: ${"You have hit your water-limit"}</li> 
        `,
      };

      await transporter.sendMail(mailOption);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
      console.log(error);
    return NextResponse.json({ Mailerror: error });
  }
}
