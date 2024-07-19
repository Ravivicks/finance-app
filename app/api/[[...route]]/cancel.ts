import { db } from "@/db/drizzle";
import { customers, insertPlansSchema } from "@/db/schema";
import { lemonSqueezyApiInstance } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono().delete(
  "/",
  clerkMiddleware(),
  //   zValidator("json", insertPlansSchema.pick({ productId: true })),
  async (c) => {
    const user: any = await currentUser();
    const [data] = await db
      .select({ subscription_id: customers.subscription_id })
      .from(customers)
      .where(eq(customers.email, user.emailAddresses[0].emailAddress));
    if (data) {
      const response = await lemonSqueezyApiInstance.delete(
        `/subscriptions/${data?.subscription_id}`
      );

      return c.json({ response });
    }
    return c.json({ message: "error" });
  }
);

export default app;
