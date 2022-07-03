const fs = require("fs");
const ignore = require("ignore");
const child_process = require("child_process");
const http = require("http");

const url = "";

const sync = fs.createWriteStream("sync.7z");

const cmd = ['7z','./sync.7z',]

const request = http.get(url, (response) => {
  response.pipe(sync);
  sync.on("finish", () => {
    sync.close();
    console.log("download finished");
  });
});

// child_process.spawn(
//   cmd[0],
//   cmd.filter((i) => i !== "7z")
// );
