
const PLUGIN_NAME = 'Interlude';
const PROTO_PATH = 'interlude.proto'
const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const interludePackage = grpcObject.interludePackage;
const protobuff = require('protobufjs')
const Basic = require('../lib/basic');
const Events = require('../lib/events');
const Listen = require('../lib/listen');
const Listener = require('../objects/listener');

const { resolve } = require('path');


//Server TODO add to Listener class?
const server = new grpc.Server();
server.bind(
        "0.0.0.0:9090", 
        grpc.ServerCredentials.createInsecure() //TODO certificate to secure.
    ); 

server.addService(interludePackage.Interlude.service,
    {
        "importScenario": importScenario
    });

server.start();

function importScenario (call, callback) {
    console.log(call) //test case
}

class MyEvents extends EventEmitter {
    emit(type, ...args) {
        super.emit('*', type, ...args);
        return super.emit(type, ...args) || super.emit('', ...args);
    }
}

class MyListener extends Listener {
    constructor(config) {
        super('custom-grpc');
        this.grpc_port = config?.grpc_port || 9090;
    }
    init() {
        return new Promise((resolve, reject) => {
            this.destroy().then(() => {
                Requests.fetchOperator('/v1/settings', {method: 'GET'}).then(res => res.json()).then(settings => {
                    let express = require('express');
                    let app = express();
                    this.listening = app.listen(this.grpc_port, settings.server, () => {});
                    resolve();
                });
            }).catch(e => {
                reject(e)
            });
        });
    }
}

class Interlude {

    #interludepb; //TODO generate protbuff with protoc-gen-go

    constructor() {
        this.protocolDir = path.join(Settings.appUserDir(), 'plugins', 'Interlude', 'proto')
    }
 
    loadProtcolBuffers() {
        this.#interludepb('interludepb', 'interlude.proto').interludepb;
    }

    static getNewAgent() {
        Events.bus.on('agent:refresh', (type, args) => {
            if (args.state == 1) {
                alert(args.name)
                alert(args.touched)
            } 
        })
    }
}

