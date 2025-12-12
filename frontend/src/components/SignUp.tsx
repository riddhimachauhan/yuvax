"use client";
import React, { useEffect, useState } from "react";
import PopupLayout from "./PopupLayout";
import ReusableForm from "./ReusableForm";
import OverlayPopupLayout from "./OverlayPopupLayout";
import { signinPopupConfigs, formFieldConfigs } from "./popupConfig";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearError, loginUser, selectIsAuthenticated, selectIsInitialized, setCredentials, signupUser } from "@/store/slices/authSlice";
import { useSignupMutation } from "@/store/api/authApi";
import type { OverlayKind } from "./overlayConfig";
import type { SignupRequest, User } from "@/lib/types";
// import Router from "next/router";
import { useRouter } from "next/navigation";

interface SigninProps {
  onClose?: () => void;
  initialLoginMode?: boolean;
}

const Signin: React.FC<SigninProps> = ({ onClose, initialLoginMode = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [allFormData, setAllFormData] = useState<Record<string, string>>({});
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [overlayKind, setOverlayKind] = useState<OverlayKind | null>(null);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const isFinalStep = !initialLoginMode && currentStep === 2;
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsInitialized);

  useEffect(() => {
    if (initialLoginMode) {
      setIsForgotPasswordMode(false);
      setIsLoginMode(true);
      setCurrentStep(3);
    }
  }, [initialLoginMode]);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      onClose?.();
    }
  }, [isInitialized, isAuthenticated, onClose]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);



  const handleSignupSubmit = async (formData: Record<string, string>) => {
    try {
      const signupRequest: SignupRequest = {
        email: formData.email ?? "",
        password: formData.password ?? "",
        full_name: formData.fullName ?? "",
        gender: (formData.gender ?? "").toLowerCase(),
        dob: formData.dob ?? formData.dateOfBirth ?? "",
        country: formData.country ?? "",
        zone: formData.zone ?? "",
        date_of_birth: formData.dateOfBirth ?? "",
        address: formData.address ?? "",
        parentsName: formData.parentsName ?? "",
        phone: formData.phoneNumber ?? "",
        confirm_password: formData.confirmPassword ?? "",
        role: "Student",
      };

      const result = await dispatch(signupUser(signupRequest)).unwrap();


      // Close modal
      onClose?.();

      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Signup failed:", err);
    }
  };


  const handleLoginSubmit = async (formData: Record<string, string>) => {
    try {
      // Dispatch login action and wait for result
      const result = await dispatch(
        loginUser({
          identifier: formData.loginEmail ?? "",
          password: formData.loginPassword ?? "",
        })
      ).unwrap();

      // Success - result contains the user data
      console.log('Login result:', result);

      // Close modal
      onClose?.();

      // Redirect based on role from the result (not from Redux state)
      if (result?.user?.role === 'Student') {
        router.push('/dashboard');
      } else if (result?.user?.role === 'Admin') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const onFormSubmit = async (formData: Record<string, string>) => {
    // Merge form data
    setAllFormData((prev) => ({ ...prev, ...formData }));

    // If it's login mode, handle login
    if (initialLoginMode || isLoginMode) {
      await handleLoginSubmit(formData);
      return;
    }

    // If not final step of signup, go to next step
    if (!isFinalStep) {
      setCurrentStep((s) => s + 1);
      return;
    }

    // Final step of signup - call signup
    await handleSignupSubmit({ ...allFormData, ...formData });
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleLoginClick = () => {
    setIsLoginMode(true);
    setCurrentStep(3);
    setAllFormData({});
  };
  const handleCreateAccountClick = () => {
    setIsLoginMode(false);
    setIsForgotPasswordMode(false);
    setCurrentStep(0);
    setAllFormData({});
  };
  const handleForgotPasswordClick = () => {
    setIsForgotPasswordMode(true);
    setIsLoginMode(false);
    setCurrentStep(4);
    setAllFormData({});
  };
  const handleBackToLoginClick = () => {
    setIsForgotPasswordMode(false);
    setIsLoginMode(true);
    setCurrentStep(3);
    setAllFormData({});
  };
  const handleThirdStepAttempt = (result: "success" | "mismatch") => {
    if (result === "success") setOverlayKind("successPassword");
    else setOverlayKind("wrongPassword");
  };
  const handleOverlayPrimary = () => {
    if (overlayKind === "successPassword") {
      setOverlayKind(null);
      setIsForgotPasswordMode(false);
      setIsLoginMode(true);
      setCurrentStep(3);
      return;
    }
    setOverlayKind(null);
  };

  return (
    <>
      <PopupLayout
        config={signinPopupConfigs[currentStep]}
        onClose={onClose}
        onBack={currentStep > 0 && !(isLoginMode && !isForgotPasswordMode) ? handleBack : undefined}
        showBackButton={currentStep > 0 && !(isLoginMode && !isForgotPasswordMode)}
        isSecondStep={currentStep === 1}
        isThirdStep={currentStep === 2}
        onLoginClick={handleLoginClick}
        onCreateAccountClick={handleCreateAccountClick}
        onForgotPasswordClick={handleForgotPasswordClick}
        onBackToLoginClick={handleBackToLoginClick}
        isLoginMode={isLoginMode}
        isForgotPasswordMode={isForgotPasswordMode}
      >
        <ReusableForm
          fields={formFieldConfigs[currentStep]}
          onSubmit={onFormSubmit}
          initialData={allFormData}
          submitButtonText={currentStep === 2 ? "Submit" : "Continue"}
          isThirdStep={currentStep === 2}
          isLoginMode={isLoginMode}
          isForgotPasswordMode={isForgotPasswordMode}
          onForgotPasswordClick={handleForgotPasswordClick}
          onThirdStepAttempt={currentStep === 2 ? handleThirdStepAttempt : undefined}
          showBelowButtonLoginLink={!isLoginMode && !isForgotPasswordMode && currentStep === 0}
          showBelowButtonCreateLink={isLoginMode && !isForgotPasswordMode && currentStep === 3}
          onCreateAccountClick={handleCreateAccountClick}
          showBelowButtonBackToLoginLink={isForgotPasswordMode && currentStep === 4}
          onLoginClick={(isForgotPasswordMode && currentStep === 4) ? handleBackToLoginClick : handleLoginClick}
        />
      </PopupLayout>

      {overlayKind && (
        <OverlayPopupLayout kind={overlayKind} onPrimaryClick={handleOverlayPrimary} onClose={handleOverlayPrimary} />
      )}
    </>
  );
};

export default Signin;