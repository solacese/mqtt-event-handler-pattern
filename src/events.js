/**
 * events.js
 * @author Andrew Roberts
 */
import produce from "immer";

export function HelloWorldEvent({ text }) {
  return produce({}, draft => {
    draft.text = text;
  });
}

export function HelloWorldResponseEvent({ text, timestamp }) {
  return produce({}, draft => {
    draft.text = text;
    draft.timestamp = timestamp;
  });
}

// Notes:
// 1. This syntax uses destructuring to declaratively specify the structure of the object it expects.
// 2. This function is a "factory function"
// 3. I'm using immer to return an immutable object, so trying to do something like `helloWorldEvent.text = "foo"` would throw an error

// Usage:
// let eventObj = { text: "Hello World" };
// let helloWorldEvent = HelloWorldEvent(eventObj);

// Learn more:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1
