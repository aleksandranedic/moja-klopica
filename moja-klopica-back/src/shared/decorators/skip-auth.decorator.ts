import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
//decorator koji kaze da za rutu ne mora da postoji Authetication Bearer, tj jwt auth guard se nece aktivirati
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
