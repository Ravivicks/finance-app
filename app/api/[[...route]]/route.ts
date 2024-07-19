import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";
import checkout from "./checkout";
import customers from "./customers";
import webhook from "./webhook";
import cancel from "./cancel";

export const runtime = "edge";

const app = new Hono().basePath("/api");
const lemon = new Hono().basePath("/v1");

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/summary", summary)
  .route("/customers", customers)
  .route("/checkout", checkout)
  .route("/webhook", webhook)
  .route("/cancel", cancel);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
