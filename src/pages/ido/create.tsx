import React, { useCallback } from "react";
import { Button, Input, message, Spin } from "antd";
import PageLayout from "../../components/templates/PageLayout";
import { Form } from "antd";
import { api } from "../../utils/api";
import { env } from "../../env.mjs";
import { List, Create } from "../../components/containers/create-ido";

type Props = {};

// function Create({}: Props) {
//   const [form] = Form.useForm();
//   const utils = api.useContext();
//   const { isLoading, mutateAsync } = api.demoProject.createOne.useMutation({
//     onSettled: async (data, error) => {
//       utils.demoProject.invalidate();
//     },
//   });
//   const onFormFinish = useCallback(async (values: any) => {
//     const key = "create-project";
//     message.open({
//       content: "Creating project...",
//       key: key,
//       duration: 0,
//     });

//     try {
//       const res = await mutateAsync({ name: values.name });

//       message.success({
//         content: "Project created",
//         duration: 2,
//       });
//     } catch (error) {
//       message.error({
//         content: "Error creating project",
//         duration: 2,
//       });
//     } finally {
//       message.destroy(key);
//     }
//   }, []);

//   const testMutate = api.project.deployIdoContract.useMutation({
//     onSettled: async (data, error) => {
//       console.group("onSettled");
//       console.log(data);
//       console.groupEnd();
//     },
//   });

//   return (
//     <Spin spinning={isLoading}>
//       <Form form={form} onFinish={onFormFinish}>
//         <Form.Item name="name" label="Name">
//           <Input placeholder="Basic usage" />
//         </Form.Item>

//         <Button htmlType="submit" disabled={isLoading} type="primary">
//           Submit
//         </Button>
//       </Form>

//       <Button
//         onClick={() =>
//           testMutate.mutateAsync({
//             endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
//             startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
//             idoPrice: 1,
//             // change later
//             idoTokenAddress: env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS,
//             purchaseCap: 100,
//             stakingContractAddress: env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
//             stakingTokenAddress: env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS,
//             stakingRequired: 200,
//           })
//         }
//       >
//         Test
//       </Button>
//     </Spin>
//   );
// }
// const List = () => {
//   const { data, isLoading } = api.demoProject.getAll.useQuery();

//   return (
//     <Spin spinning={isLoading}>
//       {data?.map((project: any) => {
//         return <div key={project.id}>{project.name}</div>;
//       })}
//     </Spin>
//   );
// };

export const Main = () => {
  return (
    <PageLayout>
      <List />
      <Create />
    </PageLayout>
  );
};

export default Main;
