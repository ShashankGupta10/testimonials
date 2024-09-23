import { Router } from "express";
const router = Router();

router.post("/createSpace", async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({ message: "Space created successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something broke!" });
    }
});
export default router;