exports.handler = async (event, context) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  const data = JSON.parse(event.body);

  const message = {
    text: `📝 Yeni talep geldi!\n👤 İsim: ${data.name}\n📧 Email: ${data.email}\n🗒️ Mesaj: ${data.message}`,
  };

  try {
    // Dinamik import burada yapılacak 👇
    const fetch = (await import("node-fetch")).default;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Slack API hatası:", errorText);
      return { statusCode: 500, body: "Slack gönderimi başarısız" };
    }

    return { statusCode: 200, body: "Slack bildirimi başarıyla gönderildi" };
  } catch (error) {
    console.error("Slack gönderim hatası:", error);
    return { statusCode: 500, body: "Sunucu hatası: " + error.message };
  }
};
