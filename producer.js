require("dotenv").config();

const kafka = require("./modules/kafka");

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  let i = 0;

  // after the produce has connected, we start an interval timer
  setInterval(async () => {
    try {
      // send a message to the configured topic with
      // the key and value formed from the current value of `i`

      await producer.send({
        topic: process.env["KAFKA_TOPIC"],
        messages: [
          {
            key: "MyKey",
            value: JSON.stringify({
              publishedDate: new Date(),
              data: {
                name: "Amir",
                family: "Kenarang",
                email: "amir.kenarang@gmail.com",
              },
            }),
          },
        ],
      });

      // if the message is written successfully, log it and increment `i`
      console.log("writes: ", i);
      i++;
    } catch (err) {
      console.error("could not write message " + err);
    }
  }, 5000);
};

run().catch(console.error);
