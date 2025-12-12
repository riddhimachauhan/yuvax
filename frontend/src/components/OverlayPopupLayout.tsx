"use client";
import Image from "next/image";
import { overlayConfigs, type OverlayKind } from "./overlayConfig";
import { Button } from "@/components/ui/button";
import React from "react";

interface OverlayPopupLayoutProps {
  kind: OverlayKind;
  onPrimaryClick: () => void;
  onClose?: () => void;
}

const OverlayPopupLayout: React.FC<OverlayPopupLayoutProps> = ({ kind, onPrimaryClick, onClose }) => {
  const cfg = overlayConfigs[kind];
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* blurred, dimmed backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose} />

      {/* center card */}
      <div className="relative z-[61] w-[90%] max-w-md rounded-3xl bg-white shadow-2xl p-8 text-center select-none">
        <div className="mx-auto mb-4 w-20 h-20 relative">
          <Image src={cfg.image} alt={cfg.imageAlt} fill className="object-contain" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{cfg.title}</h3>
        {cfg.subtitle && <p className="text-gray-600">{cfg.subtitle}</p>}
        {cfg.subtitle2 && <p className="text-gray-600">{cfg.subtitle2}</p>}
        <Button
          onClick={onPrimaryClick}
          className="mt-6 w-full h-11 rounded-xl bg-black hover:bg-black/90 text-white"
        >
          {cfg.primaryButtonText}
        </Button>
      </div>
    </div>
  );
};

export default OverlayPopupLayout;
