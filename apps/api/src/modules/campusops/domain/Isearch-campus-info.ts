import type {
  MatchedEmbedding,
  SearchCampusEmbeddingParams,
} from "@modules/campusops/types.js";

export interface ISearchCampusInfo {
  /**
   * Find the university's document chunks most similar to the query embedding.
   */
  getCampusInfo(params: SearchCampusEmbeddingParams): Promise<MatchedEmbedding[]>;
}
