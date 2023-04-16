require('dotenv').config()
const { Kafka } = require('kafkajs')

const bootstrapServer =
  process.env['KAFKA_BOOTSTRAP_SERVER'] || 'localhost:9092'
const username = process.env['KAFKA_USERNAME'] || 'admin'
const password = process.env['KAFKA_PASSWORD'] || '123456'
const sasl =
  username && password ? { username, password, mechanism: 'plain' } : null

const kafka = new Kafka({
  brokers: [bootstrapServer],
  ssl: false,
  sasl,
})

module.exports = kafka
