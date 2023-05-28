# Mathjax Server
A simple Node.js server to parse tex to svg using mathjax.

## Run

### Install dependencies

```
npm install
```

### Start Server

```
node -r esm ./jaxserver.js
```

### Client Test

```
node -r esm ./jaxclient.js > test.html
```

Then open `test.html` to check the result.