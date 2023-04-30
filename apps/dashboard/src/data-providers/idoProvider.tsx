import { DataProvider } from "@refinedev/core";
import { axiosInstance } from "../utils";

export const idoProvider = (url: string): DataProvider => ({
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const response = await axiosInstance.get(`${url}/${resource}`);

    const res = response.data;

    const {
      data,
      meta: { total },
    } = res;

    return {
      data,
      total,
    };
  },
  create: async ({ resource, variables, meta }) => {
    const response = await axiosInstance.post(`${url}/${resource}`, variables);

    const data = await response.data;

    return {
      data,
    };
  },
  update: async ({ resource, id, variables, meta }) => {
    const res = await axiosInstance.put(`${url}/${resource}/${id}`, variables);
    return res.data;
  },
  deleteOne: ({ resource, id, variables, meta }) => undefined as any,
  getOne: async ({ resource, id, meta }) => {
    const response = await axiosInstance.get(`${url}/${resource}/${id}`);

    const data = await response.data;

    return {
      data,
    };
  },
  getApiUrl: () => url,
  getMany: async ({ resource, ids, meta }) => {
    const data = await axiosInstance
      .get(`${url}/${resource}?ids=${ids}`, {
        method: "GET",
      })
      .then((res) => res.data);

    return {
      data,
    };
  },
  createMany: ({ resource, variables, meta }) => undefined as any,
  deleteMany: ({ resource, ids, variables, meta }) => undefined as any,
  updateMany: ({ resource, ids, variables, meta }) => undefined as any,
  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
    meta,
  }) => {
    const data = await axiosInstance
      .request({
        url,
        method,
        data: payload,
        params: query,
        headers,
      })
      .then((res) => res.data);

    return {
      data,
    };
  },
});
