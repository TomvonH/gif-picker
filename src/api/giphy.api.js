import httpClient from "./httpClient";

const END_POINT = "/v1/gifs/search";
const apiKey = "rWqXP4sGGTHujRmCN1osOoCEQEBOWibd";

const getAllGifs = (searchTerm, visibleItemsPerPageCount, offset) =>
    httpClient.get(END_POINT, {
        useCahe: true,
        params: {
            api_key: apiKey,
            q: searchTerm,
            limit: visibleItemsPerPageCount,
            offset: offset
        }
    });

export { getAllGifs };
