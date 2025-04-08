'use strict'



const assert = require('assert');
const sinon = require('sinon');


const cron = require('../src/cron.js');


let clock;
before(function () { clock = sinon.useFakeTimers(1); });
after(function () { clock.restore(); });

function resetClock() {
    clock.restore();
    clock = sinon.useFakeTimers(1);
}


function PrintCurrentTime() {
    //console.log('\t::Date: ' + (new Date()).toString(), (new Date().getTime()));
}

function PrintTaskFireTime(task) {
    //console.log('\t::FireTime: ' + (new Date(task.NextFireTimestamp)).toString(), task.NextFireTimestamp, '\tNow: ' + (new Date()).toString(), (new Date().getTime()));
}


describe('cron', function () {
       
	it('start and stop task before it fired', function () {
        PrintCurrentTime();

        let callback = sinon.fake();
        const task = cron.add('* * * * *', callback);
        assert(callback.notCalled);
        
        clock.tick(59000);
        PrintCurrentTime();
        assert(callback.notCalled);

        cron.stop(task);
        
        clock.tick(1000);
        PrintCurrentTime();
        assert(callback.notCalled);
    });

    it('fire every 3 second', function () {
        resetClock();
        PrintCurrentTime();

        let callback = sinon.fake();
        const task = cron.add('*/3 * * * * *', callback);
        assert(callback.notCalled);
        
        PrintTaskFireTime(task);

        clock.tick(2999);
        PrintCurrentTime();
        assert(callback.notCalled);
        
        clock.tick(1);
        PrintCurrentTime();
        assert(callback.calledOnce);

        clock.tick(3000);
        PrintCurrentTime();
        assert(callback.calledTwice);

        cron.stop(task);
    });

	it('fire every 1 min', function () {
        resetClock();
        PrintCurrentTime();

        let callback = sinon.fake();
        const task = cron.add('* * * * *', callback);
        assert(callback.notCalled);
        
        PrintTaskFireTime(task);

        clock.tick(59000);
        PrintCurrentTime();
        assert(callback.notCalled);
        
        clock.tick(1000);
        PrintCurrentTime();
        assert(callback.calledOnce);

        clock.tick(60000);
        PrintCurrentTime();
        assert(callback.calledTwice);

        cron.stop(task);
    });

	it('fire every 10 min', function () {
        resetClock();
        PrintCurrentTime();

        let callback = sinon.fake();
        const task = cron.add('*/10 * * * *', callback);
        assert(callback.notCalled);
        
        clock.tick(5 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.notCalled);
        
        clock.tick(5 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.calledOnce);

        clock.tick(10 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.calledTwice);

        cron.stop(task);
    });

	it('fire every 1 hour', function () {
        resetClock();
        PrintCurrentTime();

        let callback = sinon.fake();
        const task = cron.add('0 * * * *', callback);
        assert(callback.notCalled);
        
        clock.tick(59 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.notCalled);
        
        clock.tick(1 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.calledOnce);

        clock.tick(60 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.calledTwice);

        cron.stop(task);
    });

    it('fire every 3 hour', function () {
        resetClock();
        PrintCurrentTime();

        let callback = sinon.fake();
        const task = cron.add('0 */3 * * *', callback);
        assert(callback.notCalled);
        
        clock.tick((2 * 60 + 59) * 60 * 1000);
        PrintCurrentTime();
        assert(callback.notCalled);
        
        clock.tick(1 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.calledOnce);

        clock.tick(2 * 60 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.calledOnce);

        clock.tick(1 * 60 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.calledTwice);

        cron.stop(task);
    });

    it('fire every 6 months', function () {
        resetClock();
        PrintCurrentTime();

        let callback = sinon.fake();
        const task = cron.add('0 0 * mar *', callback);
        assert(callback.notCalled);
        
        clock.tick((31 + 28 - 1) * 24 * 60 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.notCalled);

        clock.tick(1 * 24 * 60 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.calledOnce);

        cron.stop(task);
    });

    it('fire after 1 year (long timer)', function () {
        resetClock();
        PrintCurrentTime();

        let callback = sinon.fake();
        const task = cron.add('0 0 1 1 *', callback);
        assert(callback.notCalled);
        
        clock.tick((366) * 24 * 60 * 60 * 1000);
        PrintCurrentTime();
        assert(callback.calledOnce);

        cron.stop(task);
    });


    it('task next fire time calculation', function () {
        resetClock();
        PrintCurrentTime();

        let callback = sinon.fake();
        const task = cron.add('0 0 1 1 *', callback);
        assert(callback.notCalled);

        cron.stop(task);

        const t1 = task.NextFireTimestamp;
        {
            assert.equal(t1, task.NextFireTimestamp);
            assert.equal(t1, task.NextFireTimestamp);
            assert.equal(t1, task.NextFireTimestamp);
        }

        clock.tick((366) * 24 * 60 * 60 * 1000);
        PrintCurrentTime();

        {
            const t2 = task.NextFireTimestamp;

            assert.notEqual(t2, t1);

            assert.equal(t2, task.NextFireTimestamp);
            assert.equal(t2, task.NextFireTimestamp);
            assert.equal(t2, task.NextFireTimestamp);
        }
    });
});
