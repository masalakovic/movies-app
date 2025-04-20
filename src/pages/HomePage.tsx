import React, {useEffect, useMemo, useRef, useState} from 'react';
import MoviesScroll from '../components/fragments/MoviesScroll';
import Select, {SelectOption} from '../components/shared/Select';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import {IoClose, IoSearch} from 'react-icons/io5';
import {ButtonVariant, PanelType} from '../enums';
import {getGenresFromStorage, generateYearOptions} from '../utils';
import useSearchMovies from '../hooks/useSearchMovies';
import useFilterMovies from '../hooks/useFilterMovies';
import MovieTabs from '../components/fragments/MoviesTabs';
import useDebounce from '../hooks/useDebounce';

interface HomeProps {
  activePanel: PanelType | null;
  onCloseActivePanel: () => void;
}

const HomePage: React.FC<HomeProps> = ({activePanel, onCloseActivePanel}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>();
  const [selectedYearId, setSelectedYearId] = useState<number | undefined>();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const showSearch = activePanel === PanelType.SEARCH;
  const showFilter = activePanel === PanelType.FILTERS;

  const genres = getGenresFromStorage();
  const genreOptions = useMemo(
    () => genres.map((g) => ({value: g.id, label: g.name})),
    [genres]
  );

  const yearOptions = generateYearOptions();

  const {
    data: searchedMovies,
    hasMore: hasMoreSearchedMovies,
    fetchNextPage: fetchNextSearched,
    loading: searchLoading,
  } = useSearchMovies(debouncedSearchQuery, scrollContainerRef);

  const {
    data: filteredMovies,
    hasMore: hasMoreFilteredMovies,
    fetchNextPage: fetchNextFiltered,
    loading: filterLoading,
  } = useFilterMovies(selectedGenreId, selectedYearId, scrollContainerRef);

  const displayedMovies = showSearch ? searchedMovies : filteredMovies;
  const fetchNext = showSearch ? fetchNextSearched : fetchNextFiltered;
  const hasMore = showSearch ? hasMoreSearchedMovies : hasMoreFilteredMovies;
  const isBrowsing =
    (showSearch && debouncedSearchQuery) ||
    (showFilter && (selectedGenreId || selectedYearId));

  const handleGenreChange = (selected: SelectOption | null) =>
    setSelectedGenreId(selected?.value);

  const handleYearChange = (selected: SelectOption | null) =>
    setSelectedYearId(selected?.value);

  useEffect(() => {
    setSearchQuery('');
    setSelectedGenreId(undefined);
    setSelectedYearId(undefined);
  }, [activePanel]);

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  return (
    <>
      {/* filters */}
      {activePanel && (
        <div className="flex dark:bg-zinc-900 gap-4 px-4 p-3 bg-zinc-100 items-start sm:items-center border-b border-gray-300">
          {showFilter && (
            <div className="flex sm:ml-8 gap-4 flex-col sm:flex-row w-full justify-center">
              <div className="max-w-[400px] w-full">
                <Select
                  name="genre"
                  placeholder="Select Genre"
                  options={genreOptions}
                  onChange={handleGenreChange}
                  isClearable
                />
              </div>
              <div className="max-w-[400px] w-full">
                <Select
                  name="year"
                  placeholder="Select Year"
                  options={yearOptions}
                  onChange={handleYearChange}
                  isClearable
                />
              </div>
            </div>
          )}

          {showSearch && (
            <div className="flex justify-center w-full">
              <div className="sm:ml-8 max-w-[400px] w-full">
                <Input
                  ref={searchInputRef}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  name="name"
                  leftIcon={<IoSearch className="text-gray-400" />}
                />
              </div>
            </div>
          )}

          <Button
            variant={ButtonVariant.DANGER}
            onClick={onCloseActivePanel}
            leftIcon={<IoClose />}
          />
        </div>
      )}

      {/* main content */}
      {!activePanel ? (
        <MovieTabs />
      ) : (
        <div
          id="scrollableDiv"
          className="h-[calc(100vh-134px)] overflow-auto"
          ref={scrollContainerRef}
        >
          {isBrowsing ? (
            <MoviesScroll
              movies={displayedMovies}
              hasMore={hasMore}
              fetchNext={fetchNext}
              scrollTargetId="scrollableDiv"
              loading={searchLoading || filterLoading}
            />
          ) : (
            <div className="p-4 mt-16 text-center text-zinc-400 dark:text-zinc-400">
              {(showFilter && 'Please apply filter to view movies') ||
                (showSearch && 'Please enter a search term to view movies')}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
