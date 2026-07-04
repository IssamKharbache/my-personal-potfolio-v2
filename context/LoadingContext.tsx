"use client";

import { createContext } from "react";

export const LoadingContext = createContext<{
  ready: boolean;
} | null>(null);
