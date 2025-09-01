function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  function preventRefresh(event) {
    event.preventDefault();
  }
  return (
    <>
      <form onSubmit={preventRefresh}>
        <div>
          <label>Search todos:</label>
          <input
            type="text"
            value={queryString}
            onChange={(e) => {
              setQueryString(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={() => {
              setQueryString('');
            }}
          >
            Clear
          </button>
        </div>
        <div>
          <label htmlFor="sort-select">Sort by</label>
          <select
            onChange={(e) => {
              setSortField(e.target.value);
            }}
            value={sortField}
            id="sort-select"
          >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </select>
          <label htmlFor="direction-select">Direction</label>
          <select
            onChange={(e) => {
              setSortDirection(e.target.value);
            }}
            value={sortDirection}
            id="direction-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </form>
    </>
  );
}

export default TodosViewForm;
