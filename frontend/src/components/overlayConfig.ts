import RegistSuccessful from "@/assets/registSuccessful.svg";
import WrongPass from "@/assets/wrongpass.svg";

export type OverlayKind = "successPassword" | "wrongPassword" | "userCreated" | "userCreationFailed";

export interface OverlayConfig {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  subtitle2?: string;
  primaryButtonText: string;
  message?: string;
  primaryButton?: string;
  secondaryButton?: string;
  showCredentials?: boolean;
  type?: "success" | "error";
}

export const overlayConfigs: Record<OverlayKind, OverlayConfig> = {
  successPassword: {
    image: RegistSuccessful,
    imageAlt: "Registration successful confetti",
    title: "Woo hoo!",
    subtitle: "Your password confirmation is complete",
    subtitle2: "You’re all set—account secured. 🎉",
    primaryButtonText: "Go Ahead",
  },
  wrongPassword: {
    image: WrongPass,
    imageAlt: "Wrong password illustration",
    title: "Uh oh.",
    subtitle: "Something wrong happened",
    subtitle2: "Mismatch detected—please re-enter.🚫",
    primaryButtonText: "Try Again",
  },
  userCreated: {
    image: RegistSuccessful,
    imageAlt: "Registration successful confetti",
    title: "User Created Successfully! 🎉",
    message: "The user account has been created. Credentials are shown below:",
    primaryButtonText: "Copy Credentials",
    secondaryButton: "Download as File",
    showCredentials: true,
    type: "success" as const,
  },

  userCreationFailed: {
    image: WrongPass,
    imageAlt: "Wrong password illustration",
    title: "User Creation Failed",
    message: "There was an error creating the user account. Please try again.",
    primaryButtonText: "Try Again",
    type: "error" as const,
  },
};
