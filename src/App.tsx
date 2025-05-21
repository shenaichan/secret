import { useState } from "react";
import "./App.css";
import Content from "./posts/example.mdx";
import Post from "./posts/jordan-baker.mdx";
import Reading from "./posts/reading.mdx";
import classNames from "classnames";

function Info({
  setDisplayInfo,
}: {
  setDisplayInfo: (displayInfo: boolean) => void;
}) {
  return (
    <div id="infoPopup">
      <p>
        my name is shenai and this is my semi-secret personal microblogging
        platform.
      </p>
      <p>there are two main feeds:</p>
      <ol>
        <li>
          things i've written, usually 1-4 paragraph length posts about personal
          things, media i'm thinking about, &c.
        </li>
        <li>
          things other people have made; various flavors of inspiration. these
          are yoinked from my single are.na board where i put nearly everything
          that interests me (e.g. blog posts, art, books)
        </li>
      </ol>
      <p>
        the answer to "why did you make that design decision" is invariably: i
        spent a lot of time on tumblr growing up :)
      </p>
      <p>thank you for coming and enjoy your stay xoxoxo {"<3"}</p>
      <button onClick={() => setDisplayInfo(false)}>close</button>
    </div>
  );
}

function App() {
  const [displayInfo, setDisplayInfo] = useState(false);
  return (
    <>
      {displayInfo && <Info setDisplayInfo={setDisplayInfo} />}
      <div id="all">
        <div id="sidebar">
          <h1 id="title">secret@shenaichan ⋆.˚ ☾ .⭒˚ </h1>
          <p className="buttonText" onClick={() => setDisplayInfo(true)}>
            what is this?
          </p>
        </div>
        <div id="left" className="reader">
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

        <div id="right" className="reader">
          <div className="post">
            <div className="time">
              <p>2025.05.20</p>
              <p>00:34</p>
            </div>
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
