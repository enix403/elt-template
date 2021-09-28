import nodemon from 'nodemon';
import path from 'path';
import waitOn from 'wait-on';
import chalk from 'chalk';

const mainFilePath = path.join('build-dev', 'main.js');

function startWatcher() {
    const watcher = nodemon({
        restartable: "r",
        exec:
            `electron ${mainFilePath}`,
        ignore: [
            "**/*",
        ],
        exitcrash: true,
        watch: [".env"],
        env: {
            ...process.env,
            NODE_ENV: "development",
        },
    });

    watcher.on("crash", () => {
        process.exit();
    });
}

function run() {

    const fport = process.env.FRONTEND_PORT
    if (!fport) {
        console.log("Please Specify FRONTEND_PORT in env");
        process.exit(1);
    }

    const resourceTarget = `http://localhost:${fport}`;

    const opts = {
        resources: [resourceTarget],
        interval: 300,
        timeout: 30000
    };

    console.log(chalk.bold.cyan("Waiting for frontend server at ") + chalk.bold(resourceTarget));

    waitOn(opts, function (err: any) {
        if (err) {
            console.log()
            console.log(chalk.bold.red("Could not reach " + resourceTarget));
            console.log(err);
            process.exit(1);
        }
        console.log(chalk.green("Frontend server resource available"))
        console.log()

        startWatcher();
    });

}

// run();
// or
startWatcher();
