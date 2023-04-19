const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(items / pageSize); // 100/10

    if (pagesCount === 1) return null;

    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    const previousPage = (current: number) => {
        const nextPage = current - 1;

        if(nextPage <= 1)
            return 1

        return nextPage
    }
    const nextPage = (current: number) => {
        const nextPage = current + 1;

        if(nextPage >= pagesCount)
            return pagesCount

        return nextPage
    }

    const paginationClassname   = "px-3 py-2 leading-tight text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    const activePaginationLink  = "px-3 py-2 leading-tight font-semibold text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

    return (
        <div className="w-full p-3 flex justify-center">
            <nav className="">
                <a className="md:hidden block text-center p-2 font-bold font-gray-900">Página Atual: {currentPage}</a>
                <ul className="inline-flex -space-x-px">
                    <li>
                        <button onClick={() => onPageChange(previousPage)} type="button" className="px-3 py-2 ml-0 leading-tight text-gray-700 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Anterior</button>
                    </li>
                    {pages.map((page) => (
                        
                        <li key={page} className='hidden md:block' >
                            <button type="button" onClick={() => onPageChange(page)} className={page===currentPage?activePaginationLink:paginationClassname}>{page}</button>
                        </li>
                        
                    ))}
                    <li>
                        <button onClick={() => onPageChange(nextPage)} type="button" className="px-3 py-2 leading-tight text-gray-700 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Próximo</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;