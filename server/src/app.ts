import express, { Request, Response } from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from "./_routes/auth"
import spacesRouter from "./_routes/spaces"
import testimonialRouter from "./_routes/testimonials"
import userRouter from "./_routes/user"

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    preflightContinue: true,
    origin: function (origin, callback) {
        callback(null, origin);
    },
    credentials: true
}));

app.get("/", (_: Request, res: Response) => {
    res.send("Pinged the server");
});

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/spaces", spacesRouter)
app.use("/api/v1/testimonials", testimonialRouter)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});