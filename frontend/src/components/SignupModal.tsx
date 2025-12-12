"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSignupModal } from "@/store/slices/modalSlice";
import Signin from "./SignUp";

const SignupModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.modal.isSignupModalOpen);
  const openInLoginMode = useAppSelector((s) => s.modal.openInLoginMode);

  const handleClose = () => dispatch(closeSignupModal());
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
        onClick={handleClose}
      />

      {/* Modal surface: responsive width & height */}
      <div className="relative z-10 w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-[1100px] mx-auto my-6 max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl bg-transparent">
        {/* Content area (fills modal) */}
        <div className="h-full w-full">
          <Signin onClose={handleClose} initialLoginMode={openInLoginMode} />
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
