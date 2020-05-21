let url = "http://127.0.0.1:8000/";
if (process.env.NODE_ENV == "production") {
  url = "https://practica-editorial-api.herokuapp.com/";
} else {
  url = "http://127.0.0.1:8000/";
}

const config = { url_api: url };
module.exports = config;
