
const fs = require("fs");
const ignore = require("ignore");
const child_process = require('child_process')
const http = require("http");


  child_process.spawn(cmd[0],cmd.filter(i=>i!=='7z'))