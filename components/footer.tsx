import classnames from "classnames"


interface FooterProps {
    darkTheme:boolean;
    toggleDark: ()=>void
}

const Footer = ({darkTheme, toggleDark}:FooterProps) => {
  return (
    <div>
      <footer
        className={classnames("bg-dark-gray w-full pt-6 flex items-center justify-between flex-wrap mt-6", {'bg-dark-blue':darkTheme})}
      >
        <div className="text-center m-auto">
          <h4
            className={classnames("text-gray hover:text-white text-xl my-4", {'text-white' : darkTheme})}
          >
            made by AngoJay.
          </h4>
          <div className="flex flex-row-reverse items-center">
            <div
              className={`w-14 h-8 flex items-center bg-gray-100 rounded-full p-1 duration-300 cursor-pointer ${
                darkTheme ? "bg-purple-500" : ""
              }`}
              aria-checked={darkTheme}
              onClick={toggleDark}
            >
              <div
                className={
              classnames("bg-white w-6 h-6 rounded-full shadow-md transform duration-300", {'translate-x-6' : darkTheme})
              }
              ></div>
            </div>
            <p
              className={classnames("mt-2", {'text-white' : darkTheme})}
            >
              Dark mode:{" "}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
