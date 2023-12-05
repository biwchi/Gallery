import styles from "./Modal.module.scss";

import { useClickOutside } from "@/hooks";
import { useEffect, useRef } from "react";
import ReactPortal from "../../ReactPortal";
import { IconButton } from '@/components/UI/IconButton';

type ModalProps = {
  title?: string;
  noHeader?: boolean;
  isModal: boolean;
  toggleModal: (value?: boolean) => void;
  children: JSX.Element;
};

export function Modal({
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
          <div className={styles.modal}>
            <div ref={modalRef} className={styles.modalBody}>
              {!noHeader && (
                <div className={styles.header}>
                  <h1 className={styles.headerTitle}>{title}</h1>
                  <IconButton onClick={handleClose} size={'default'} icon="ph:x" />
                </div>
              )}

              <div>{children}</div>
            </div>

            <div className={styles.overlay} />
          </div>
        </ReactPortal>
      )}
    </>
  );
}
