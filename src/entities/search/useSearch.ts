import {useContext} from 'react';
import {SearchContext} from '@/entities/search/SearchContext';

const useSearch = () => {
  const searchContext = useContext(SearchContext)
  if (!searchContext) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return searchContext
}

export default useSearch