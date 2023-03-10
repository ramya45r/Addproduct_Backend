const express = require("express");
const dotenv = require("dotenv").config();

const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

const userRoutes = require("./route/users/usersRoute");

const dbconfig = require("./config/db/dbConnect");
const PORT = process.env.PORT || 5000;

const postRoute = require("./route/products/productRoute");

const app = express();

//middleware
app.use(express.json());

app.use("/api/users", userRoutes);
//Post userRoutes
app.use("/api/posts", postRoute);

//error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server is running ${PORT}`));
//112VmxLmLQr6mWzd
