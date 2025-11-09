import { useState, useCallback } from 'react';

/**
 * useModal Hook
 *
 * Manages modal open/close state with convenient helper functions.
 * Eliminates repetitive modal state management code.
 *
 * @param initialOpen - Initial open state (default: false)
 * @returns Object with open state and control functions
 *
 * @example
 * ```tsx
 * const { open, openModal, closeModal, toggleModal } = useModal();
 *
 * return (
 *   <>
 *     <Button onClick={openModal}>Open Dialog</Button>
 *     <Dialog open={open} onOpenChange={setOpen}>
 *       <DialogContent>
 *         <Button onClick={closeModal}>Close</Button>
 *       </DialogContent>
 *     </Dialog>
 *   </>
 * );
 * ```
 */
export function useModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return {
    open,
    setOpen,
    openModal,
    closeModal,
    toggleModal,
    isOpen: open,
    isClosed: !open,
  };
}

/**
 * useModalWithData Hook
 *
 * Extended modal hook that also manages data associated with the modal.
 * Useful for edit modals, confirmation dialogs, etc.
 *
 * @example
 * ```tsx
 * const { open, data, openModal, closeModal } = useModalWithData<Contact>();
 *
 * const handleEdit = (contact: Contact) => {
 *   openModal(contact);
 * };
 *
 * return (
 *   <>
 *     <Button onClick={() => handleEdit(contact)}>Edit</Button>
 *     <EditContactModal
 *       open={open}
 *       onOpenChange={closeModal}
 *       contact={data}
 *     />
 *   </>
 * );
 * ```
 */
export function useModalWithData<T = unknown>(initialOpen = false, initialData?: T) {
  const [open, setOpen] = useState(initialOpen);
  const [data, setData] = useState<T | undefined>(initialData);

  const openModal = useCallback((modalData?: T) => {
    if (modalData !== undefined) {
      setData(modalData);
    }
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    // Optional: Clear data on close
    // setData(undefined);
  }, []);

  const toggleModal = useCallback((modalData?: T) => {
    if (modalData !== undefined) {
      setData(modalData);
    }
    setOpen(prev => !prev);
  }, []);

  const updateData = useCallback((newData: T) => {
    setData(newData);
  }, []);

  const clearData = useCallback(() => {
    setData(undefined);
  }, []);

  return {
    open,
    setOpen,
    data,
    setData,
    openModal,
    closeModal,
    toggleModal,
    updateData,
    clearData,
    isOpen: open,
    isClosed: !open,
  };
}
