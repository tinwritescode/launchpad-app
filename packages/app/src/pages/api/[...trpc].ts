import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'nextjs-cors';
import { createOpenApiNextHandler } from 'trpc-openapi';
import { appRouter } from '../../server/api/root';
import { createTRPCContext } from '../../server/api/trpc';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup CORS
  await cors(req, res);

  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    router: appRouter,
    createContext: createTRPCContext,
    responseMeta: ({ data, errors, type }) => {
      if (errors) {
        if (errors.find((error) => error.code === 'UNAUTHORIZED')) {
          return {
            status: 401,
          };
        }

        if (errors.find((error) => error.code === 'BAD_REQUEST')) {
          return {
            status: 400,
          };
        }
      }

      return {};
    },
  })(req, res);
};

export default handler;
