from openai import OpenAI

class GPT:
  
  def testgenerator():
    s = ["a", "b", "c", "d"]
    for i in s:
      yield s
    
  def connect_api(userMessage, assistantText):
    if (userMessage is None or assistantText is None):
      raise TypeError("Null inputs are not valid for this method.")
  
    client = OpenAI(api_key="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")
    try:
      response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        stream ="true",
        messages=[
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "assistant", "content": assistantText},
          {"role": "user", "content": userMessage}
        ]
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