import { instanceCachingFactory, registry } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import { SupabaseSearchCampusInfo } from "@modules/campusops/infrastructure/db/supbase-search-campus-info.js";

@registry([
  {
    token: TOKENS.SearchCampusInfo,
    useFactory: instanceCachingFactory(() => new SupabaseSearchCampusInfo()),
  },
])
export class CampusOpsRegistry {}
