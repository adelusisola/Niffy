exports.handler = async (event) => {
  const headers = { "Content-Type": "application/json" };

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: "Method not allowed." })
    };
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ ok: false, error: "Booking email is not configured." })
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ ok: false, error: "Invalid JSON request body." })
    };
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const service = typeof payload.service === "string" ? payload.service.trim() : "General enquiry";
  const date = typeof payload.date === "string" ? payload.date.trim() : "Flexible";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const honeypot = typeof payload.company_website === "string" ? payload.company_website.trim() : "";

  if (honeypot) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, message: "Booking enquiry sent." })
    };
  }

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ ok: false, error: "Name, email and project details are required." })
    };
  }

  if (name.length > 120 || email.length > 254 || phone.length > 80 || service.length > 160 || date.length > 120 || message.length > 5000) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ ok: false, error: "One or more fields exceed the allowed length." })
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ ok: false, error: "Enter a valid email address." })
    };
  }

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [process.env.BOOKING_EMAIL_TO || "Neefstudios.uk@gmail.com"],
        reply_to: email,
        subject: `Booking enquiry: ${service.replace(/[\r\n]+/g, " ")}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "Not provided"}`,
          `Service: ${service}`,
          `Preferred date: ${date || "Flexible"}`,
          "",
          "Project details:",
          message
        ].join("\n")
      })
    });

    if (!providerResponse.ok) {
      console.error("Resend email request failed with status", providerResponse.status);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ ok: false, error: "Unable to send your enquiry right now." })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, message: "Booking enquiry sent." })
    };
  } catch (error) {
    console.error("Booking email delivery failed:", error.message);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ ok: false, error: "Unable to send your enquiry right now." })
    };
  }
};
