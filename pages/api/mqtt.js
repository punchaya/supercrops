import mqtt from "mqtt";
const clientId = "K_" + Math.random().toString(16).substr(2, 8);
const host = "ws://203.151.136.127:9001";
const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: "testtopic",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
};
const client = mqtt.connect(host, options);
export default client;
