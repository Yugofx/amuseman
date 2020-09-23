import { ScaleWriter } from '../pages/Games/ScaleWriter';
import { Pitcher } from '../pages/Games/Pitcher';

export const GAME_ROUTES = [
    { pathFragment: 'scale-writer', title: 'Scale Writer', component: ScaleWriter },
    { pathFragment: 'pitcher', title: 'Pitcher', component: Pitcher },
];