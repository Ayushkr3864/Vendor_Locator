// components/Toast.jsx
import { Fragment } from "react";
import { Transition } from "@headlessui/react";

const Toast = ({ show, type, message }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="fixed top-5 right-5 z-50">
      <Transition
        show={show}
        as={Fragment}
        enter="transform transition duration-300"
        enterFrom="translate-y-2 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-2 opacity-0"
      >
        <div className={`text-white px-4 py-2 rounded shadow-lg ${bgColor}`}>
          {message}
        </div>
      </Transition>
    </div>
  );
};

export default Toast;
