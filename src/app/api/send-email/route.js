import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to Nolcha Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #141414; font-size: 32px; margin-bottom: 10px;">About Nolcha</h1>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <p style="font-size: 18px; line-height: 1.6; color: #333; margin: 0;">
              Partnering with leading brands and global blockchain, AI, and crypto conferences, Nolcha has 
              <strong style="font-weight: bold;">15+ years</strong> of shaping culture, tech, and community through high-impact experiential events.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Thank you for subscribing to our newsletter!
            </p>
            <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">
              You'll receive updates about our upcoming events and partnerships.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ message: 'Failed to send email' }, { status: 500 });
  }
}