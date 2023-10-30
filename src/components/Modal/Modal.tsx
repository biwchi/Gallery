import "./Modal.css";

import { useClickOutside } from "@/hooks";
import BaseIconButton from "../Base/BaseIconButton";
import ReactPortal from "../ReactPortal";
import { useEffect, useRef } from "react";
import useTransition from "react-transition-state";
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

  const [state, toggle] = useTransition({
    timeout: 300,
    preEnter: true,
    unmountOnExit: true,
  });

  const handleClose = () => toggleModal(false);

  useEffect(() => {
    toggle(isModal);
  }, [isModal]);

  useClickOutside(modalRef, () => handleClose);
  return (
    <>
      {state.isMounted && (
        <ReactPortal wrapperId="modals">
          <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
            <div
              ref={modalRef}
              className={twMerge(
                "min-w-[30rem] rounded-xl bg-background p-10",
                `modal ${state.status}`,
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
          </div>
        </ReactPortal>
      )}
    </>
  );
}
