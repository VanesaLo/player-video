import { videoRouter } from "./routers/video";
import { router } from "./trpc";

export const appRouter = router({
  video: videoRouter,
});

export type AppRouter = typeof appRouter;
