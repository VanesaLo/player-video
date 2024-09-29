import prisma from "@/utils/prisma";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const videoRouter = router({
  getVideos: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const data = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${input.query}&key=${process.env.YOUTUBE_KEY}`
        );
        const result = await data.json();
        return result;
      } catch (error) {
        throw new Error("Error fetching videos de YouTube");
      }
    }),

  updateViews: publicProcedure
    .input(
      z.object({
        id: z.number(),
        videoId: z.string(),
        title: z.string(),
        likes: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { videoId, title, id, likes } = input;

      return await prisma.videos.upsert({
        where: {
          videoId: videoId,
          id: id,
        },
        update: {
          views: {
            increment: 1,
          },
        },
        create: {
          id: id,
          title: title,
          videoId: videoId,
          likes: likes,
          views: 1,
        },
      });
    }),

  updateLikes: publicProcedure
    .input(
      z.object({
        id: z.number(),
        videoId: z.string(),
        title: z.string(),
        views: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { videoId, title, id, views } = input;

      return await prisma.videos.update({
        where: {
          videoId: videoId,
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    }),
});
