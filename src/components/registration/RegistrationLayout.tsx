import React from "react";

interface RegistrationProps {
  children: React.ReactNode;
}

export const RegistrationLayout: React.FC<RegistrationProps> = (
  props: RegistrationProps
) => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 to-blue-400 h-screen flex justify-center items-center">
        <div className="flex w-4/6 h-4/6 bg-white rounded">
          <div className="w-full bg-primary text-white rounded">
            <div className="flex justify-center">
              <img
                src="../../public/images/secondary.png"
                className=""
                alt=""
              />
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
};
