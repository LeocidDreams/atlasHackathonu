import { AppError } from "@core/errors/app-error.js";
import { supabase } from "@core/supabase/supabase.js";
import type {
  MatchedEmbedding,
  SearchCampusEmbeddingParams,
} from "@modules/campusops/types.js";
import type { ISearchCampusInfo } from "@modules/campusops/domain/Isearch-campus-info.js";

export class SupabaseSearchCampusInfo implements ISearchCampusInfo {
  constructor() {}

  public async getCampusInfo({
    matchCount,
    queryEmbedding,
    university,
  }: SearchCampusEmbeddingParams): Promise<MatchedEmbedding[]> {
    // Nearest chunks of the given university (see match_campusops_embeddings in supabase/migrations).
    const { data, error } = await supabase.rpc("match_campusops_embeddings", {
      query_embedding: queryEmbedding,
      match_count: matchCount,
      filter_university: university,
    });

    if (error) {
      throw AppError.internal(error.message);
    }

    return data ?? [];
  }
}
