"use client";

import { FooterButtons } from "@/components/auth";
import { DynamicCardHeader } from "@/components/card";
import { FormInput } from "@/components/dynamic-inputs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { LoginFooter } from "./LoginFooter";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const Login = () => {
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(4, "At least 4 chars").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await axios.post(
          "http://localhost:4200/user/login",
          values
        );
        if (res.data.success) {
          localStorage.setItem("accessToken", res.data.accessToken);
          push("/");
        }
      } catch (err: any) {
        setErrors({ email: "Email or password incorrect" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Log in"
        description="Log in to enjoy your favorite dishes."
      />

      <CardContent className="p-0">
        <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
          <div className="grid items-start w-full gap-4">
            <FormInput
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputError={
                formik.touched.email ? formik.errors.email || false : false
              }
              inputErrorMessage={formik.errors.email}
            />

            <FormInput
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputError={
                formik.touched.password
                  ? formik.errors.password || false
                  : false
              }
              inputErrorMessage={formik.errors.password}
            />

            <Button variant="link" className="p-0 underline w-fit">
              Forgot password ?
            </Button>
          </div>
          <FooterButtons
            buttonText={formik.isSubmitting ? "Loading..." : "Let's Go"}
          />
        </form>
      </CardContent>
      <LoginFooter />
    </Card>
  );
};
