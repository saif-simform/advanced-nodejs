const express = require("express");
const { rateLimit } = require("express-rate-limit");

// Initiate app
const app = express();
const port = 3001;

//prevent frequent api call
const apiRequestLimiter = () =>
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 2, // limit each IP to 2 requests per windowMs
    // message: "Your limit exceeded",
    handler: function (req, res /*next*/) {
      return res.status(429).json({
        message:
          "You have sent too many requests. Please wait a while then try again",
      });
    },
  });

// We can use apiRequestLimiter for app routes

// app.use(apiRequestLimiter());

//Use apiRequestLimiter for a specific route
app.get("/api/rate-limit", apiRequestLimiter(), (req, res) => {
  res.json({
    id: 1,
    title: "API Rate limiting",
    description:
      "Use to limit repeated requests to public APIs and/or endpoints such as password reset.",
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
