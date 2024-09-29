import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, ThumbsUp, ThumbsDown, Share2, MessageSquare } from "lucide-react";

const mainVideo = {
  id: 1,
  title: "Next.js 13 Crash Course - App Router, Server Components and More",
  views: "120K",
  likes: "10K",
  timestamp: "2 weeks ago",
  channel: "Code with John",
  subscribers: "500K",
  description:
    "In this comprehensive crash course, we dive deep into Next.js 13, exploring the new App Router, Server Components, and much more. Whether you're a beginner or an experienced developer, this video will help you master the latest features of Next.js.",
};

const recommendedVideos = [
  {
    id: 2,
    title: "React Hooks Explained",
    thumbnail: "/placeholder.svg?height=120&width=200",
    channel: "React Mastery",
    views: "50K",
    timestamp: "1 month ago",
  },
  {
    id: 3,
    title: "Building a REST API with Node.js",
    thumbnail: "/placeholder.svg?height=120&width=200",
    channel: "Backend Basics",
    views: "75K",
    timestamp: "3 weeks ago",
  },
  {
    id: 4,
    title: "CSS Grid Layout Tutorial",
    thumbnail: "/placeholder.svg?height=120&width=200",
    channel: "CSS Wizardry",
    views: "30K",
    timestamp: "5 days ago",
  },
  // Add more recommended videos as needed
];

export default function VideoPlayer() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Main Video Player */}
          <div className="aspect-video bg-gray-800 rounded-lg">
            {/* Replace this div with an actual video player component */}
            <div className="w-full h-full flex items-center justify-center text-white">
              Video Player Placeholder
            </div>
          </div>

          {/* Video Title and Actions */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{mainVideo.title}</h1>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  <AvatarFallback>{mainVideo.channel[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{mainVideo.channel}</p>
                  <p className="text-sm text-muted-foreground">
                    {mainVideo.subscribers} subscribers
                  </p>
                </div>
                <Button
                  variant={isSubscribed ? "secondary" : "default"}
                  onClick={() => setIsSubscribed(!isSubscribed)}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {mainVideo.likes}
                </Button>
                <Button variant="secondary" size="sm">
                  <ThumbsDown className="mr-2 h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Eye className="h-4 w-4" />
                <span>{mainVideo.views} views</span>
                <span>•</span>
                <span>{mainVideo.timestamp}</span>
              </div>
              <p>{mainVideo.description}</p>
            </CardContent>
          </Card>

          {/* Comments Section Placeholder */}
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MessageSquare className="h-5 w-5" />
                <span>Comments are disabled for this video</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Videos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Recommended Videos</h2>
          {recommendedVideos.map((video) => (
            <Card key={video.id} className="flex overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-40 h-24 object-cover"
              />
              <CardFooter className="flex-1 p-2">
                <div className="space-y-1">
                  <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {video.channel}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="mr-1 h-4 w-4" />
                    <span>
                      {video.views} • {video.timestamp}
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
