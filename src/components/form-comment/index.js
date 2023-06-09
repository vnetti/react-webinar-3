import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import TextArea from "../text-area";


function FormComment(props) {
  const cn = bem('FormComment');

  return (
    <form className={cn({reply: props.isReply})} onSubmit={props.onSubmit}>
      <span className={cn('title')}>{props.title}</span>
      <TextArea value={props.commentText} onChange={props.onChange} type='text-area' theme='full'/>
      <div className={cn('actions')}>
        <button type='submit'>Отправить</button>
        {props.onClose && <button onClick={props.onClose}>Отмена</button>}
      </div>
    </form>
  )
}

FormComment.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  isReply: PropTypes.bool,
  commentText: PropTypes.string,
  onChange: PropTypes.func,
}

FormComment.defaultProps = {
  onSubmit: () => {},
  isReply: false
}

export default memo(FormComment);
