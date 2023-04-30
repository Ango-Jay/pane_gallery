import { Component, ReactNode } from "react";


interface Props {
    children:ReactNode
}

interface IErrorState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, IErrorState> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error: error };
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      return (
        <div className="bg-[#000]/30 w-full h-full min-h-[100vh] flex items-center justify-center">
    <div className="bg-white rounded-xl max-w-[90%] sm:max-w-[600px] max-h-[50vh] sm:max-h-[600px] m-auto">
  <div className="flex items-center justify-center">
    <h1
    className="text-3xl text-dark-blue"
    >
        Sorry an error occured
    </h1>
  </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
