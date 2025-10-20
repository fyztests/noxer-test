import {createContext, useState, useMemo, type ReactNode} from 'react'

type SearchState = {
  isQuickSearch: boolean
  setIsQuickSearch: (v: boolean) => void
  fastKeys: string[]
  setFastKeys: (v: string[]) => void
  isSearchFocused: boolean
  setIsSearchFocused: (v: boolean) => void
}

export const SearchContext = createContext<SearchState | null>(null)
SearchContext.displayName = 'SearchContext'

type SearchProviderProps = {
  children: ReactNode
}

export const SearchProvider = (props: SearchProviderProps) => {
  const { children } = props
  const [isQuickSearch, setIsQuickSearch] = useState(false)
  const [fastKeys, setFastKeys] = useState<string[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const value = useMemo(() => ({
    isQuickSearch,
    setIsQuickSearch,
    fastKeys,
    setFastKeys,
    isSearchFocused,
    setIsSearchFocused
  }),
    [
      isQuickSearch,
      setIsQuickSearch,
      fastKeys,
      setFastKeys,
      isSearchFocused,
      setIsSearchFocused
    ]
  )

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
