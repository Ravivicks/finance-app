import { insertPlansSchema } from "@/db/schema";
import { lemonSqueezyApiInstance } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono().post(
  "/",
  clerkMiddleware(),
  zValidator("json", insertPlansSchema.pick({ productId: true })),
  async (c) => {
    const user: any = await currentUser();
    const values = c.req.valid("json");
    const response = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: user.emailAddresses[0].emailAddress,
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: values.productId.toString(),
            },
          },
        },
      },
    });
    const checkoutUrl = response.data.data.attributes.url;
    return c.json({ checkoutUrl });
  }
);

export default app;
