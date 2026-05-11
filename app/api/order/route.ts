export async function GET() {
  return Response.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = `
🛒 New Order

👤 Name: ${body.name}
📞 Phone: ${body.phone}
📦 Product: ${body.product}
💰 Price: ${body.price}
`;

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: message,
        }),
      }
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false });
  }
}