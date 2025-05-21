import { useState, useEffect } from "react";
import "./App.css";
// import Content from "./posts/example.mdx";
import Post from "./posts/jordan-baker.mdx";
import Reading from "./posts/reading.mdx";
import classNames from "classnames";

import type { Contents, Content, Channel } from "./types";

import Block from "./Block";
import Info from "./Info";

const PAGE_LENGTH = 20;

function App() {
  const [displayInfo, setDisplayInfo] = useState(false);
  const [showReading, setShowReading] = useState(true);
  const [blocks, setBlocks] = useState<(Content | Channel)[]>([]);
  const [loading, setLoading] = useState(false);
  const [arenaFinished, setArenaFinished] = useState(false);

  const getNextPage = async () => {
    if (arenaFinished) return;
    setLoading(true);
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
      const finalPage = json.contents.some((elt) => elt.position === 1);
      setArenaFinished(finalPage);
      setBlocks([...blocks, ...json.contents]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        throw err;
      }
    }
    setLoading(false);
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
          {!arenaFinished && (
            <div id="arenaNextContainer">
              <button onClick={() => getNextPage()} disabled={loading}>
                {loading ? "loading..." : "show more"}
              </button>
            </div>
          )}
        </div>
      </div>
      {displayInfo && <Info setDisplayInfo={setDisplayInfo} />}
    </>
  );
}

export default App;
