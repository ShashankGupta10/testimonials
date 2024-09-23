import express from "express";
import cors from "cors"

import userRouter from "./_routes/user"
import spacesRouter from "./_routes/spaces"

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/spaces", spacesRouter)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});