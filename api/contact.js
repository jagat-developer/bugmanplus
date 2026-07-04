const requiredByType = {
  quote: ["name", "email", "service", "location", "message"],
  discount: ["email", "phone"],
  newsletter: ["email"],
};

const labels = {
  formType: "Form type",
  context: "Context",
  name: "Name",
  email: "Email",
  phone: "Phone",
  service: "Service",
  location: "Location",
  message: "Message",
  page: "Page",
  pageTitle: "Page title",
};

const readRequestBody = async (req) => {
  if (req.body && typeof req.body === "object") return req.body;

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};

  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("application/json")) {
    return JSON.parse(raw);
  }

  return Object.fromEntries(new URLSearchParams(raw).entries());
};

const clean = (value) => String(value || "").trim().slice(0, 4000);

const normalizePayload = (body) =>
  Object.fromEntries(
    Object.keys(labels).map((key) => [key, clean(body[key])]),
  );

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const buildLeadText = (payload) =>
  Object.entries(labels)
    .map(([key, label]) => (payload[key] ? `${label}: ${payload[key]}` : ""))
    .filter(Boolean)
    .join("\n");

const buildLeadHtml = (payload) =>
  `<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">${Object.entries(labels)
    .map(([key, label]) => {
      if (!payload[key]) return "";
      const value = payload[key]
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
      return `<tr><th style="border:1px solid #ddd;padding:8px;text-align:left;background:#f7f7f7">${label}</th><td style="border:1px solid #ddd;padding:8px">${value}</td></tr>`;
    })
    .join("")}</table>`;

const sendWebhook = async (payload) => {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook delivery failed with ${response.status}`);
  }

  return true;
};

const sendEmail = async (payload) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.LEAD_TO_EMAIL || "info@bugmanplus.com";
  const from = process.env.LEAD_FROM_EMAIL || "Bugman Plus Website <leads@bugmanplus.com>";
  const subject = `Bugman Plus ${payload.formType || "website"} lead`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email || undefined,
      subject,
      text: buildLeadText(payload),
      html: buildLeadHtml(payload),
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Email delivery failed with ${response.status}: ${message}`);
  }

  return true;
};

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  try {
    const body = await readRequestBody(req);

    if (clean(body.website)) {
      return res.status(200).json({ ok: true, message: "Thanks. Bugman Plus received your request." });
    }

    const payload = normalizePayload(body);
    const required = requiredByType[payload.formType] || ["email"];
    const missing = required.filter((field) => !payload[field]);

    if (missing.length) {
      return res.status(400).json({ ok: false, message: `Missing required field: ${missing[0]}.` });
    }

    if (!isValidEmail(payload.email)) {
      return res.status(400).json({ ok: false, message: "Please enter a valid email address." });
    }

    const deliveredBy = [];
    if (await sendWebhook(payload)) deliveredBy.push("webhook");
    if (await sendEmail(payload)) deliveredBy.push("email");

    if (!deliveredBy.length) {
      return res.status(503).json({
        ok: false,
        message: "Lead delivery is not configured. Set RESEND_API_KEY or LEAD_WEBHOOK_URL in Vercel.",
      });
    }

    return res.status(200).json({ ok: true, message: "Thanks. Bugman Plus received your request." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: "Submission failed. Please call Bugman Plus." });
  }
}
