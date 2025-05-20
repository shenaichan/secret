import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Content from "./posts/example.mdx";
import Post from "./posts/jordan-baker.mdx";
import Reading from "./posts/reading.mdx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <div>
        <h1 id="title">secret@shenaichan ⋆.˚ ☾ .⭒˚ </h1>
        <p>about</p>
        <p>22 / they / queer</p>

        <p>what is this?</p>
        <p>i spent a lot of time on tumblr growing up </p>
      </div>
      <div className="readerContainer">
        <p>by me</p>
        <div className="reader">
          <div className="post">
            <div className="time">
              <p>2025.05.20</p>
              <p>00:34</p>
            </div>
            <Content />
          </div>
          <div className="post">
            <div className="time">
              <p>2025.05.20</p>
              <p>00:34</p>
            </div>
            <Post />
          </div>
          <div className="post">
            <div className="time">
              <p>2025.05.20</p>
              <p>00:34</p>
            </div>
            <Reading />
          </div>
        </div>
      </div>
      <div className="readerContainer">
        <p>by others</p>
        <div className="reader"></div>
      </div>
    </main>
  );
}

export default App;
