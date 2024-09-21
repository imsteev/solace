export default function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="text-left border-b border-gray-300">
      <div className="p-2">{children}</div>
    </td>
  );
}
