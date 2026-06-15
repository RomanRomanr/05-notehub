import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const closeByEscape = ({ key }: KeyboardEvent) => {
      
      if (key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.body.style.overflow = "";

      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    
    const { target, currentTarget } = event; 

    if (target === currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    
    <div
      role="dialog"
      aria-modal="true"
      className={css.backdrop}
      onClick={handleOverlayClick}
    >
      <div className={css.modal}>{children}</div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
