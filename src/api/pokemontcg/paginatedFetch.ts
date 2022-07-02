import { headers } from "./parameters";

export const paginatedFetch = <T>(
  url: URL,
  page = 1,
  prevData: T[] = []
): Promise<T[]> => {
  url.searchParams.set("page", page.toString());
  return fetch(url, { headers })
    .then((res) => res.json())
    .then((res) => {
      const newData = [...prevData, ...res.data];

      if (newData.length < res.totalCount && res.data.length) {
        return paginatedFetch(url, page + 1, newData);
      }

      return newData as T[];
    });
};
