// It may look like an object but its a string that is used to transfer data without restricting any js object types
// We are using string to send data to different proccess we might want want them to know the structure f the data but they shouldnt feel like wtf is this
// String is quite universal among other programming languages, thats why its easy to transmit the data

// So we gotta interchange bw js object and string, for that we hv 2 methods from JSON class
//    JSON.parse
//    JSON.stringify

function jsonMethods(jsonString) {
  console.log("Original JSON String:", jsonString);

  // Parsing JSON string to JavaScript object
  let parsedObject = JSON.parse(jsonString);
  console.log("After JSON.parse():", parsedObject);

  // Stringifying JavaScript object to JSON string
  let jsonStringified = JSON.stringify(parsedObject);
  console.log("After JSON.stringify():", jsonStringified);
}

// Example Usage for JSON Methods
const sampleJSONString =
  '{"key": "value", "number": 42, "nested": {"nestedKey": "nestedValue"}}';

jsonMethods(sampleJSONString);
