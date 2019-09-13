import { h } from 'preact';
import { combineClasses } from '../utils/combine-classes';

import './text-field.css';

const TextField = ({ className, ...props }) => {
  return (
    <input className={combineClasses('text-field', className)} {...props} />
  );
};

export default TextField;
