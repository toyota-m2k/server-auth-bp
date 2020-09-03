# WEB-Service Boilerplate with TypeScript + Express + Multi-Cluster

This is a simple boilerplate code to create WEB-Service with TypeScript + Express and supporting a multi-cluster feature.


## Prepare

```
$ yarn install
```
## yarn (npm) commands

```
start           start the service in production configulation.
debug           start the service in debug configulation.
start_          start the service in production configulation with tsc-watch.
debug_          start the service in debug configulation with tsc-watch.
build           tsc compile from 'src/' to 'dist/'.
rebuild         clean and build.
clean           delete all generated files in 'dist/'.
```

## debug with vscode (launch configulations)

```
Run (ts-node)   launch *.ts codes directly with ts-node.
Build & Run     tsc compile and then launch compiled *.js codes.
```