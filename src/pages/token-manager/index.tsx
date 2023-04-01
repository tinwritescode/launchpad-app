import { Button, Stack } from "@mui/material";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import PageLayout from "../../components/templates/PageLayout";

type Props = {};

function TokenManager({}: Props) {
  return (
    <PageLayout>
      <Formik
        initialValues={{
          tokenAddress: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
        validationSchema={toFormikValidationSchema(
          z.object({
            tokenAddress: z.string().url(),
          })
        )}
      >
        {({ handleSubmit, getFieldProps, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Field
                component={TextField}
                {...getFieldProps("tokenAddress")}
                label="Token address"
              />

              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </PageLayout>
  );
}

export default TokenManager;
