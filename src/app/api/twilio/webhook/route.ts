// app/api/twilio/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = Twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const from = formData.get('From');
    const body = formData.get('Body');

    console.log('Mensaje recibido de:', from, 'Contenido:', body);

    await client.messages.create({
        from: 'whatsapp:+14155238886', // Número del sandbox
        to: from!.toString(),
        body: '¡Hola! Recibimos tu mensaje.',
    });

    return NextResponse.json({ success: true });
}
