import { useState, useEffect } from 'react';

const getSearchParams = (search: string) => new URLSearchParams(search);

export function useSearchParams(search: string) {
  const [searchParams, setSearchParams] = useState(getSearchParams(search));

  useEffect(() => {
    setSearchParams(getSearchParams(search));
  }, [search]);

  return searchParams;
}

export default useSearchParams;
