"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Eye,
  ThumbsUp,
  ThumbsDown,
  Share2,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";
import { Video } from "@/interfaces/video";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { trpc } from "@/server/client";
import transformDate from "../utils/transform-date";
import ReactPlayer from "react-player";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function VideoPlayer({ id }: { id: number }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [host, setHost] = useState("");
  const { toast } = useToast();

  const [search, SetSearch] = useState<string>("");
  // console.log("VIDEO LIST", videos);

  const pathname = usePathname();
  const router = useRouter();

  const { data: videos } = trpc.video.getVideos.useQuery({ query: search });

  const { data, isLoading, error, isError, refetch } =
    trpc.video.getVideo.useQuery({ id: Number(id) });

  const {
    data: likes,
    error: likeError,
    mutate,
  } = trpc.video.updateLikes.useMutation({
    onSettled: () => {
      refetch();
    },
  });

  const {
    data: views,
    error: viewError,
    mutate: viewMutate,
  } = trpc.video.updateViews.useMutation({
    onSettled: () => {
      refetch();
    },
  });

  const handleSubmit = () => {
    router.back();
  };

  const handleUpdateLike = () => {
    mutate({ id: Number(id) });
  };

  useEffect(() => {
    viewMutate({ id: Number(id) });
  }, []);

  useEffect(() => {}, [videos]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.host);
    }
  }, []);

  return (
    <>
      {/* Is Loading */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <p>Cargando...</p>
        </div>
      )}

      <div className="container mx-auto p-4">
        <Button
          variant="outline"
          size="icon"
          className="mb-4"
          onClick={() => handleSubmit()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Toaster />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Main Video Player */}
            <div className="aspect-video bg-gray-800 rounded-lg">
              {/* Replace this div with an actual video player component */}
              <div className="w-full h-full flex items-center justify-center text-white">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${data?.videoId}`}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            </div>

            {/* Video Title and Actions */}
            <div>
              <h1 className="text-2xl font-bold mb-2">{data?.title}</h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback>{data?.channelTitle[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{data?.channelTitle}</p>
                    <p className="text-sm text-muted-foreground">subscribers</p>
                  </div>
                  <Button
                    variant={isSubscribed ? "secondary" : "default"}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleUpdateLike()}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {data?.likes}
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    {data?.views}
                  </Button>
                  <CopyToClipboard
                    text={`${host}${pathname}`}
                    onCopy={() => setCopied(true)}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Link Copiado",
                        });
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>

            {/* Video Description */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Eye className="h-4 w-4" />
                  <span>{data?.views} views</span>
                  <span>•</span>
                  <span>{transformDate(data?.publishedAt || ("" as any))}</span>
                </div>
                <p>{data?.description}</p>
              </CardContent>
            </Card>

            {/* Comments Section Placeholder */}
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4">Comentarios</h2>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MessageSquare className="h-5 w-5" />
                  <span>
                    Los comentarios están desactivados para este vídeo
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Videos */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2"> Videos Recomendados</h2>
            {videos?.map((video) => (
              <Card key={video.id} className="flex overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-40 h-24 object-cover"
                />
                <CardFooter className="flex-1 p-2">
                  <div className="space-y-1">
                    <h3 className="font-semibold line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {video.channelTitle}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="mr-1 h-4 w-4" />
                      <span>
                        {video.views} •{" "}
                        {
                          transformDate(
                            video.publishedAt || ("" as any)
                          ) as string
                        }
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
