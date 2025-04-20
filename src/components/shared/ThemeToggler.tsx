import useDarkMode from '../../hooks/useDarkMode';

const ToggleDarkMode: React.FC<{className?: string}> = ({className}) => {
  const {toggleDarkMode, isDarkMode} = useDarkMode();

  return (
    <div
      onClick={toggleDarkMode}
      className={`relative w-12 h-6 rounded-3xl bg-slate-300 dark:bg-zinc-700 place--center cursor-pointer
      ${className ? className.trim() : ''}`}
    >
      <div
        className={`absolute top-1 rounded-full w-4 h-4 bg-blue-500 ${
          isDarkMode ? 'left-1' : 'right-1'
        }`}
      />
    </div>
  );
};
export default ToggleDarkMode;
