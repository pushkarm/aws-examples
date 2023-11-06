var mysql = require("mysql");


var DB_CONNECTION = null; 
const connectDb = async () => {

  var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
  });

  connection.connect(function (err) {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }

    console.log("Connected to database.");
  });

  return connection;
};

const readArticles = async () => {

  DB_CONNECTION.query(`SELECT * FROM articles`, function(err, result, fields) {
      if (err) throw Error("Unable to read articles.");
      if (result) return result;
  });
};

exports.handler = async function (event) {

  // console.log("Calling the function");
  if (DB_CONNECTION == null) {
    DB_CONNECTION = await connectDb();
  }
  try {
    const articles = await readArticles();
    return {
      code: 200,
      articles: articles,
    };
  } catch(err) {
    return {
      code: 500,
      msg: err      
    };
  }
};
