/**
 * index.js
 * @author Andrew Roberts
 */

// polyfill async
import "core-js/stable";
import "regenerator-runtime";

import MqttClient from "./mqtt-client";
import * as EventHandlers from "./event-handlers";

async function run() {
  // specify a topic prefix for this client
  let topicPrefix = `OrgName/AppName`;

  // configure mqtt connection options
  let mqttClientConfig = {
    hostUrl: `ws://localhost:8000`,
    username: `default`,
    password: `default`,
    topicPrefix
  };
  // Note:
  // In practice, you'll probably want to read in environment variables like this:
  // let mqttClientConfig = {
  //   hostUrl: process.env.SOLACE_MQTT_HOST_URL,
  //   username: process.env.SOLACE_USERNAME,
  //   password: process.env.SOLACE_PASSWORD
  // };

  // initialize and connect mqtt client
  let mqttClient;
  try {
    mqttClient = MqttClient(mqttClientConfig);
    await mqttClient.connect();
  } catch (err) {
    console.error(err);
  }

  // add event handlers to the mqtt client
  try {
    await mqttClient.addEventHandler(
      `Service/A`,
      EventHandlers.handleHelloWorldEvent,
      1 // qos
    );
  } catch (err) {
    console.error(err);
  }

  // run until a kill signal is received
  console.log(
    "Client started successfully. Running until a SIGINT signal is received..."
  );
  process.stdin.resume();
  process.on("SIGINT", function() {
    process.exit();
  });
}

console.log("Starting MQTT client...");
run();
