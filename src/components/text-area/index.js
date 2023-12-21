import {memo, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import './style.css';

function TextArea(props) {
  const [value, setValue] = useState(props.value);
  const textareaRef = useRef(null);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name]
  );

  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  useLayoutEffect(() => setValue(props.value), [props.value]);
  
  return (
    <textarea
      className={'TextArea'}
      value={value}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

TextArea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
}

TextArea.defaultProps = {
  onChange: () => {
  },
  type: 'text',
  theme: ''
}

export default memo(TextArea);
