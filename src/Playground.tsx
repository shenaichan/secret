import { useState, useEffect, useRef } from "react";
import Block from "./Block";
import Info from "./Info";

import "./App.css";
import "./Playground.css";
// import classNames from "classnames";

import type { Contents, Content, Channel } from "./types";
import { isChannel } from "./Block";

// type Posts = Record<string, { default: FC }>;
// const postFiles = import.meta.glob("./posts/*.mdx", { eager: true }) as Posts;
// import postTimes from "./postslist.json";

// import { fmtDate, fmtTime } from "./utils";

type SearchState = "empty" | "searching" | "found";

function Playground() {
  const [displayInfo, setDisplayInfo] = useState(false);
  // const [showReading, setShowReading] = useState(true);
  const [blocks, setBlocks] = useState<(Content | Channel)[]>([]);
  const [matchingBlocks, setMatchingBlocks] = useState<(Content | Channel)[]>(
    []
  );
  const [currInput, setCurrInput] = useState("");
  const [timeoutId, setTimeoutId] = useState(-1);
  const [searching, setSearching] = useState<SearchState>("empty");

  const inputRef = useRef<HTMLInputElement>(null);
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
        setMatchingBlocks((blocks) => [...blocks, ...json.contents]);
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
    const handleInputJump = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        inputRef.current &&
        !(
          // if we're not currently highlighting an input box
          (
            document.activeElement &&
            ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
          )
        )
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (
        e.key === "Escape" &&
        inputRef.current &&
        inputRef.current === document.activeElement
      ) {
        inputRef.current.blur();
      }
    };

    window.addEventListener("keydown", handleInputJump);

    getNextPage();

    return () => {
      window.removeEventListener("keydown", handleInputJump);
      // setBlocks([]);
      // setMatchingBlocks([]);
      // setSearching("empty");
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    clearTimeout(timeoutId);

    if (currInput.trim()) {
      setSearching("searching");
      const tid = setTimeout(() => {
        // console.log("finally stopped typing");

        const search = (q: string) => {
          q = q.toLowerCase();
          const newMatchingBlocks = blocks.filter((elt) => {
            if (isChannel(elt)) {
              return elt.title.toLowerCase().includes(q);
            }

            return (
              elt.title.toLowerCase().includes(q) ||
              elt.description?.toLowerCase().includes(q) ||
              elt.content?.toLowerCase().includes(q) ||
              elt.source?.url.toLowerCase().includes(q) ||
              elt.source?.title?.toLowerCase().includes(q)
            );
          });
          if (!ignore) {
            setMatchingBlocks(newMatchingBlocks);
            setSearching("found");
          }
        };

        search(currInput.trim());
      }, 300);
      setTimeoutId(tid);
    } else {
      setSearching("empty");
      setMatchingBlocks(blocks);
    }
    return () => {
      ignore = true;
    };
  }, [currInput]);

  return (
    <>
      <div id="all">
        <div id="searchwrapper">
          <input
            id="search"
            ref={inputRef}
            placeholder="search for block..."
            value={currInput}
            onChange={(e) => {
              setCurrInput(e.target.value);
            }}
          />
        </div>
        {/* <h1 id="title">secret@shenaichan ⋆.˚ ☾ .⭒˚ </h1>
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
          </div> */}
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

        <div id="board" className="reader">
          {matchingBlocks.map((elt) => (
            <Block key={elt.id} content={elt} />
          ))}
          {searching === "found" && matchingBlocks.length === 0 && (
            <p style={{ gridColumn: "1 / -1" }}>Sorry, no blocks found :(</p>
          )}
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
