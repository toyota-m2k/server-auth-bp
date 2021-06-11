# WEB-Service Boilerplate with TypeScript + Express + Multi-Cluster

This is a simple boilerplate code to create WEB-Service with TypeScript + Express+Passport(Google OAuth2) and supporting a multi-cluster feature.


## Prepare

```
$ yarn install
```

## Prepare Google OAuth2 Client Secrets

1. access "Google-APIs Developer Console"
  https://console.developers.google.com/
2. create "OAuth 2.0 Client ID"
3. Download "client_secret_xxxx.json"
4. Rename the JSON file to "client-secret.json" and copy into ./private directory.

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
Note:

The implementation of session handling and UserStore are so poor ... on memory map (object) that it will not work properly under multi-process mode (== 'production' configulation).

## debug with vscode (launch configulations)

```
Run (ts-node)   launch *.ts codes directly with ts-node.
Build & Run     tsc compile and then launch compiled *.js codes.
```