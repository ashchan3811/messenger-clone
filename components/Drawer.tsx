"use client";

import { IHaveChildren } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface DrawerProps extends IHaveChildren {
  isOpen: boolean;
  onClose: () => void;
  direction: "left" | "right";
}

const Drawer = ({ isOpen, onClose, direction, children }: DrawerProps) => {
  const animations = {
    left: {
      enterTo: "translate-x-full",
      enterFrom: "translate-x-[-100%]",
      leaveTo: "translate-x-[-100%]",
      leaveFrom: "translate-x-full",
    },
    right: {
      enterTo: "translate-x-0",
      enterFrom: "translate-x-full",
      leaveTo: "translate-x-full",
      leaveFrom: "translate-x-0",
    },
  };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className={"relative z-50"} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40"></div>
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolue inset-0 overflow-hidden">
            <div
              className={clsx(
                "pointer-events-none fixed inset-y-0 flex max-w-full",
                direction == "left" ? "left-0" : "right-0 pl-10",
              )}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom={animations[direction].enterFrom}
                enterTo={animations[direction].enterTo}
                leave="transform transition ease-in-out duration-500"
                leaveFrom={animations[direction].leaveFrom}
                leaveTo={animations[direction].leaveTo}
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            onClick={onClose}
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                          >
                            <span className="sr-only">Close Panel</span>
                            <IoClose size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
