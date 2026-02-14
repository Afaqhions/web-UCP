export const Skeleton = ({ width = 'w-full', height = 'h-4', className, count = 1 }) => {
  return (
    <div className={className}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`${width} ${height} bg-gray-200 rounded animate-pulse mb-3`}
          />
        ))}
    </div>
  );
};
