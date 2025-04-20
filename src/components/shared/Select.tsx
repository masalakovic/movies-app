import SelectComponent, {components, Props} from 'react-select';
import {FiChevronDown} from 'react-icons/fi';
import {IoClose} from 'react-icons/io5';

export type SelectOption = {
  value: number;
  label: string;
};
interface SelectProps extends Props<SelectOption, false> {
  name: string;
}

const Select: React.FC<SelectProps> = ({name, ...rest}) => {
  return (
    <SelectComponent
      name={name}
      className="react-select-wrapper"
      classNamePrefix="react-select"
      components={{
        DropdownIndicator: (props) => (
          <components.DropdownIndicator {...props}>
            <FiChevronDown />
          </components.DropdownIndicator>
        ),
        ClearIndicator: (props) => (
          <components.ClearIndicator {...props}>
            <IoClose />
          </components.ClearIndicator>
        ),
      }}
      {...rest}
    />
  );
};

export default Select;
