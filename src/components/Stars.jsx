export default function Stars({ value }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= value ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}