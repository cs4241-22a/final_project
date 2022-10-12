
const express = require('express'),
cors = require('cors'),
mongoose = require('mongoose'),
mongodb = require('mongodb'),
cookieSession = require('cookie-session'),
path = require('path')
app = express(),
compression = require('compression'),
port = 3000

require('dotenv').config()


app.use(express.json())
app.use(compression())
app.use(express.static('./client/build'))
app.use(cors());
app.use(express.json)



//MONGODB with Mongooose
const db = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST;
mongoose
.connect(db, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {
console.log('Connected to MongoDB ...');
})
.catch(err => {
console.error('Could not Connect to MongoDb !!!', err);
});



const Image = mongoose.model(
'image',
mongoose.Schema({
imageUrl: String
})
);


//////////////////// GET DATA ////////////////////
app.get('/getLatest', async (req, res) => {
const getImage = await Image.findOne().sort({ _id: -1 });
res.json(getImage.imageUrl);
});
//////////////////////////////////////////////////

//////////////////// POST DATA ///////////////////
app.post('/upload', async (req, res) => {
try {
console.log("HERE...")
const newImage = new Image({
imageUrl: req.body.imageUrl
});
await newImage.save();
res.json(newImage.imageUrl);
} catch (err) {
console.error('Something went wrong', err);
}
});
//////////////////////////////////////////////////

app.listen(3001, (e) => {
console.log('started up server')
})