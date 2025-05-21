import { useState, useEffect } from "react";
import "./App.css";
// import Content from "./posts/example.mdx";
import Post from "./posts/jordan-baker.mdx";
import Reading from "./posts/reading.mdx";
import classNames from "classnames";

import type { Contents, Content, Channel } from "./types";

import Block from "./Block";

const PAGE_LENGTH = 20;

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
          are yoinked from my single{" "}
          <a
            href="https://www.are.na/shenai-chan-8xbf6dstbgs/thought-nzylye7xtr4"
            target="_blank"
            rel="noopener noreferrer"
          >
            are.na board
          </a>{" "}
          where i put nearly everything that interests me (e.g. blog posts, art,
          books)
        </li>
      </ol>
      <p>
        the answer to "why did you make that design decision" is invariably: i
        spent a lot of time on tumblr growing up :)
      </p>
      <p>thank you for coming and enjoy your stay xoxoxo {"<3"}</p>
      <p
        style={{ marginBottom: "0" }}
        className={classNames("buttonText", "invertButtonText")}
        onClick={() => setDisplayInfo(false)}
      >
        close
      </p>
    </div>
  );
}

function App() {
  const [displayInfo, setDisplayInfo] = useState(false);
  const [showReading, setShowReading] = useState(true);
  const [blocks, setBlocks] = useState<(Content | Channel)[]>([]);

  const getNextPage = async () => {
    const url = `https://api.are.na/v2/channels/thought-nzylye7xtr4/contents`;
    try {
      const currPage = Math.floor(blocks.length / PAGE_LENGTH) + 1;
      const response = await fetch(
        `${url}?sort=position&direction=desc&page=${currPage}`
      );
      if (!response.ok) {
        throw new Error("Network error fetching next page");
        // TODO: Something about auth here
      }
      const json: Contents = await response.json();
      setBlocks([...blocks, ...json.contents]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {
    getNextPage();
  }, []);

  return (
    <>
      <div id="all">
        <div id="sidebar">
          <h1 id="title">secret@shenaichan ⋆.˚ ☾ .⭒˚ </h1>
          <div id="options">
            <p className="buttonText" onClick={() => setDisplayInfo(true)}>
              what is this?
            </p>
            <p
              id="readWriteToggle"
              className="buttonText"
              onClick={() => setShowReading(!showReading)}
            >
              show {showReading ? "reading" : "writing"}
            </p>
          </div>
        </div>
        <div
          id="left"
          className={classNames({ invisible: !showReading }, "reader")}
        >
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

        <div
          id="right"
          className={classNames({ invisible: showReading }, "reader")}
        >
          {blocks.map((elt) => (
            <Block key={elt.id} content={elt} />
          ))}
        </div>
      </div>
      {displayInfo && <Info setDisplayInfo={setDisplayInfo} />}
    </>
  );
}

export default App;
