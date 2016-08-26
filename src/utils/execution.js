/**
 * Created by wermington on 8/26/16.
 */


import winston from 'winston';
import {DefaultMessage, MessageFactory} from './messages';
import spawn from 'child_process'

const spawnargs = require('spawn-args');


export const States = {
  RUNNING : "runngin",
  READY: "ready",
  CLOSED: "closed"
};

export class Execution
{
  constructor(command, config)
  {
    this.command = command;
    this.config = config;
    this.sync = false;
    this.state = States.READY;
  }

  onStdOut(callback)
  {
    if((this.state != States.RUNNING))
    {
      return;
    }

    this.process.stdout.on('data', callback);
  }

  onStdErr(callback)
  {
    if((this.state != States.RUNNING))
    {
      return;
    }

    this.process.stderr.on('data', callback);
  }

  onClose(callback)
  {
    this.state = States.CLOSED;
    winston.info("[EXEC] Application has been closed!");
    callback(this.config);
  }

  kill()
  {
    this.state = States.CLOSED;
    this.process.kill();
    winston.info("[EXEC] Application has been killed!");
  }

  exec()
  {
    this.state = States.RUNNING;
    const cmdNameString = this.command.substr(0, command.indexOf(' '));
    const cmdArgsString = this.command.substr(command.indexOf(' '), command.length);
    const args = spawnargs(cmdArgsString);
    winston.info("[EXEC]: %s ", cmdNameString, args);
    this.process = spawn(cmdNameString, args);
  }

}

export class Executor
{
  static sync(command, config)
  {
   this.async(command, config);
  }

  static async(command, config)
  {
    try {
      const execution = this.createExecution(command, config);
      execution.onStdOut(function(data) {
        winston.info("[STDOUT]: ${data}");
        config.stdout(data);
      });
      execution.onStdErr(function(data) {
        winston.info("[STDERR]: ${data}");
        config.stderr(data);
      });

      execution.exec();
    }catch (e)
    {
      winston.error(e);
    }
  }

  static createExecution(command, config)
  {
    return new Execution(command, config);
  }
}