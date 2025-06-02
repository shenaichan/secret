import classNames from "classnames";
import About from "./posts/about.mdx";

function Info({
  setDisplayInfo,
}: {
  setDisplayInfo: (displayInfo: boolean) => void;
}) {
  return (
    <div id="infoPopup">
      <About />
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
