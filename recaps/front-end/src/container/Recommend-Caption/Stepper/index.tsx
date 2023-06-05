import React, { useEffect, useState, useMemo } from "react";
import classes from "./stepper.module.scss";
import { useRouter } from "next/router";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

export default function LineStepper() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [label, setLabel] = useState("0");

  useEffect(() => {
    if (router?.asPath.includes("1")) {
      setLabel("1");
      return setActiveStep(0);
    }
    if (router?.asPath.includes("2")) {
      setLabel("2");
      return setActiveStep(1);
    }
    if (router?.asPath.includes("3")) {
      setLabel("3");
      return setActiveStep(2);
    }
    if (router?.asPath.includes("4")) {
      setLabel("4");
      return setActiveStep(3);
    }
    setLabel("1");
    return setActiveStep(0);
  }, [router]);

  const renderIconStepper = useMemo(() => {
    return <div className={classes.stepperActive}>{label}</div>;
  }, [router, label]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel nonLinear>
        {steps.map((label, index) => (
          <Step
            key={label}
            onClick={() =>
              router.replace({
                query: {
                  step: index + 1,
                },
              })
            }
          >
            {activeStep === index ? (
              <StepLabel icon={renderIconStepper}>
                <div className={classes.labelStep}>{label}</div>
              </StepLabel>
            ) : (
              <StepLabel></StepLabel>
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

const steps = ["Upload", "Emotion", "Describe", "Caption"];
