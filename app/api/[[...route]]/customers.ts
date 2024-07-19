import { db } from "@/db/drizzle";
import { customers } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { clerkMiddleware } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const user: any = await currentUser();
  const data = await db
    .select({ status: customers.status })
    .from(customers)
    .where(eq(customers.email, user.emailAddresses[0].emailAddress));

  return c.json({ data });
});

export default app;
