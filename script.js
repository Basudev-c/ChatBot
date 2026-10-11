const Gemini_API_Key = 'AQ.Ab8RN6IEr6ZSSYplKrfCfQ0qmEJ_D1fEocoqc6-ReyN9mFItcg';

const UserMsg = document.getElementById('UserMsg');
const BotResponse = document.getElementById('BotResponse');

const inputBox = document.getElementById('inputBox');
const sendBtn = document.getElementById('sendBtn');

const callGemani = async (message) => {
  const data = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': Gemini_API_Key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      }),
    },
  );

  const response = await data.json();

  const answer = response?.candidates?.[0]?.content?.parts?.[0]?.text;

  return answer;
};

sendBtn.addEventListener('click', async () => {
  const inputMsg = inputBox.value.trim();
  UserMsg.innerText = inputMsg;
  inputBox.value = '';

  const aiResponse = await callGemani(inputMsg);

  if (!aiResponse) {
    BotResponse.innerText = 'Try again';
  } else {
    BotResponse.innerText = aiResponse;
  }
});

inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendBtn.click();
  }
});
