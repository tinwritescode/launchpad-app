import { Button, Grid, Stack } from "@mui/material";
import { TRPCClientError } from "@trpc/client";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router.js";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { env } from "../../../env.mjs";
import { createIdoProjectInputSchema } from "../../../server/api/routers/project/project.schema";
import { api } from "../../../utils/api";
import { DateRangePicker, DateRange } from "mui-daterange-picker";

type Props = {};

type FormType = z.infer<typeof createIdoProjectInputSchema>;

export function Create({}: Props) {
  const { mutateAsync } = api.project.createIdoProject.useMutation();
  const router = useRouter();
  const [timeOpen, setTimeOpen] = useState(false);

  // TODO: make type safety for this
  const handleSubmit = useCallback(async (values: FormType) => {
    try {
      console.log(values);

      const { id } = await mutateAsync({
        ...values,
        startTime: new Date(values.startTime),
        endTime: new Date(values.endTime),
      });

      toast.success("Created");

      //form.resetFields();
      router.push(`/ido/${id}`);
    } catch (error: any) {
      if (error instanceof TRPCClientError) {
        if (error?.shape?.data?.code === "INTERNAL_SERVER_ERROR") {
          toast.error(error?.shape?.message);
          return;
        }

        // if zod error
        if (error?.shape?.data?.code === "INVALID_INPUT") {
          // map errors
          const errors = JSON.parse(error?.message);

          // errors.forEach((error: any) => {
          //   form.setFields([
          //     {
          //       name: error.path,
          //       errors: [error.message],
          //     },
          //   ]);
          // });
          return;
        }
      }

      toast.error(error?.message || "Something went wrong");
    }
  }, []);

  return (
    <Formik
      initialValues={{
        name: "Project name",
        comparisionContent: "lorem ipsum",
        image: "https://picsum.photos/200/300",
        roadmapContent: "ipsum lorem",
        summaryContent: "lorem ipsum",
        videoURL: "https://www.youtube.com/watch?v=MNiGhWOMPJo",
        startTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 1,
        endTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 10,
        idoTokenAddress: env.NEXT_PUBLIC_IDO_TOKEN_ADDRESS,
        idoPrice: 1,
        purchaseCap: 100,
      }}
      onSubmit={handleSubmit}
      validationSchema={toFormikValidationSchema(
        createIdoProjectInputSchema as any
      )}
    >
      {({ values, handleSubmit, getFieldProps, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width={"min(700px, calc(100vw - 32px))"} mt={2}>
            <Field
              component={TextField}
              label="Name"
              placeholder="Project Name"
              {...getFieldProps("name")}
            />
            <Field
              component={TextField}
              label="Image"
              {...getFieldProps("image")}
            />
            <Field
              component={TextField}
              label="Video URL"
              {...getFieldProps("videoURL")}
            />
            <Field
              component={TextField}
              label="Summary Content"
              multiline
              rows={4}
              {...getFieldProps("summaryContent")}
            />
            <Field
              component={TextField}
              label="Roadmap Content"
              multiline
              rows={4}
              {...getFieldProps("roadmapContent")}
            />
            <Field
              component={TextField}
              multiline
              rows={4}
              label="Comparision Content"
              {...getFieldProps("comparisionContent")}
            />

            <Grid container>
              <Grid item xs={6}>
                <Stack>
                  <Field
                    component={TextField}
                    label="Start Time"
                    disabled
                    {...getFieldProps("startTime")}
                    value={new Date(values.startTime).toLocaleString()}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack>
                  <Field
                    component={TextField}
                    label="End Time"
                    disabled
                    {...getFieldProps("endTime")}
                    value={new Date(values.endTime).toLocaleString()}
                  />
                </Stack>
              </Grid>
              <Button
                onClick={() => {
                  setTimeOpen(!timeOpen);
                }}
              >
                Change Time
              </Button>
            </Grid>

            <Field
              component={DateRangePicker}
              label="Time"
              open={timeOpen}
              minDate={values.startTime}
              maxDate={values.endTime}
              toggle={() => setTimeOpen(!timeOpen)}
              onChange={(value: DateRange) => {
                setFieldValue("time", [value.startDate, value.endDate]);
                setFieldValue("startTime", value.startDate?.getTime());
                setFieldValue("endTime", value.endDate?.getTime());
                setTimeOpen(!timeOpen);
              }}
            />

            <Field
              component={TextField}
              label="IDO Price"
              {...getFieldProps("idoPrice")}
            />
            <Field
              component={TextField}
              label="IDO Token Address"
              {...getFieldProps("idoTokenAddress")}
            />
            <Field
              component={TextField}
              label="Purchase Cap"
              {...getFieldProps("purchaseCap")}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button type="submit" variant="contained">
                Create
              </Button>
            </div>
          </Stack>
        </form>
      )}
    </Formik>
  );
}
