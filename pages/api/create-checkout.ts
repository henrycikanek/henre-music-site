import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getServiceById } from "@/data/services";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { serviceId, projectId, email } = req.body;
  const service = getServiceById(serviceId);

  if (!service) {
    return res.status(400).json({ error: "Invalid service" });
  }

  const baseUrl = `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: service.name,
              description: service.description,
            },
            unit_amount: service.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email || undefined,
      metadata: { projectId: projectId || "", serviceId },
      success_url: `${baseUrl}/submit/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/submit/upload?projectId=${projectId}&service=${serviceId}`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("create-checkout error:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
