import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        // Send email using Resend
        // NOTE: You need to verify a domain in Resend to send to external emails
        // For now, using onboarding@resend.dev which has limitations
        // To send to contacto@zonodev.ar, you need to:
        // 1. Add and verify your domain in Resend dashboard
        // 2. Update the 'from' field to use your verified domain
        const data = await resend.emails.send({
            from: 'Aera <onboarding@resend.dev>', // Using Resend's test domain
            to: 'contacto@zonodev.ar', // Now using the verified account email
            subject: 'Nuevo mensaje desde Aera',
            replyTo: email,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nuevo mensaje desde Aera</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${company ? `<p style="margin: 10px 0;"><strong>Empresa:</strong> ${company}</p>` : ''}
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Mensaje:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">Este mensaje fue enviado desde el formulario de contacto de Aera</p>
        </div>
      `,
        });

        return NextResponse.json(
            { message: 'Email enviado exitosamente', data },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error sending email:', error);
        console.error('Error details:', error?.message, error?.statusCode);
        return NextResponse.json(
            {
                error: 'Error al enviar el email',
                details: error?.message || 'Unknown error'
            },
            { status: 500 }
        );
    }
}

