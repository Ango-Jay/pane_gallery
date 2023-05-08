import axios from "axios";
import { useState } from "react";
import type { FormEvent } from "react";
import classnames from "classnames";
import * as yup from "yup";
import { ValidationError } from "yup";
import { Spinner } from "./Loaders/Spinner";

const NewsLetter = ({ darkTheme }: { darkTheme: boolean }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ValidationError | Error | null>(null);
  const validationScema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email address"),
  });
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isValid = await validationScema.validate({
        email,
      });
      if (isValid) {
        setError(null);
        setIsLoading(true);
        await axios.post("api/subscribe", {
          email,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ValidationError) {
        setError(error);
      }
      if (error instanceof Error) {
        setError(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <div
      className={classnames("overflow-hidden", { "bg-dark-blue": darkTheme })}
    >
      <p className="text-light">
        Want to be updated when new awesome pics come out?
      </p>
      <p className="text-light">Sign up for our newsLetter.</p>
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col sm:items-center"
      >
        <div className="w-full my-4  rounded-full relative">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="text"
            placeholder="Enter email"
            className="appearance-none bg-white w-full rounded-full text-dark p-3  focus:outline-darkblue"
          />
          {error ? (
            <div className="mt-1 text-red-500 text-sm">{error?.message}</div>
          ) : (
            ""
          )}
        </div>
        <button
          className="flex justify-center items-center flex-shrink-0 sm:min-w-[100px] max-w-[100px] sm:max-w-none bg-dark-blue text-sm text-white p-3 rounded-full shadow-sm btn-style"
          type="submit"
        >
          {isLoading ? <Spinner className="text-light mr-2" /> : ""}
          Notify me
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
