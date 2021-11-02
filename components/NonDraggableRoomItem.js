import React, { Component } from "react";

export default class NonDraggableRoomItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var classes = this.props.show ? "Dialog" : "Dialog hidden";
    return (
      <div
        className={classes}
        style={{
          left: this.props.item.position.x,
          top: this.props.item.position.y,
          boxShadow: this.props.shadow
            ? "0px 8px 6px 0px rgba(0,0,0,0.26)"
            : "",
          backgroundColor: this.props.item.matting.applied
            ? this.props.item.matting.color
            : "white"
        }}
        onMouseDown={this._dragStart}
        onMouseMove={this._dragging}
        onMouseUp={this._dragEnd}
        onMouseLeave={this._dragEnd}
      >
        <div
          className="Contents"
          style={{
            padding: this.props.item.matting.applied
              ? this.props.item.matting.percentage
              : 0,
            border: `solid ${
              this.props.item.frame.applied ? this.props.item.frame.width : "0"
            }px ${
              this.props.item.frame.applied ? this.props.item.frame.color : ""
            }`
          }}
          onClick={() => {
            console.log("clicked...");
          }}
        >
          <img
            class="non-interactable-image"
            src={this.props.item.image_url}
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
