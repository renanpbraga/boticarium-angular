import { HerbsStorageDto } from "./herbs-storage.dto";
import { KnowledgeDto } from "./knowledge.dto";
import { PlayerStatsDto } from "./player-stats.dto";
import { PotionsStorageDto } from "./potions-storage.dto";

export interface PlayerDto {
  stats: PlayerStatsDto,
  herbStorage: HerbsStorageDto[],
  potionStorage: PotionsStorageDto[],
  knowledge: KnowledgeDto;
}
