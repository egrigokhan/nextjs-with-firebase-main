import React, { Component } from "react";

export default class RoomItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diffX: 0,
      diffY: 0,
      dragging: false,
      styles: {}
    };

    this._dragStart = this._dragStart.bind(this);
    this._dragging = this._dragging.bind(this);
    this._dragEnd = this._dragEnd.bind(this);
  }

  _dragStart(e) {
    console.log(e.screenX);
    console.log(e.currentTarget.getBoundingClientRect().left);
    this.setState({
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true
    });
  }

  _dragging(e) {
    if (this.state.dragging) {
      const transform = document
        .getElementById("panner")
        .children[0].style.getPropertyValue("transform");
      var values = transform.split("(")[1].split(")")[0].split(",");
      console.log(values);
      var left =
        (-parseFloat(values[4]) + (e.screenX - this.state.diffX)) /
        parseFloat(values[0]);
      var top =
        (-parseFloat(values[5]) + (e.screenY - this.state.diffY)) /
        parseFloat(values[0]);
      this.setState({
        styles: {
          left: Math.round(left / 10) * 10,
          top: Math.round(top / 10) * 10
        }
      });
    }
  }

  _dragEnd() {
    this.setState({
      dragging: false
    });
  }

  render() {
    var classes = this.props.show ? "Dialog" : "Dialog hidden";
    return (
      <div
        className={classes}
        style={{
          ...this.state.styles,
          boxShadow: this.props.shadow ? "0px 8px 6px 0px rgba(0,0,0,0.26)" : ""
        }}
        onMouseDown={this._dragStart}
        onMouseMove={this._dragging}
        onMouseUp={this._dragEnd}
        onMouseLeave={this._dragEnd}
      >
        <div
          className="Contents"
          onClick={() => {
            console.log("clicked...");
          }}
        >
          <img
            class="non-interactable-image"
            src="https://miro.medium.com/max/700/1*5AyYzOlGlv501PlJlIdZZQ.jpeg"
            style={{
              width: "100%",
              height: "100%"
            }}
          />
        </div>
      </div>
    );
  }
}
