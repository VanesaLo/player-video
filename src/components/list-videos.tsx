"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Search } from "lucide-react";

import { trpc } from "@/server/client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function VideoList() {
  const [videos, setVideos] = useState<any[]>([]);
  const [search, SetSearch] = useState<string>("");
  // console.log("VIDEO LIST", videos);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data, isLoading, error, isError, refetch } =
    trpc.video.getVideos.useQuery({ query: search });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = () => {
    router.push(pathname + "?" + createQueryString("q", search));

    // Actualizar la lista de videos
    setVideos(data || []);

    // Actualizar el estado de videos
    refetch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setVideos(data || []);
  }, [data]);

  if (isError) {
    console.log({ error });
  }

  return (
    <div className="container mx-auto p-6">
      {/* Search */}
      <div className="relative mb-4 ">
        {/* Ícono a la izquierda */}
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </span>

        {/* Input */}
        <Input
          type="text"
          placeholder="Buscar..."
          className="pl-10"
          value={search}
          onChange={(e) => SetSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Is Loading */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <p>Cargando...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex justify-center items-center">
          <p>Error: {error?.message}</p>
        </div>
      )}

      {/* Videos */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden cursor-pointer"
              onClick={() => router.push(`/video/${video.id}`)}
            >
              <CardContent className="p-0">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={500}
                  height={500}
                  style={{ objectFit: "cover" }}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <div className="flex items-start space-x-4 w-full">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback>{video.channelTitle[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {video.channel}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="mr-1 h-4 w-4" />
                      <span>
                        {video.views} views • {video.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
