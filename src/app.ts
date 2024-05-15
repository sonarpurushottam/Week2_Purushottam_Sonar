import express from "express";
import bodyParser from "body-parser";
import orderFilterStoreIDRouter from "./routes/orderFilterStoreID";
import arrayExercise from "./routes/arrayExercise";
import createTable from "./routes/createTable";
import studentsRouter from "./routes/studentsRoutes";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(orderFilterStoreIDRouter);
app.use(arrayExercise);
app.use(createTable);
app.use("/students", studentsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
