import prisma from "@/utils/prisma";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const videoRouter = router({
  getVideos: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(({ input }) => {
      return prisma.videos.findMany({
        where: {
          OR: [{ title: { contains: input.query } }],
        },
      });
    }),

  getVideo: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.videos.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  updateViews: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.videos.update({
        where: {
          id: input.id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }),

  updateLikes: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.videos.update({
        where: {
          id: input.id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    }),
});
