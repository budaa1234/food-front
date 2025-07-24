"use client";

import { FooterButtons } from "@/components/auth";
import { DynamicCardHeader } from "@/components/card";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "../../../../components/dynamic-inputs";
import { SignUpFooter } from "./SignUpFooter";
import {useFormik} from "formik"

type EmailBoxProps = {
 
  handleNext: () => void;
};

export const SignUpEmailBox = ({handleNext,}: EmailBoxProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      
    }
  })

  const {values, handleChange, handleBlur, touched, errors} = formik

const formError = touched.email && errors.email;

  const emailInputProps = {
    name: "email",
    placeholder: "Email",
    value: values.email,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: formError,
    inputErrorMessage: errors.email,
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Create your account"
        description="Sign up to explore your favorite dishes."
      />
      <CardContent className="p-0">
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid items-center w-full gap-6">
              <FormInput {...emailInputProps} />
            </div>
            <FooterButtons buttonText="Let`s Go" />
          </div>
        </form>
      </CardContent>
      <SignUpFooter />
    </Card>
  );
};
