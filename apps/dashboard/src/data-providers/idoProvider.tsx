import { DataProvider } from "@refinedev/core";

export const idoProvider = (url: string): DataProvider => ({
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const response = await fetch(`${url}/${resource}`, {
      method: "GET",
    });

    const res = await response.json();

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
    const response = await fetch(`${url}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
    });

    const data = await response.json();

    return {
      data,
    };
  },
  update: ({ resource, id, variables, meta }) => undefined as any,
  deleteOne: ({ resource, id, variables, meta }) => undefined as any,
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${url}/${resource}/${id}`, {
      method: "GET",
    });

    const data = await response.json();

    return {
      data,
    };
  },
  getApiUrl: () => url,
  getMany: async ({ resource, ids, meta }) => {
    const data = await fetch(`${url}/${resource}?ids=${ids}`, {
      method: "GET",
    }).then((res) => res.json());

    return {
      data,
    };
  },
  createMany: ({ resource, variables, meta }) => undefined as any,
  deleteMany: ({ resource, ids, variables, meta }) => undefined as any,
  updateMany: ({ resource, ids, variables, meta }) => undefined as any,
  custom: ({ url, method, filters, sorters, payload, query, headers, meta }) =>
    undefined as any,
});
