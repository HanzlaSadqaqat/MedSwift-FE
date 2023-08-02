import React from "react";

const LoaderSpinner: React.FC = () => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 right-0 bottom-0 bg-spinnergray bg-opacity-30 z-[999] bg-black backdrop-blur-sm">
      <div className="absolute w-20 h-20 left-[calc(50%-2.5rem)] top-[calc(50%-2.5rem)] border-t-4 border-b-4 border-dashblue border-blue-700 rounded-full animate-spin"></div>
    </div>
  );
};
export default LoaderSpinner;
