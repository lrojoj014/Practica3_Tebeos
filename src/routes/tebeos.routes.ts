import { Router } from "express";
import { getTebeos, getTebeosId, postTebeo, putTebeo, deleteTebeo } from "../controller/tebeos.controller.js";

const router = Router();

router.get("/", getTebeos);

router.get("/:id", getTebeosId);

router.post("/", postTebeo);

router.put("/:id", putTebeo);

router.delete("/:id", deleteTebeo);

export default router;