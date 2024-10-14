import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
	try {
		await connect(process.env.MONGODB_URL)
	} catch (err) {
		console.log("Error: " + err)
		throw new Error("Cannot connect to MongoDB")
	}
}

async function disconnectFromDatabase() {
	try {
		await disconnect()
	} catch (err) {
		console.log("Error: " + err)
		throw new Error("Cannot disconnect from MongoDB")
	}
}


export {disconnectFromDatabase, connectToDatabase}