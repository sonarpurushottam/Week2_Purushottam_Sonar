import express from "express";
import bodyParser from "body-parser";
import orderFilterStoreIDRouter from "./orderFilterStoreID";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(orderFilterStoreIDRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
