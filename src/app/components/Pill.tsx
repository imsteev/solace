export default function Pill({
  children,
  colorClass,
}: {
  children: React.ReactNode;
  colorClass: string; // Tailwind class
}) {
  return (
    <div
      className={`${colorClass} rounded-full py-1 px-2 border border-gray-200  w-fit text-xs`}
    >
      {children}
    </div>
  );
}
