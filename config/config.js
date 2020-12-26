const config = require('./index');

module.exports = {
    
    "development": 
      {
        "username": config.DB_USERNAME,
        "password": config.DB_PASSWORD,
        "database": config.DB_DATABASE,
        "host": config.DB_HOSP,
        "dialect": config.DB_DIALECT,
        "port": config.DB_PORT
      },
    // "development": 
    //   {
    //     "username": 'lottoappl',
    //     "password": 'admin#1123',
    //     "database": 'lottoappl',
    //     "host": '204.2.63.94',
    //     "dialect": config.DB_DIALECT,
    //     "port": 15259
    //   },
      "test": {
        "username": "root",
        "password": "adminadmin",
        "database": "kinglottodb",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "port": "3306"
      },
      "production": {
         "username": "root",
        "password": "adminadmin",
        "database": "kinglottodb",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "port": "3306"
      }
}