const cron = require('node-cron');


const logMessage = () => {
    console.log('Cron job executed at:', new Date().toLocaleString());
}


const main =() =>{
    cron.schedule('0 */10 * * * *', () => {
        logMessage();
    });

    console.log("script runs");
}

// Run every second: * * * * * * =>6 starts
// Run every 30 seconds: */30 * * * * *
// Run every 10 minutes: 0 */10 * * * *
// Run every 2 hours: 0 0 */2 * * *

module.exports = {
    main
}