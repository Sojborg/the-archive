import React, { useState } from "react";

interface ISearchContext {
  searchQuery: string,
  setSearchQuery(query: string): void;
}

export const SearchContext = React.createContext({} as ISearchContext);

interface ISearchProviderProps {
  children: any;
}

export const SearchProvider = (props: ISearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
