import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Scrim } from 'cauldron-react'

const Modal = ({ header, children, show, footer, ...other }) => (
  <Fragment>
    <div role="dialog" {...other} className={classNames('dqpl-modal', {
      'dqpl-dialog-show': show
    })}>
      <div className="dqpl-dialog-inner">
        <div className="dqpl-modal-header">{header}</div>
        <div className="dqpl-content">{children}</div>
        <div className="dqpl-modal-footer">{footer}</div>
      </div>
    </div>
    <Scrim show={show} />
  </Fragment>
)

Modal.displayName = 'Modal'
Modal.defaultProps = {
  show: false
}
Modal.propTypes = {
  header: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool
}
export default Modal