import SelectComponent, {Props} from 'react-select';
import {SelectOption} from '../../types';

interface SelectProps extends Props<SelectOption, false> {
  name: string;
}

const Select: React.FC<SelectProps> = ({name, ...rest}) => {
  return (
    <SelectComponent
      name={name}
      className="react-select-wrapper"
      classNamePrefix="react-select"
      {...rest}
    />
  );
};

export default Select;
