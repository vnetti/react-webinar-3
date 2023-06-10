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
      <TextArea autoFocus={props.autoFocus} value={props.commentText} onChange={props.onChange} type='text-area' theme='full'/>
      <div className={cn('actions')}>
        <button type='submit'>{props.t('comments.submit')}</button>
        {props.onClose && <button onClick={props.onClose}>{props.t('comments.cancel')}</button>}
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
  t: PropTypes.func,
  autoFocus: PropTypes.bool
}

FormComment.defaultProps = {
  onSubmit: () => {},
  isReply: false,
  t: text => text,
  autoFocus: false
}

export default memo(FormComment);
