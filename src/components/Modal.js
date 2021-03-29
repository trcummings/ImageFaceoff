/**
 * A generic Modal
 *
 * @version 1.0.0
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

const Modal = (
  {
    children,
    closeOnEsc = true,
    isOpenByDefault = false,
    closeOnClickOut = true,
  },
  modalRef
) => {
  const [isOpen, setOpen] = useState(isOpenByDefault);
  const modalBgRef = useRef(null);

  // This allows us to expose methods on the parent ref e.g. `modalRef.current.open()`
  useImperativeHandle(modalRef, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  if (closeOnEsc) {
    // keyCode 27 is the Escape key
    const onKeydown = useCallback((event) => {
      if (event.keyCode === 27) setOpen(false);
    });

    // Pass in onKeydown and isOpen as dependencies so it adds and removes the listeners when
    // the modal opens and closes
    useEffect(() => {
      if (isOpen) document.addEventListener("keydown", onKeydown, false);
      // Cleanup function on unmount
      return () => document.removeEventListener("keydown", onKeydown, false);
    }, [onKeydown, isOpen]);
  }

  if (closeOnClickOut) {
    // If our event target on mousedown is the modal background ref, close it
    const onClick = useCallback((event) => {
      if (event.target === modalBgRef.current) setOpen(false);
    });

    useEffect(() => {
      if (isOpen) document.addEventListener("mousedown", onClick, false);
      // Cleanup function on unmount
      return () => document.removeEventListener("mousedown", onClick, false);
    }, [isOpen, onClick]);
  }

  // Create the portal on the document body on open
  return createPortal(
    isOpen ? (
      <div className="modal modal-open">
        <div ref={modalBgRef} className="modal__background" />
        {children}
      </div>
    ) : (
      <div className="modal">
        <div ref={modalBgRef} className="modal__background" />
      </div>
    ),
    document.body
  );
};

export default forwardRef(Modal);
