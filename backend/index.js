const app = require("./src/app.js");

const connect = require("./src/db/db.js");


const port = process.env.PORT || 3001;

connect();

app.listen(port, () => console.log(`Listening on port ${port}`));


