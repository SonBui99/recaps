import Input from "@/components/Input/Input";
import React, { useCallback, useState } from "react";
import bgLogin from "@/assets/img/bg-login.png";
import Image from "next/image";
import classes from "./register.module.scss";
import Card from "@/components/Cards";
import Button from "@/components/Button/Button";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUp } from "@/apis/authenticate.api";
import { useRouter } from "next/router";

export default function Register() {
  const { push } = useRouter();
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .max(25, "Username must be between 3 - 25 characters")
      .min(3, "Username must be between 3 - 25 characters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        "Email is not vaild"
      ),
    password: yup
      .string()
      .required("Password is required")
      .max(25, "Password must be between 6 - 25 characters")
      .min(6, "Password must be between 6 - 25 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .max(25, "Confirm Password must be between 6 - 25 characters")
      .min(6, "Confirm Password must be between 6 - 25 characters")
      .oneOf(
        [yup.ref("password")],
        "Password and confirm password does not match"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = useCallback(async (values: any) => {
    const body = {
      userName: values?.name,
      email: values?.email,
      password: values?.password,
    };
    await signUp(body)
      .then(() => {
        alert("Sign Up successfully");
        push("/login");
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className={classes.container}>
      <Image src={bgLogin} alt="" width={673} height={673} />
      <Card className={classes.card}>
        <div>
          <div style={{ marginBottom: 20 }}>
            <h1 className={classes.titleLogin}>Sign Up</h1>
            <div className={classes.description}>
              Log in to your Recap account to receive the latest notifications
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className={classes.titleBox}>Name</div>
              <Input
                className={
                  !errors?.name ? classes.inputBox : classes.errorInput
                }
                placeholder="Name"
                autoComplete="off"
                {...register("name")}
              />
              {errors.name && (
                <p className={classes.error}>{errors?.name?.message as any}</p>
              )}
            </div>
            <div>
              <div className={classes.titleBox}>Email</div>
              <Input
                className={
                  !errors?.email ? classes.inputBox : classes.errorInput
                }
                placeholder="Email address"
                autoComplete="off"
                {...register("email")}
              />
              {errors.email && (
                <p className={classes.error}>{errors?.email?.message as any}</p>
              )}
            </div>
            <div>
              <div className={classes.titleBox}>Password</div>
              <Input
                className={
                  !errors?.password ? classes.inputBox : classes.errorInput
                }
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className={classes.error}>
                  {errors?.password?.message as any}
                </p>
              )}
            </div>
            <div>
              <div className={classes.titleBox}>Confirm Password</div>
              <Input
                className={
                  !errors?.confirmPassword
                    ? classes.inputBox
                    : classes.errorInput
                }
                placeholder="Confirm password"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.name && (
                <p className={classes.error}>
                  {errors?.confirmPassword?.message as any}
                </p>
              )}
            </div>
            <Button
              buttonType="primary"
              className={classes.login}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
        <div className={classes.haveAccount}>
          Already have an account?{" "}
          <Link href="/login" className={classes.signUp}>
            Log In
          </Link>
        </div>
      </Card>
    </div>
  );
}
