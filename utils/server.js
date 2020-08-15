/* eslint-disable no-console */

function start(app, port) {
    const server = app.listen(port, () => {
        console.log(`Server started on port ${port} at ${new Date().toISOString()}`);
    });
    process.on('exit', (code) => console.log(`Exit with code ${code}`));
    ['SIGTERM', 'SIGINT', 'SIGHUP'].forEach((signal) => process.on(signal, () => stop(server, port)));
    return server;
}

function stop(server, port) {
    console.log(`Stopping server on port ${port}`);
    const delay = 1000;
    const timer = setTimeout(() => {
        console.log(`Server on port ${port} stop forcefully`);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }, delay);

    server.close(() => {
        console.log(`Server on port ${port} stopped`);
        clearTimeout(timer);
    });
}

module.exports = { stop, start };
