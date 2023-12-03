import os
import time
import openai

class GPT:

  def testgenerator(texts):
    s = ["a", "b", "c", "d"]
    for i in s:
      yield i
  def connect_api(texts):  
    if (texts is None):
       raise ("Null parameters are not accepted for this method.")

    prompt =[
        #comment out so we don't use a ton of tokens when testing unrelated things
        #{"role": "system", "content": "You are a text adventure author. Your goal is to set up a fun, but challenging, adventure for players to make their way through in order to reach a certain goal. The players may only use items that were described in the scene. List the current items that the player has in their possession after every interaction. If the player does not have any items, mention it. Do not put items into players possession unless told otherwise. Draw a picture of the current area using emojis. The player is exploring your world, not creating it. Make your options engaging and impactful, rather than just simple path selection."},
    
    ]
    prompt.extend(texts)
     #ADD THIS LATER :)
     #client = OpenAI(api_key=os.environ.get('API_Key'))
     
    client = openai.OpenAI(api_key="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")#Brock's personal key
    if (prompt is not None):
       try:
         response = client.chat.completions.create(
           model="gpt-3.5-turbo",
           stream =True,
           messages=prompt
         )
         for chunk in response:
           data = chunk.choices[0].delta.content
           if (data != None):
             yield data
             time.sleep(0.01)

       except openai.APIConnectionError as e:
         #Handle connection error here
         print(f"Failed to connect to OpenAI API: {e}")
         pass
       except openai.RateLimitError as e:
         #Handle rate limit error (we recommend using exponential backoff)
         print(f"OpenAI API request exceeded rate limit: {e}")
         pass
       except openai.APIError as e:
         #Handle API error here, e.g. retry or log
         print(f"OpenAI API returned an API Error: {e}")
         pass
    else:
       raise AttributeError("prompt recieved was None") 