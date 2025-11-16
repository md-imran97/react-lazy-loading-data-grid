export type LazyDataGridApi = {
  /**
   * Scrolls the grid to a specific row index
   */
  scrollToIndex: (rowIndex: number) => void;
  reloadData: () => void;

  //   /**
  //    * Refreshes or reloads the grid data
  //    */
  //   refresh: () => void;

  //   /**
  //    * Gets the currently visible row range
  //    */
  //   getVisibleRange: () => { start: number; end: number };

  //   /**
  //    * Selects a row by its id
  //    */
  //   selectRow?: (rowId: string | number) => void;

  //   /**
  //    * Clears all selection
  //    */
  //   clearSelection?: () => void;
};
