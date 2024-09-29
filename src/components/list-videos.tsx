"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Search } from "lucide-react";

import { trpc } from "@/server/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function VideoList() {
  const [videos, SetVideos] = useState<any[]>([]);
  const [search, SetSearch] = useState<string>("");

  const getVideos = trpc.video.getVideos.useQuery({ query: search });

  useEffect(() => {
    if (getVideos.data) {
      SetVideos(getVideos.data);
    }
  }, [getVideos.data, search]);

  if (getVideos.isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = () => (e: any) => {
    console.log(e);
    e.preventDefault();
    getVideos.refetch();
  };

  return (
    <div className="container mx-auto p-6">
      <Input
        type="search"
        placeholder="Search"
        className="mb-6"
        value={search}
        onChange={(e) => SetSearch(e.target.value)}
      />
      <Button onClick={handleSubmit()} variant="outline" size="icon">
        <Search className="h-4 w-4" />
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object?.values(videos).map((video: any) =>
          Object.values(video).map((item: any) => (
            <Card key={item.id?.videoId} className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={item.snippet?.thumbnails.default.url}
                  alt={item.snippet?.title}
                  width={100}
                  height={100}
                  style={{
                    objectFit: "cover",
                    height: "180px",
                    width: "320px",
                  }}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <div className="flex items-start space-x-4 w-full">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback>
                      {item.snippet?.channelTitle[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold line-clamp-2">
                      {item.snippet?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.snippet?.channelTitle}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
