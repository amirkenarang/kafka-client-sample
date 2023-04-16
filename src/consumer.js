require("dotenv").config();

const kafka = require("./modules/kafka");

const consumer = kafka.consumer({ groupId: process.env["KAFKA_GROUP"] });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env["KAFKA_TOPIC"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(topic);
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
