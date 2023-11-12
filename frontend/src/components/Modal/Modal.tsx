import "./Modal.css";

import { useClickOutside } from "@/hooks";
import BaseIconButton from "../Base/BaseIconButton";
import ReactPortal from "../ReactPortal";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  title?: string;
  noHeader?: boolean;
  isModal: boolean;
  toggleModal: (value?: boolean) => void;
  children: JSX.Element;
};

export default function Modal({
  children,
  title,
  noHeader,
  isModal,
  toggleModal,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => toggleModal(false);

  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      e.code == "Escape" ? handleClose() : null;
    };

    addEventListener("keydown", handleEvent);
    if (!isModal) removeEventListener("keydown", handleEvent);
  }, [isModal]);

  useClickOutside(modalRef, () => handleClose());
  return (
    <>
      {isModal && (
        <ReactPortal wrapperId="modals">
          <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
            <div
              ref={modalRef}
              className={twMerge(
                "z-50 min-w-[30rem] rounded-xl bg-black p-5 shadow-md",
              )}
            >
              {!noHeader && (
                <div className="flex items-center justify-between">
                  <h1>{title}</h1>

                  <BaseIconButton onClick={handleClose} icon="ph:x" />
                </div>
              )}

              <div>{children}</div>
            </div>

            <div className="fixed h-full w-full bg-black/20 backdrop-blur-[2px]" />
          </div>
        </ReactPortal>
      )}
    </>
  );
}
