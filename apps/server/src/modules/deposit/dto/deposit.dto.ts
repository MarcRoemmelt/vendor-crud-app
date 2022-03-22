import { ApiPropertyOptional } from '@nestjs/swagger';
import { Coins } from '../entities/deposit.entity';

export class DepositDto implements Coins {
    @ApiPropertyOptional()
    5: number;

    @ApiPropertyOptional()
    10: number;

    @ApiPropertyOptional()
    20: number;

    @ApiPropertyOptional()
    50: number;

    @ApiPropertyOptional()
    100: number;
}
