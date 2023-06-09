import {memo, useCallback, useLayoutEffect, useState} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function TextArea(props) {

  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name]
  );

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('TextArea');
  return (
    <textarea
      className={cn({theme: props.theme, resize: props.resize})}
      value={value}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

TextArea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  resize: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['vertical', 'horizontal'])])
}

TextArea.defaultProps = {
  onChange: () => {},
  theme: '',
  resize: false
}

export default memo(TextArea);
