const filters = [
  "All",
  "Web Development",
  "JavaScript",
  "Data Structures",
  "Server",
  "Music",
  "Information technology",
  "Rewards",
  "Gaming",
  "Live",
  "Spring Framework",
];

function FilterBar({ activeCategory, setActiveCategory }) {
  return (
    <div className="px-4 py-2 overflow-x-auto whitespace-nowrap flex gap-3 bg-[#0F0F0F] text-white border-b sticky top-[56px] z-4">
      {filters.map((item, index) => (
        <button
          key={index}
          onClick={() => setActiveCategory(item)}
          className={`px-6 py-1 text-md rounded-full whitespace-nowrap transition-colors duration-200
            ${
              activeCategory === item
                ? "bg-white text-black"
                : "bg-[#272727] text-white"
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
