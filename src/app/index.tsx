import AudioPlayer from "../components/AudioPlayer";

const Index = () => {
  const audioData = {
    id: "2",
    title: "Moonlight Sonata",
    artist: "Ludwig van Beethoven",
    image: "https://images.unsplash.com/photo-1682687221006-b7fd60cf9dd0?w=800",
    audioUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <AudioPlayer track={audioData} />
    </div>
  );
};

export default Index;
