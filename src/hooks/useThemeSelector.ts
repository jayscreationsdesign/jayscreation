"use client";

import { useState } from "react";

export function useThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState("");

  const isValid = selectedTheme !== "";

  return {
    selectedTheme,
    setSelectedTheme,
    isValid,
  };
}
