"use client";
import React from "react";
import CreateUserContent from "./CreatUserContent";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal surface: responsive width & height - matches SignupModal */}
      <div className="relative z-10 w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-[1100px] mx-auto my-6 max-h-[95vh] overflow-hidden rounded-2xl shadow-2xl bg-transparent">
        {/* Content area (fills modal) */}
        <div className="h-full w-full">
          <CreateUserContent onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;