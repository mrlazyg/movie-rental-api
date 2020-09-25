const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MONGODB_URI, DB_OPTIONS } = require('./constant');

console.log('Connecting...');
/* mongoose.connect() returns a Promise */
mongoose.connect(MONGODB_URI, DB_OPTIONS, (err) => {
  if (err) {
    console.error('⚠️! Unable to connect to db...', err.message);
    throw new Error(err);
  }
  console.log(`Connected to ${DB_OPTIONS.dbName} db...`);
});

/* //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:')); */

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 150,
    },
    author: String,
    topics: [String],
    isAvailable: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: function () {
        return this.isAvailable;
      },
      min: 29,
      max: 99,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { collection: 'COURSES' }
);
const Course = mongoose.model('Course', courseSchema);

const course = new Course({
  name: 'Angular',
  topics: ['angular', 'frontend'],
  author: 'Author1',
  price: 35,
});

/* course.save((err, res) => {
  if (err) console.log(err.message);
  console.log("Document saved!");
  console.log("Response :", res);
  process.exit(0);
});
 */

async function saveDoc(doc) {
  try {
    const result = await doc.save();
    console.log('Document saved!');
    console.log(result);
  } catch (error) {
    console.log(error.message);
  } finally {
    process.exit(0);
  }
}

saveDoc(course);

/* Close connection */
/* mongoose.connection.close((err) => {
  if (err) console.log(err);
  console.log("Connection closed");
  process.exit(0);
});
 */
