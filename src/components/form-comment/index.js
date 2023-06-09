import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Field from "../field";
import TextArea from "../text-area";


function FormComment(props) {
  const cn = bem('FormComment');
  return (
    <form className={cn()} onSubmit={props.onSubmit}>
      <span className={cn('title')}>{props.title}</span>
      <Field>
        <TextArea type='text-area' theme='full'/>
      </Field>
      <Field>
        <button type='submit'>Ответить</button>
        {props.onClose && <button onClick={props.onClose}>Отмена</button>}
      </Field>
    </form>
  )
}

FormComment.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
}

FormComment.defaultProps = {
  onClose: () => {},
  onSubmit: () => {}
}

export default memo(FormComment);
