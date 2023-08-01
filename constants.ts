export enum ProductListStatusEnum {
  ALL = "all",
  UPLOADED = "uploaded",
  COMPLETED = "completed",
}

export enum StatusEnum {
  NOT_FOUND = 'not found',
  IN_STOCK = 'in stock',
  NOT_IN_STOCK = 'not in stock'
}

export enum ButtonSettingsEnum {
  ADD = 'add',
  CLEAR = 'clear',
}


export const UploadsTabsLabel = [
  {
    title: "Все",
    query: ProductListStatusEnum.ALL,
    key: 1,
  },
  {
    title: "Загруженные товары",
    query: ProductListStatusEnum.UPLOADED,
    key: 2,
  },
  {
    title: "Добавленные товары",
    query: ProductListStatusEnum.COMPLETED,
    key: 3,
  },
];
