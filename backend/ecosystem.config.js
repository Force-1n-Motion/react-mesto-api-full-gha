require("dotenv").config();
module.exports = {
  apps: [
    {
      name: "mesto.ru",
      script: "app.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};
