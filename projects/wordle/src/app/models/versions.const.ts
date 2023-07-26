import { version } from './version.interface';

export const versions: { [key: string]: version } = {
  serie: { code: 'serie', icon: '📺', label: '📺 Series', storagePrefix: 'e8c9' },
  anime: { code: 'anime', icon: '🎎', label: '🎎 Animes', storagePrefix: '8c16' }
};
