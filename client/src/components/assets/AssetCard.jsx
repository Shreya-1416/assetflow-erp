function AssetCard({ title, value, color }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 shadow-md p-6">
      <h3 className="text-sm font-medium text-slate-500">
        {title}
      </h3>

      <p className={`mt-3 text-4xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}

export default AssetCard;