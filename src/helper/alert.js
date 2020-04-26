import React from "react";

export default class Alert extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
              This is received from another component : {this.props.messageTitle}
              <br/>
              hell0: {this.props.messageType}
          </div>
        );
    }
}