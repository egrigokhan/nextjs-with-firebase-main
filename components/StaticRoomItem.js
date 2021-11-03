import React, { Component } from "react";

export default class StaticRoomItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="static-dialog" style={{}}>
        <div
          className="Contents"
          onClick={() => {
            console.log("clicked...");
          }}
        >
          <img
            src="https://miro.medium.com/max/700/1*5AyYzOlGlv501PlJlIdZZQ.jpeg"
            style={{
              width: "100px",
              height: "100px"
            }}
          />
        </div>
      </div>
    );
  }
}
