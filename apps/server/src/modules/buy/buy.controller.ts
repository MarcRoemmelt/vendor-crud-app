import { Body, Controller, Post, Req } from '@nestjs/common';

import { BuyService } from './buy.service';
import { BuyProductDto } from './dto/buy-product.dto';

@Controller('buy')
export class BuyController {
    constructor(private buyService: BuyService) {}

    @Post()
    buy(@Req() req, @Body() buyProductDto: BuyProductDto) {
        const userId = req.user.userId;
        return this.buyService.buy(buyProductDto, userId);
    }
}
