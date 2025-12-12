"use client";

import React from "react";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default ProfileLayout;
