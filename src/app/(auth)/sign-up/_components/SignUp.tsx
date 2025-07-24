"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignUpEmailBox } from "./SignUpEmailBox";
import { SignUpPasswordBox } from "./SignUpPasswordBox";

export const Signup = () => {
  const { push } = useRouter();

  const StepComponents = [
    <SignUpEmailBox key={0} />,
    // <SignUpPasswordBox key={1} />,
  ];

  return SignUpEmailBox;
};
