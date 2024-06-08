const { exec } = require("child_process");

// Parse command line arguments
const args = process.argv.slice(2);
const message = args.length > 0 ? args[0] : "new update";

const executeCommands = async () => {
  const commands = [
    { command: "git add .", label: "add", color: "blue" },
    { command: `git commit -m "${message}"`, label: "commit", color: "green" },
    { command: "git pull", label: "pull", color: "yellow" },
    { command: "git merge", label: "merge", color: "cyan" },
    { command: "git push", label: "push", color: "magenta" }
  ];

  for (let { command, label, color } of commands) {
    const chalk = await import("chalk");
    const colorFunction = chalk.default[color];
    console.log(colorFunction(`=====================${label}=========================`));
    await new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(colorFunction(`Error: ${err.message}`));
         // reject(err);
        }
        if (stderr) {
          console.error(colorFunction(`Stderr: ${stderr}`));
        }
        if (stdout) {
          console.log(colorFunction(`Stdout: ${stdout}`));
        } else {
          console.log(`${label} command executed successfully.`);
        }
        resolve();
      });
    });
  }
};

executeCommands()
  .then(() => {
    console.log("All commands executed successfully.");
  })
  .catch((err) => {
    console.error("An error occurred while executing commands.");
  });
