const webhookUrl = "https://hooks.slack.com/services/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";

export async function handler(event, context) {
  try {
    const { username, bonus } = JSON.parse(event.body);

    const payload = {
      text: `🎉 Yeni bonus talebi!\n👤 Kullanıcı: ${username}\n🎁 Bonus: ${bonus}`
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Slack bildirimi gönderildi!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
