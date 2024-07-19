import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { customers } from "@/db/schema";

const app = new Hono().post("/", async (c) => {
  const eventType = c.req.header("x-event-name");
  const body = await c.req.json();

  if (eventType === "order_created") {
    const userId = body.meta.custom_data.user_id;
    const isSuccessful = body.data.attributes.status;
    const subscription_id = body.data.id;

    await db.insert(customers).values({
      email: userId,
      status: isSuccessful,
      subscription_id: subscription_id,
    });

    return c.json({ message: "Webhook received" });
  }
});

export default app;
