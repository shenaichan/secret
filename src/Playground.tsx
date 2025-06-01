import { useState, useEffect } from "react";
import Block from "./Block";
import Info from "./Info";

import "./App.css";
import "./Playground.css";
import classNames from "classnames";

import type { Contents, Content, Channel } from "./types";

// type Posts = Record<string, { default: FC }>;
// const postFiles = import.meta.glob("./posts/*.mdx", { eager: true }) as Posts;
// import postTimes from "./postslist.json";

// import { fmtDate, fmtTime } from "./utils";

function Playground() {
  const [displayInfo, setDisplayInfo] = useState(false);
  const [showReading, setShowReading] = useState(true);
  const [blocks, setBlocks] = useState<(Content | Channel)[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [arenaFinished, setArenaFinished] = useState(false);

  const getNextPage = async () => {
    // if (arenaFinished) return;
    // setLoading(true);
    const url = `https://api.are.na/v2/channels/thought-nzylye7xtr4/contents`;
    try {
      let page = 1;
      let finalPage = false;
      while (!finalPage) {
        const response = await fetch(
          `${url}?sort=position&direction=desc&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network error fetching next page");
          // TODO: Something about auth here
        }
        const json: Contents = await response.json();
        finalPage = json.contents.some((elt) => elt.position === 1);
        // setArenaFinished(finalPage);
        setBlocks((blocks) => [...blocks, ...json.contents]);
        page++;
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        throw err;
      }
    }
    // setLoading(false);
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
        {/* <div
          id="left"
          className={classNames({ invisible: !showReading }, "reader")}
        >
          {postTimes.map(([title, time], idx) => {
            const path = `./posts/${title}.mdx`;
            if (!(path in postFiles)) return;

            const Post = postFiles[path].default;
            const date = new Date(time);
            return (
              <div className="post" key={idx}>
                <div className="time">
                  <p>{fmtDate(date)}</p>
                  <p>{fmtTime(date)}</p>
                </div>
                <Post />
              </div>
            );
          })}
        </div> */}

        <div
          id="board"
          className={classNames({ invisible: showReading }, "reader")}
        >
          {blocks.map((elt) => (
            <Block key={elt.id} content={elt} />
          ))}
          {/* {!arenaFinished && (
            <div id="arenaNextContainer">
              <button onClick={() => getNextPage()} disabled={loading}>
                {loading ? "loading..." : "show more"}
              </button>
            </div>
          )} */}
        </div>
      </div>
      {displayInfo && <Info setDisplayInfo={setDisplayInfo} />}
    </>
  );
}

export default Playground;
