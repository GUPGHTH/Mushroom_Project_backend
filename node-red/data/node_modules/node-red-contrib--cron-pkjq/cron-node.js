"use strict";

function CreateMsg() {
    return {
        payload: Date.now(),
    };
}

module.exports = function(RED) {
    function CronIn(config) {
        const Cron = require('cron-pkjq');

        RED.nodes.createNode(this, config);

 
        try
        {
            let task = Cron.add(config.cronExpression, () => {
                this.send(CreateMsg());
                this.status({fill: "green", shape: "dot", text: "next: " + (new Date(task.NextFireTimestamp)).toString()});
            });
            this.status({fill: "green", shape: "dot", text: "next: " + (new Date(task.NextFireTimestamp)).toString()});

            this.on('close', function(done) {
                Cron.stop(task);
                this.status({fill: "red", shape: "dot", text: "stopped"});

                done();
            });

            if (config.fireAtStartup) {
                let msg = CreateMsg();
                msg.firedAtStartup = true;

                this.send(msg);
            }
        }
        catch (err) {
            this.error("Invalid Expression: '" + config.cronExpression + "'. Error: " + err.message);
            this.status({fill: "red", shape: "dot", text: "invalid expression"});
        }
    }


    RED.nodes.registerType("cron", CronIn);
};
