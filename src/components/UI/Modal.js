import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackDrop = ({ hideCartHandler }) => {
  return <div className={classes.backdrop} onClick={hideCartHandler}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const backdropElement = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop hideCartHandler={props.hideCartHandler}></BackDrop>,
        backdropElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        backdropElement
      )}
    </>
  );
};

export default Modal;
