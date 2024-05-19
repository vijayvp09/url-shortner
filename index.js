const express = require("express");
const urlRoute = require("./routes/url");
const { connectMongodb } = require("./connection");
const URL = require("./models/url");

connectMongodb("mongodb+srv://vvpillai95:krishnakaali@cluster0.mvkot8g.mongodb.net/short-url?retryWrites=true&w=majority&appName=Cluster0/")
.then(() => console.log("connected to database"))
.catch((err) => console.log(err));


const app = express();
const PORT = 8001;

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortId,
        }, 
        { 
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                },
            }
        })
    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`listening through port ${PORT}`));