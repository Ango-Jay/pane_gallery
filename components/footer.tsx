import classnames from "classnames";
import NewsLetter from "./newsletter";

interface FooterProps {
  darkTheme: boolean;
  toggleDark: () => void;
}

const Footer = ({ darkTheme, toggleDark }: FooterProps) => {
  const getYear = (): number => {
    const currentYear: number = new Date().getFullYear();
    return currentYear;
  };

  return (
    <div>
      <footer
        className={classnames(
          "bg-dark-gray py-[3rem] w-full flex items-center justify-between mt-[3rem]",
          { "bg-dark-blue": darkTheme }
        )}
      >
        <div className="container mx-auto px-6 sm:px-10">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-0">
            <div>
              <a
                href="#"
                className="font-bold text-xl text-dark-blue uppercase h-[36px] flex items-center relative pl-[5.1rem]"
              >
                <div className="absolute top-[50%] translate-y-[-50%] left-0 w-[5rem] h-[5rem] pt-1 flex">
                  <img src="/assets/icons/logo.svg" alt="pane gallery" />
                </div>
                pane gallery
              </a>
              <p className="mt-8 pl-2 text-sm text-light">
                Made with{" "}
                <a
                  className="inline"
                  href="https://pixabay.com/"
                  target="_blank"
                >
                  Pixabay
                </a>{" "}
                api
              </p>
            </div>

            <div className="text-light flex flex-col items-end">
              <NewsLetter darkTheme={darkTheme} />
            </div>
          </div>
          <div className="flex flex-row-reverse items-center justify-center mt-8">
            <h4 className="text-light text-sm">
              &copy; {getYear()} Designed and Developed by AngoJay.
            </h4>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

// dark mode
/* 
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
*/
