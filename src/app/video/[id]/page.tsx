import VideoPlayer from "@/components/player-video";



export default async function PlayerVideo({params} : {params: {id: number}}) {
  return (
    <div>
      <VideoPlayer id={params.id} />
    </div>
  );
}
