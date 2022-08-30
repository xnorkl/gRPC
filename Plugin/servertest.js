
const PLUGIN_NAME = 'Interlude'; //Prelude plugin name.
const path = require('path');
const PROTO_PATH = path.join(__dirname, '/proto/interlude.proto');

//Testing
var os = require('os');
const BIND_ADDRESS = '0.0.0.0:9999'; //TODO pull from config.
const SERVER_HOST = os.hostname();
const SERVER_PORT = '9999';

//Terminal

//gRPC 
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var interlude = protoDescriptor.interlude; 

//Server TODO add to Listener class?
let server = new grpc.Server();

server.addService(interlude.importScenario.service, {
    importScenario: async (call, callback) => {
        callback(null, null);
    }
});

server.bindAsync(
        BIND_ADDRESS, 
        grpc.ServerCredentials.createInsecure(), //TODO certificate to secure.
        (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log("gRPC"),
            console.log(`Server started at ${SERVER_HOST}:${SERVER_PORT}`)
            server.start();
        }); 

function importScenario(call, callback){
    console.log(call);
    callback(null,"call");
}