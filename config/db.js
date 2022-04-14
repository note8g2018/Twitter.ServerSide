const mongoose = require("mongoose");

// eslint-disable-next-line no-undef
const MongoURI = process.env.DATABASE_URL;

const connectDB = async () =>
{
	try
	{
		await mongoose.connect(MongoURI, {
			useNewUrlParser: true,
			//useCreateIndex: true,
			useUnifiedTopology: true,
			//useFindAndModify: true,
			dbName: "compose",
		});
	}
	catch (error)
	{
		console.error(error);
	}
};

module.exports = connectDB;
