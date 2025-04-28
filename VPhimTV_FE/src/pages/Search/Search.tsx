import { useState } from 'react';

export default function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const movieList = Array.from({ length: 30 });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movieList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(movieList.length / itemsPerPage);

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <div className="bg-gray-800 p-3 rounded-md mb-6 flex items-center gap-2 text-sm">
        <i className="fa fa-home text-orange-400"></i>
        <a href="/" className="text-orange-400 hover:underline">VPHIMTV</a>
        <span className="text-gray-400">{' > '}</span>
        <span className="text-gray-300">Tìm kiếm</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        Kết quả tìm kiếm : <span className="text-yellow-400"></span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentMovies.map((_, i) => (
          <div key={i} className="relative group overflow-hidden rounded-md shadow-lg max-w-xs mx-auto">
            <img src="/src/assets/imgs/anh-mau.webp" alt={`Phim ${i + 1}`} className="w-full h-48 object-cover group-hover:scale-105 transition" />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {i % 2 === 0 ? "0 | Vietsub | FHD" : "1 | Vietsub + Lồng Tiếng | HD"}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-2">
              <h2 className="text-sm font-semibold truncate">Doraemon: Phim số {i + 1}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1} 
          className="btn btn-primary"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)} 
            className={`btn ${currentPage === index + 1 ? 'btn-secondary' : 'btn-ghost'}`}
          >
            {index + 1}
          </button>
        ))}

        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
}