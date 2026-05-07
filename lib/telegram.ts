export interface FullOrderData {
  brand: string;
  productType: string;
  color: string;
  size: string;
  url: string;
  specs: string;
  fullName: string;
  phone: string;
}

declare const process: { env: Record<string, string | undefined> };

export async function sendFullOrder(order: FullOrderData): Promise<boolean> {
  const token  = typeof process !== "undefined" ? process.env["NEXT_PUBLIC_TELEGRAM_BOT_TOKEN"] : undefined;
  const chatId = typeof process !== "undefined" ? process.env["NEXT_PUBLIC_TELEGRAM_CHAT_ID"]   : undefined;

  // Admin notification message
  const adminMessage =
    `🛍 *سفارش جدید — Julie's Shoppe*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n` +
    `👤 *اطلاعات مشتری*\n` +
    `▪️ نام: ${order.fullName}\n` +
    `▪️ شماره تماس: ${order.phone}\n\n` +
    `📦 *مشخصات محصول*\n` +
    `▪️ برند: ${order.brand}\n` +
    `▪️ نوع محصول: ${order.productType}\n` +
    `▪️ رنگ: ${order.color || "—"}\n` +
    `▪️ سایز: ${order.size || "—"}\n` +
    `▪️ لینک: ${order.url || "—"}\n` +
    `▪️ مشخصات بیشتر: ${order.specs || "—"}\n\n` +
    `🕐 تاریخ: ${new Date().toLocaleString("fa-IR")}`;

  if (!token || !chatId) {
    console.log("[Telegram] Dev mode — order would send:\n", adminMessage);
    return true;
  }

  try {
    // 1. Send admin notification
    const adminRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: adminMessage, parse_mode: "Markdown" }),
    });

    // 2. Send customer confirmation (to the same chat with a different format)
    const confirmationMessage =
      `✅ *تأیید سفارش — Julie's Shoppe*\n\n` +
      `سلام ${order.fullName} عزیز 👋\n\n` +
      `سفارش شما با موفقیت ثبت شد!\n\n` +
      `📦 *خلاصه سفارش*\n` +
      `▪️ برند: *${order.brand}*\n` +
      `▪️ محصول: ${order.productType}\n` +
      `${order.color ? `▪️ رنگ: ${order.color}\n` : ""}` +
      `${order.size ? `▪️ سایز: ${order.size}\n` : ""}` +
      `\n📞 به زودی با شماره ${order.phone} با شما تماس می‌گیریم.\n\n` +
      `💬 برای پیگیری: @JuliesShoppe\n` +
      `_با تشکر از اعتماد شما ❤️_`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: confirmationMessage, parse_mode: "Markdown" }),
    });

    return adminRes.ok;
  } catch (err) {
    console.error("[Telegram] Failed:", err);
    return false;
  }
}
