import time
import openai
import tiktoken

class GPT:

  def connect_api(texts: list):  
    """
    Sends a prompt to GPT through api calls, accounts for token limit.

    Args:
      list: a list of strings pertaining additions to the prompt.

    Returns: 
      a generator object comprising of string chunks returned by GPT 
    
    """
    if (texts is None):
      raise ("Null parameters are not accepted for this method.")

    systemMsg = "You are a text adventure author. Your goal is to come up with a fun, but challenging adventure for players to advance through in order to reach a certain " + \
    "future goal. The player should encounter puzzles, characters to converse and interact with, and plenty of opportunities to explore. The player may succeed or " + \
    "fail when attempting to overcome challenges, based on how clever and plausible their solutions are. For open-ended puzzles, force the player to think rather than giving them " + \
    "a list of options. List the current items that the player has in their possession after every interaction. The player may only take or equip items that were described in the " + \
    "scene, and may always use an item in their inventory if there is a plausible cause for them to do so. Keep in mind that if an item's name or properties change, there " + \
    "should only be one instance of said item. The player can look for an item that could realistically be in the setting, the success of which is up to you, but cannot " + \
    "assert that they simply find an item. Draw a brief picture of the current area and the player's items using emojis. Remember, the player is exploring and interacting with " + \
    "your world, not creating it. Be sure to make your options engaging and impactful, rather than just simple path selection. Keep the setting and the player's position consistent. " + \
    "Try not to narrate what the player does unless they ask to do it."

    
    # for debugging, comment out when not using
    #systemMsg = "You are a helpful assistant. "

    if (texts[0]["role"] == "system"):
      systemMsg += texts[0]["content"]
      texts.pop(0)
    
    prompt =[
       {"role": "system", "content": systemMsg},
     ]
    prompt.extend(texts)

    # count and trim tokens
    allText = ""
    for c in prompt:
      allText += c["content"]
    
    enc = tiktoken.encoding_for_model("gpt-3.5-turbo")
    numTokens = len(enc.encode(allText))
    while (numTokens >= 500): # This number is our imposed token limit, if GPT is hallucinating too much we can increase it.
      item = prompt.pop(1) # remove second item because first one is system message
      numTokens -= len(enc.encode(item["content"]))
      
    #ADD THIS LATER :)
    #client = OpenAI(api_key=os.environ.get('API_Key'))

    client = openai.OpenAI(api_key="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")
    if (prompt is not None):
      try:
        response = client.chat.completions.create(
          model="gpt-3.5-turbo",
          stream =True,
          messages=prompt,
          temperature=0.8
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
