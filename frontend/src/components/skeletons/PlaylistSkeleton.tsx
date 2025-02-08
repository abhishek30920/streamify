const PlaylistSkeleton = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <div
      key={index}
      className="p-2 rounded-lg bg-zinc-900 flex items-center mb-2"
    >
      <div className="w-16 h-16 bg-gray-800 rounded-lg mr-4 animate-pulse"></div>
      <div className="flex-1">
        <div className="w-24 h-4 bg-gray-800 rounded-lg mb-2 animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    </div>
  ));
};
export default PlaylistSkeleton;
