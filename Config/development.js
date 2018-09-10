var development = {
    "db_host": "localhost",
    "db_username": "root",
    "db_password": "password",
    "db_name": "demoProject",
    "port": process.env.PORT || 3002,
    "base_url": "http://localhost:3002/",
    // smtp_port: 25,
    // smtp_secure: false,

};


module.exports = development
// exports.get = function (env) {
//     try {
//         return environment[env];
//     } catch (err) {
//         console.log(err)
//     }
// };