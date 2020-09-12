import React, { Fragment } from "react";

export default function CopyArea({
  copyColor,
  showCopy,
  hoverEffect,
  divId,
  randomLoad,
  color2,
  color,
  copied
}) {
  return (
    <Fragment>
      <div className='card-copy-div'>
        <h3
          style={{
            color: copyColor,
            opacity: !showCopy ? "0" : "1"
          }}
          onMouseEnter={e => hoverEffect(e)}
          id={divId}
          className='card-copy-copy'
        >
          {randomLoad ? color : color2}
        </h3>
        <h3
          style={{ color: copyColor, opacity: !showCopy ? "0" : "1" }}
          onMouseEnter={e => hoverEffect(e)}
          id={divId}
          className='card-copy-copy'
        >
          {!copied ? "Click to Copy" : "Copied!"}
        </h3>
      </div>
      <div className='card-copy-div-mobile'>
        <h3
          style={{
            color: copyColor
          }}
          onMouseEnter={e => hoverEffect(e)}
          id={divId}
          className='card-copy-copy'
        >
          {randomLoad ? color : color2}
        </h3>
        <h3
          style={{ color: copyColor }}
          onMouseEnter={e => hoverEffect(e)}
          id={divId}
          className='card-copy-copy'
        >
          {!copied ? "Click to Copy" : "Copied!"}
        </h3>
      </div>
    </Fragment>
  );
}
