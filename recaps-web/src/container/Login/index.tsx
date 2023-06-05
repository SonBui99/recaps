import Input from "@/components/Input/Input";
import React, { useCallback } from "react";
import bgLogin from "@/assets/img/bg-login.png";
import Image from "next/image";
import classes from "./login.module.scss";
import Card from "@/components/Cards";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { doLogin } from "@/apis/authenticate.api";
import { useRouter } from "next/router";
import authorizedRequest from "@/config/authorizedRequest";
import { toastError, toastSuccess } from "@/helper/toastMessage";

export default function Login() {
  const schema = yup.object().shape({
    // email: yup
    //   .string()
    //   .required("Email is required")
    //   .matches(
    //     /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    //     "Email is not vaild"
    //   ),
    passWord: yup
      .string()
      .required("Password is required")
      .max(25, "Password must be between 6 - 25 characters")
      .min(6, "Password must be between 6 - 25 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();
  const onSubmit = useCallback(async (values: any) => {
    await doLogin({
      email: values.email,
      password: values.passWord,
    })
      .then((res) => {
        toastSuccess("Login Successfully");
        // authorizedRequest.setToken(res.access_token);
        localStorage.setItem("user", res.data.access_token);
        router.push("/account");
      })
      .catch((err) => toastError(err));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.container}>
        <Image src={bgLogin} alt="" width={673} height={673} />
        <Card className={classes.card}>
          <div>
            <div style={{ marginBottom: 20 }}>
              <h1 className={classes.titleLogin}>Log in</h1>
              <div className={classes.description}>
                Welcome back! Please enter your details.
              </div>
            </div>
            <div>
              <div>Email</div>
              <Input
                className={
                  !errors.email ? classes.inputBox : classes.errorInput
                }
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className={classes.error}>{errors?.email?.message as any}</p>
              )}
            </div>
            <div>
              <div>Password</div>
              <Input
                className={
                  !errors.passWord ? classes.inputBox : classes.errorInput
                }
                placeholder="PassWord"
                type="password"
                {...register("passWord")}
              />
              {errors.passWord && (
                <p className={classes.error}>
                  {errors?.passWord?.message as any}
                </p>
              )}
            </div>
            <div className={classes.actions}>
              <label className={classes.rememeberActions}>
                <input
                  type="checkbox"
                  onClick={() => console.log("first")}
                  className={classes.rememberBox}
                />
                Remember me !
              </label>
              <div className={classes.forgotItems}>Forgot password?</div>
            </div>
            <Button
              buttonType="primary"
              className={classes.login}
              type="submit"
            >
              Log in
            </Button>
          </div>
          <div className={classes.haveAccount}>
            Not have an account?{" "}
            <Link href="/register" className={classes.signUp}>
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </form>
  );
}
