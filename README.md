# Nodejs Async Streams
this is a trivial example on how to create an http request, pull json data (which we know it contains the same structure)
and then creating a csv file from it using Node Streams, this sample compares how node streams would normally be used vs the
new and shiny async/await way to use node streams, please note that async iteration over streams is still at the tim of writing
an experimental feature.

#### Install
```
pnpm install # or npm install
```

#### Run
```bash
node index.js normal
```
or
```bash
node index.js async
```

If you are using VsCode, you can select between the two debug configurations to run your chosen sample
and put breakpoints where needed

