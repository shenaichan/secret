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

export default Info;
