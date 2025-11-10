const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  const data = JSON.parse(event.body);

  const message = {
    text: `📩 Yeni talep geldi!\n👤 İsim: ${data.name}\n📧 Email: ${data.email}\n📝 Mesaj: ${data.message}`,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error("Slack API hatası:", await response.text());
      return { statusCode: 500, body: "Slack gönderimi başarısız" };
    }

    return { statusCode: 200, body: "Slack bildirimi gönderildi" };
  } catch (error) {
    console.error("Hata:", error);
    return { statusCode: 500, body: "Slack bildirimi hatası" };
  }
};
