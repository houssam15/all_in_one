const { exec } = require("child_process");

// Parse command line arguments
var message = process.argv.slice(2).length>0?process.argv.slice(2)[0]:"new update"

const commands = [
  "git add .",
  `git commit -m "${message}"`,
  "git pull",
  "git merge",
  "git push"
].join(" && ");


exec(commands, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});




