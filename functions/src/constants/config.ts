require('dotenv').config();

const {
  ES_HOST = '127.0.0.1',
  ES_PORT = '9200',
  ES_NODE = 'http://localhost:9200',
} = process.env;
export { ES_HOST, ES_PORT, ES_NODE };
