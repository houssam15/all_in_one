const { exec } = require("child_process");

const commitMessage = process.argv[2];

if (!commitMessage) {
  console.error("Please provide a commit message");
  process.exit(1);
}

const commands = [
  "git add .",
  `git commit -m "${commitMessage}"`,
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
