const { app } = require("./src/Server.js");

app.listen(3008, () => {
    console.log("Backend ready");
})