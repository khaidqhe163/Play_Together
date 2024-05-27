import PropTypes from "prop-types"
// import cn from "src/lib/classnames"
import cn from "../../../lib/classnames"
import { ModalWrapper } from "./styled"

import styles from "./styles.module.scss"
import "./style.css"

export default function CustomModal(props) {
  const { children, className, tilteStart } = props

  return (
    <ModalWrapper
      width={1180}
      style={{ top: 20 }}
      {...props}
      className={cn(className, { [styles.titleFlexStart]: tilteStart })}
      maskTransitionName=""
    >
      {children}
    </ModalWrapper>
  )
}
CustomModal.propTypes = {
  tilteStart: PropTypes.bool,
  className: PropTypes.string,
}

CustomModal.defaultProps = {
  tilteStart: true,
  className: "",
}
