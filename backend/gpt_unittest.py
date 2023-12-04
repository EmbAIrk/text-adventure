import unittest
import gpt
from importlib import reload
reload(gpt)

class TestGPT(unittest.TestCase):

    #def test_connect_api_null(self):
        #with self.assertRaises(Exception):
            #gpt.connect_api(None)

    def test_connect_api_success(self):
        texts=[
            {"role": "assistant", "content": "You are a helpful assistant!"},
            {"role": "user", "content": "Write me a story about an cool knight."}
        ]

        actual_result = gpt.connect_api(texts)
        expected_result = "Test"

        self.assertEqual(expected_result, actual_result)

if __name__ == '__main__':
    unittest.main()