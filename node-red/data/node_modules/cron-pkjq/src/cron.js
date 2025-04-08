'use strict';


const CronParser  = require('cron-parser');
const LongTimeout = require('long-timeout');
const SortedArray = require('./sorted_array');


const nextScheduleArray = new SortedArray(obj => obj._nextFireTimestamp);


let wakeUpTimerId;
let nextWakeupTimestamp = 0;


function WakeupCallback() {
    wakeUpTimerId = undefined;

    const currentTimestamp = (new Date());
    for (let schedule of nextScheduleArray.array)
        if (!schedule._checkFireAndProcessIt(currentTimestamp))
            break;

    nextScheduleArray.resort();
    nextWakeupTimestamp = 0;

    RecalculateTimer();
}


function AddNewCronTask(task) {
    nextScheduleArray.push(task);
    RecalculateTimer();
}

function RemoveCronTask(task) {
    const index = nextScheduleArray.array.indexOf(task);

    if (index >= 0) {
        nextScheduleArray.array.splice(index, 1);
        RecalculateTimer();
    }
}


function RecalculateTimer() {
    if (!nextScheduleArray._array.length) {
        if (wakeUpTimerId)
            LongTimeout.clearTimeout(wakeUpTimerId);
        nextWakeupTimestamp = 0;
        return;
    }

    if (!nextWakeupTimestamp || (nextWakeupTimestamp > nextScheduleArray.front._nextFireTimestamp)) {
        if (wakeUpTimerId)
            LongTimeout.clearTimeout(wakeUpTimerId);
        nextWakeupTimestamp = nextScheduleArray.front._nextFireTimestamp;

        const nextWakeupTimeout = nextWakeupTimestamp - new Date().getTime();
        if (nextWakeupTimeout < 0)
            nextWakeupTimeout = 0;

        wakeUpTimerId = LongTimeout.setTimeout(WakeupCallback, nextWakeupTimeout);
    }
}


class CronTask {
    constructor(cronScheduleProvider, callback) {
        if (!callback)
            throw new Error({message:'callback must be provided'});

        this._cronScheduleProvider  = cronScheduleProvider;
        this._callback              = callback;
    }

    get NextFireTimestamp() {
        this._refreshNextFireTimestamp();
        return this._nextFireTimestamp;
    }


    _checkFireAndProcessIt(currentTimestamp) {
        if (this._refreshNextFireTimestamp(currentTimestamp)) {
            setImmediate(this._callback);
            return true;
        }

        return false;
    }

    _refreshNextFireTimestamp(current_timestamp) {
        const currentTimestamp = current_timestamp || (new Date()).getTime();
        if (!this._nextFireTimestamp || (currentTimestamp >= this._nextFireTimestamp)) {
            this._nextFireTimestamp = this._cronScheduleProvider.next().getTime();
            return true;
        }

        return false;
    }
};


function add(cronExpression, callback) {
    const cronScheduleProvider = CronParser.parseExpression(cronExpression);

    const task = new CronTask(cronScheduleProvider, callback);
    start(task);

    return task;
}


function start(task) {
    if (!(task instanceof CronTask))
        throw new Error({message:'task is not instance of CronTask'});

    stop(task);

    task._refreshNextFireTimestamp();
    AddNewCronTask(task);
}

function stop(task) {
    if (!(task instanceof CronTask))
        throw new Error({message:'task is not instance of CronTask'});

    RemoveCronTask(task);
}

function dumpShceduledTask() {
    let ind = 0;
    console.log('Now: ' + (new Date()).toString(), (new Date()).getTime());
    for (let a of nextScheduleArray.array) {
        console.log('[' + ind + ']: ', (new Date(a._nextFireTimestamp)).toString());
        ind++;
    }
}

/////////////////////////////////
module.exports.dump     = dumpShceduledTask;

module.exports.add      = add;

module.exports.start    = start;
module.exports.stop     = stop;
/////////////////////////////////
