import os
from openai import OpenAI

class GPT:

  def testgenerator():
    s = ["a", "b", "c", "d"]
    for i in s:
      yield i
    
  def connect_api(userMessage, assistantText):
    if (userMessage is None or assistantText is None):
      raise TypeError("Null inputs are not valid for this method.")
  
      yield s

  def connect_api(texts):  
    if (texts is None):
      raise ("Null parameters are not accepted for this method.")

    prompt =[
       {"role": "system", "content": "You are a text adventure author. Your goal is to set up a fun, but challenging, adventure for players to make their way through in order to reach a certain goal. The players may only use items that were described in the scene. List the current items that the player has in their possession after every interaction. If the player does not have any items, mention it. Do not put items into players possession unless told otherwise. Draw a picture of the current area using emojis. The player is exploring your world, not creating it. Make your options engaging and impactful, rather than just simple path selection."},
     ].append(texts)

    #ADD THIS LATER :)
    #client = OpenAI(api_key=os.environ.get('API_Key'))

    client = OpenAI(api_key="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")
    try:
      response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        stream ="true",
        messages=prompt
      )

    except OpenAI.APIError as e:
      #Handle API error here, e.g. retry or log
      print(f"OpenAI API returned an API Error: {e}")
      pass
    except OpenAI.APIConnectionError as e:
      #Handle connection error here
      print(f"Failed to connect to OpenAI API: {e}")
      pass
    except OpenAI.RateLimitError as e:
      #Handle rate limit error (we recommend using exponential backoff)
      print(f"OpenAI API request exceeded rate limit: {e}")
      pass
      
    yield response.chunk