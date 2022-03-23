import { Injectable } from '@nestjs/common';
import {} from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
