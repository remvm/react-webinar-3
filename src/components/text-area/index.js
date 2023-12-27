import {memo, useCallback, useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import './style.css';

function TextArea(params) {
  const [value, setValue] = useState(params.value);

  const onChangeDebounce = useCallback(
    debounce(value => params.onChange(value, params.name), 600),
    [params.onChange, params.name]
  );

  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  useLayoutEffect(() => setValue(params.value), [params.value]);
  
  return (
    <textarea
      className={'TextArea'}
      value={value}
      placeholder={params.placeholder}
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
