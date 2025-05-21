import type { Content, Channel } from "./types";

import "./App.css";

import classNames from "classnames";

function isChannel(obj: any): obj is Channel {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.collaborator_count === "number"
  );
}

function Block({ content }: { content: Content | Channel }) {
  // some MVP block versions
  // image
  // text
  // "link" --> anything that feels kind of like a URL snapshot
  // wait i found the field lol
  // class = "Image" | "Text" | "Link"

  const body = () => {
    if (isChannel(content)) {
      return (
        <p>
          CHANNEL 🔗{" "}
          <span style={{ fontStyle: "italic" }}>{content.title}</span>
        </p>
      );
    } else {
      if (content.class === "Image") {
        if (!content.image) {
          console.error("Image class should have image field");
          return;
        }
        return <img src={content.image.square.url}></img>;
      } else if (content.class === "Text") {
        if (!content.content) {
          console.error("Text class should have content field");
          return;
        }
        return <p>{content.content}</p>;
      } else if (content.class === "Link") {
        if (!content.source || !content.image) {
          console.error("Link class should have source and image fields");
          return;
        }
        return (
          <div>
            <img src={content.image.square.url}></img>
          </div>
        );
      } else if (content.class === "Media") {
        // spotify and youtube and stuff
        if (!content.image) {
          console.error("Media class should have image field");
          return;
        }
        return <img src={content.image.square.url}></img>;
      } else if (content.class === "Attachment") {
        // pdfs and stuff
        if (!content.image) {
          console.error("Attachment class should have image field");
          return;
        }
        return <img src={content.image.square.url}></img>;
      } else {
        // nothing i think
        console.log(content.class);
      }
    }
  };
  return (
    <div className="block">
      <p className="blockTitle">
        <a
          href={
            isChannel(content)
              ? `https://www.are.na/${content.user.slug}/${content.slug}`
              : `https://www.are.na/block/${content.id}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.title || "⋆.˚ ☾ .⭒˚"}
        </a>
      </p>
      <div
        className={classNames("content", {
          textContent: content.class === "Text",
        })}
      >
        {body()}
      </div>
    </div>
  );
}

export default Block;
