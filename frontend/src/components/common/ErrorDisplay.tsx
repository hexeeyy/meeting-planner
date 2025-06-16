interface ErrorDisplayProps {
  error: string | null;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;
  return <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>;
}