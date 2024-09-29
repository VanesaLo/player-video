"use client";

import { trpc } from "@/server/client";

export default function Home() {
  const getVideo = trpc.video.getYoutubeVideos.useQuery();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {JSON.stringify(getVideo.data)}
    </div>
  );
}
