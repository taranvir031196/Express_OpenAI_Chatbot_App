const { Configuration, OpenAIApi } = require("openai")
const express = require('express')
var bodyParser = require('body-parser')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

const openai = new OpenAIApi(new Configuration({
    //replace your-api key with your API key from ChatGPT
    apiKey: process.env.API_KEY
}));

app.post("/chat", async (req, res) => {
    try {
        const resp = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: req.body.question }
            ]
        })

        res.status(200).json({ message: resp.data.choices[0].message.content })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

app.listen(PORT, () => {
    console.log(`OpenAI Chatbot is active on ${PORT}`)
})
