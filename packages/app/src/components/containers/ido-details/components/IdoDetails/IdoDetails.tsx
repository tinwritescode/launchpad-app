import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { env } from "../../../../../env.mjs";
import { api } from "../../../../../utils/api";
import { Main } from "./Main";
import dynamic from "next/dynamic";

const IdoDetail = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading, isError } = api.project.getOne.useQuery(
    { id },
    { enabled: !!id, refetchOnWindowFocus: true, retry: 0 }
  );
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isError) {
      router.push("/404");
    }
  }, [isLoading, isError, router]);

  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) return <div>Loading...</div>;

  if (!isHydrated) return null;

  return (
    <>
      <Head>
        <title>
          {data?.name} - {env.NEXT_PUBLIC_PROJECT_NAME}
        </title>
      </Head>
      <Main />
    </>
  );
};

export default dynamic(() => Promise.resolve(IdoDetail), {
  ssr: false,
});
