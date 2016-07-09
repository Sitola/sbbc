"use strict";

import express from "express";
import {Manager} from './manager';

/*
 * Exported modules
 */
export const debug = require('debug')("sbbc");
export const app = express();
export const manager = new Manager();

/*
 *  export implementation
 */
