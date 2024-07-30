import { Hono } from "hono";
import { Bindings, Variables } from "../types/types";

export const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();
