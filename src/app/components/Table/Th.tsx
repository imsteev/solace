export default function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className={`text-left`}>
      <div className="p-2">{children}</div>
    </th>
  );
}
