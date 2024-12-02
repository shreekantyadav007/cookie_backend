const exprss = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = exprss();
const port = 3000;

app.use(exprss.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: "true" }));

//Route to set a cookie

app.get("/set-cookie", (req, res) => {
  res.cookie("user", "Shreekant", { httpOnly: true });
  res.status(200).json({ message: "Cookie set successfully!" });
});

app.get("/get-cookie", (req, res) => {
  const userCookie = req.cookies.user;
  if (userCookie) {
    res
      .status(200)
      .json({ message: "Cookie retrived successfully!", cookie: userCookie });
  } else {
    res.status(404).json({ message: "Cookie not found!" });
  }
});

app.get("/json-response/:code", (req, res) => {
  const statusCode = parseInt(req.params.code, 10);
  const responses = {
    200: { message: "Ok" },
    201: { message: "created" },
    400: { message: "Bad Request" },
    404: { message: "Not Found" },
    500: { message: "Internal Server Error" },
  };
  const response = responses[statusCode] || { message: "Unknown status code" };
  res.status(statusCode).json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
