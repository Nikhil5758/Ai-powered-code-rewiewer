import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
  try {
    const response = await axios.post(
      "http://localhost:3000/ai/get-review",
      { code }
    );

    setReview(response.data.review);
  } catch (error) {
    console.error(error);
    setReview("Failed to get response from server");
  }
}



  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>

        <div onClick={reviewCode} className="review">
          {loading ? "Reviewing..." : "Review"}
        </div>
      </div>

      <div className="right">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!error && (
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        )}
      </div>
    </main>
  );
}

export default App;
