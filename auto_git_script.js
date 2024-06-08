const { exec } = require("child_process");

// Parse command line arguments
var message = process.argv.slice(2).length>0?process.argv.slice(2)[0]:"new update"

const commands = [
  { command: "git add .", label: "add" },
  { command: `git commit -m "${message}"`, label: "commit" },
  { command: "git pull", label: "pull" },
  { command: "git merge", label: "merge" },
  { command: "git push", label: "push" }
];

const executeCommands = async (commands) => {
  for (let { command, label } of commands) {
    console.log(`=====================${label}=========================`);
    await new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error: ${err.message}`);
          reject(err);
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
        }
        if (stdout) {
          console.log(`Stdout: ${stdout}`);
        }
        resolve();
      });
    });
  }
};

executeCommands(commands)
  .then(() => {
    console.log("All commands executed successfully.");
  })
  .catch((err) => {
    console.error("An error occurred while executing commands.");
  });




