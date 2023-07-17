const router = require('express').Router();

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({ //openai config
    apiKey: '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' //move to env
});

const openai = new OpenAIApi(config);


router.post('/', async (req, res) => {
  const history = [];
  const init = [
    {
      role: "system",
      content: 'You are GPT, a helpful AI assistant.',
    },
    {
      role: "user",
      content: 'Hello, who are you?',
    },
    {
      role: "assistant",
      content: 'I am GPT, a helpful AI assistant.',
    },
  ]
  try {
    const { message, role } = req.body;
    console.log(req.body);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages:  
        {
        content: message,
        role:  "user",
        }
      
    });

    console.log(response.data.choices[0].message);
    res.json({ messages: response.data.messages });
      
    } catch (err) {
      console.error();
      res.status(500).json({ err: 'Internal server error' });
    }
});

router.get('/', (req, res) => {
    res.send('Hello Chat!')
    }
);

module.exports = router;