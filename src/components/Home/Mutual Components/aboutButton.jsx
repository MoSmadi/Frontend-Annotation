import React, { Component } from "react";
import Modal from './modal';
// import Content from "./aboutContent";

class About extends Component
{
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  render() 
  {
    return (
              <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
                <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Hello Smadi </p>
        </Modal>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">
                  <span className="fashion-studio" onClick={this.showModal} >About</span>
              </a>
              </div>
    );
  }
};

export default About;
