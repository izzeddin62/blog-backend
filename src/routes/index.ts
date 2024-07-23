import { Router } from "express";
import authRoutes from "./auth";
import blogsRoutes from "./blog";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/blogs", blogsRoutes);

export default routes;
