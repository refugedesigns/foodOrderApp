import React, {Fragment} from 'react'
import ReactDom from 'react-dom'

import classes from './Modal.module.css'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onCloseModal}></div>;
}

const ModalOverlay = (props) => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}>{props.children} </div>
      </div>
    );
}

const Modal = (props) => {
    const portalElement = document.getElementById('backdrop')
    return (
      <Fragment>
        {ReactDom.createPortal(<Backdrop {...props} />, portalElement)}
        {ReactDom.createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
}

export default Modal
