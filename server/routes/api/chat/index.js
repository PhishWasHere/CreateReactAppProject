const router = require('express').Router();


const Configuration = require('openai-edge').Configuration;
const OpenAIApi = require('openai-edge').OpenAIApi;
const OpenAIStream = require('ai').OpenAIStream;
const StreamingTextResponse = require('ai').StreamingTextResponse;


const config = new Configuration({ //openai config
    apiKey: process.env.OPENAI_API,
});


const openai = new OpenAIApi(config);

exports.runtime = 'edge'

router.post('/', async (req, res) => {
    try {
      const json = await req.json();
      const { messages } = json;
  
      const initComment = [];
  
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [...initComment, ...messages.map((message) => ({
          content: message.content,
          role: message.role
        }))]
      });
  
      console.log(response, 'response', messages, 'messages');
  
      const stream = await OpenAIStream(response, {
        onCompletion: async (completion) => {
          // Handle the completion of the AI response here
        }
      });
  
      return new StreamingTextResponse(stream);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', (req, res) => {
    res.send('Hello Chat!')
    }
);

module.exports = router;