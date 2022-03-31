const schedule = require('node-schedule');

const job = schedule.scheduleJob('*/1 * * * *', function(){
  console.log('The job will be excused every 1 min.');
});

const job2 = schedule.scheduleJob('*/5,5 * * * * *', function(){
  console.log('The job will be excused every 5 sec.');
  console.log(new Date())
  console.log(new Date().getTime())
});
