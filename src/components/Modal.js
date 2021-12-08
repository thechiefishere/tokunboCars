import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

const Modal = () => {
  const { modalContent, showModal, setShowModal } = useGlobalContext();

  useEffect(() => {
    const id = setTimeout(() => {
      setShowModal(false);
    }, 3000);
    return () => {
      clearTimeout(id);
    };

    //eslint-disable-next-line
  }, [modalContent]);

  return (
    <section className={showModal ? "modal show-modal" : "modal"}>
      <h3 className={modalContent.type === 1 ? "modal-success" : "modal-fail"}>
        {modalContent.text}
      </h3>
    </section>
  );
};

export default Modal;
