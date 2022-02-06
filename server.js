const express = require("express");
const mongoose = require("mongoose");

const app = express();


mongoose.connect('mongodb://localhost:27017/userList', 
	{
	 useNewUrlParser: true,
	 useUnifiedTopology: true,

	})
.then(()=>{
	console.log('connected');
	})
.catch((e)=>{
	console.log("Something went wrong", e);
	})

    app.use(express.json())
    app.use(require("./routes"))    


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))