import {useState} from 'react';

type DropdownProps = {
  head: React.ReactNode;
  children: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({head, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/30"
          onClick={closeDropdown}
        />
      )}

      <div className="relative z-[9999]">
        <div onClick={toggleDropdown} className="cursor-pointer">
          {head}
        </div>

        {isOpen && (
          <div className="absolute mt-2 right-0 bg-white border rounded-lg border-zinc-300 w-fit px-4 py-1">
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
