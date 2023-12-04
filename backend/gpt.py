import time
import openai
import tiktoken

class GPT:

  def testgenerator():
    s = ["a", "b", "c", "d"]
    for i in s:
      yield i

  def connect_api(texts: list):  
    if (texts is None):
      raise ("Null parameters are not accepted for this method.")

    systemMsg = "You are a text adventure author. Your goal is to set up a fun, but challenging, adventure for players " + \
                 "to make their way through to reach a certain goal. The players may only use items that were described in the scene. " + \
                 "On each response, list the current items the player has in their possession in an unordered HTML list. If the player does not have any items, mention it. " + \
                 "Do not put items into players possession unless told otherwise. Draw a picture of the current area using emojis. " + \
                 "The player is exploring your world, not creating it. Make your options engaging and impactful, rather than just simple path selection. "
    
    # for debugging, comment out when not using
    # systemMsg = "You are a helpful assistant. "

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
    
    """enc = tiktoken.encoding_for_model("gpt-3.5-turbo")
    numTokens = len(enc.encode(allText))
    while (numTokens >= 500): # This number is our imposed token limit, if GPT is hallucinating too much we can increase it.
      item = prompt.pop(1) # remove second item because first one is system message
      numTokens -= len(enc.encode(item["content"]))"""
      
    #ADD THIS LATER :)
    #client = OpenAI(api_key=os.environ.get('API_Key'))

    client = openai.OpenAI(api_key="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")
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