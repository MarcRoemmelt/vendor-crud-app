import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';

import { BuyService } from './buy.service';
import { BuyProductDto } from './dto/buy-product.dto';

@Controller('buy')
export class BuyController {
    constructor(private buyService: BuyService) {}

    @Post()
    @HttpCode(200)
    buy(@Req() req, @Body() buyProductDto: BuyProductDto) {
        const userId = req.user._id;
        return this.buyService.buy(buyProductDto, userId);
    }
}
