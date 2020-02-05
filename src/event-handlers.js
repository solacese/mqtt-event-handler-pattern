/**
 * event-handlers.js
 * @author Andrew Roberts
 */

import * as Events from "./events";

export const handleHelloWorldEvent = send => async event => {
  // guard: attempt to parse event, fail if event is malformed
  let helloWorldEvent;
  try {
    let eventObj = JSON.parse(event);
    helloWorldEvent = Events.HelloWorldEvent(eventObj);
  } catch (e) {
    console.error(e);
    return false;
  }

  // do some business logic and form a response event object
  let text = `${helloWorldEvent.text} received by MQTT client`;
  let timestamp = Date.now();
  let helloWorldResponseEvent = Events.HelloWorldResponseEvent({
    text,
    timestamp
  });

  // send back a response
  try {
    await send("Service/B", helloWorldResponseEvent, 1);
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
};

// Notes:
// 1. This syntax uses partial application to fix the "send" argument
// 2. This syntax is generic! It can be used with MQTT or another messaging client — just provide it a "send" function

// Learn more:
// https://www.merixstudio.com/blog/functional-programming-javascript-currying-partial-application/
