import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Modal({ open, onOpenChange, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content
        className="fixed top-1/2 left-1/2 max-w-md w-[90vw] p-6 bg-white rounded-lg shadow-lg
          -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      >
        {children}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
