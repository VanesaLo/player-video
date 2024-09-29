import { publicProcedure, router } from "../trpc";

export const videoRouter = router({
  getYoutubeVideos: publicProcedure.query(async () => {
    try {
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snipped&chart=mostPopular&key=${process.env.YOUTUBE_KEY}`
      );
      console.log("DATA", data);
      return data;
    } catch (error) {
      console.log("ERROR", error);
      throw new Error("Error fetching videos de YouTube");
    }
  }),
});
