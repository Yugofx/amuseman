import { ScaleWriter } from '../pages/Games/ScaleWriter';
import { Pitcher } from '../pages/Games/Pitcher';

export const GAME_ROUTES = [
    {
        category: 'theory',
        pathFragment: 'scale-writer',
        title: 'Scale Writer',
        component: ScaleWriter,
        description: ''
    },
    {
        category: 'voice',
        pathFragment: 'pitcher',
        title: 'Pitcher',
        component: Pitcher,
        description: 'Your job is to sing as closer to the sound as you can'
    },
];
