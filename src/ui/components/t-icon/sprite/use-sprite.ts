import Sprite from './TIconSprite.vue';
import { createApp } from 'vue';

export const iconSprite = {
  burger: 't-icon__burger',
  burger_edit: 't-icon__burger_edit',
  edit: 't-icon__edit',
  visibility: 't-icon__visibility',
  visibility_off: 't-icon__visibility_off',
  settings: 't-icon__settings',
  person: 't-icon__person',
  person_error: 't-icon__person_error',
  inventory: 't-icon__inventory',
  video_camera: 't-icon__video_camera',
  photo_camera: 't-icon__photo_camera',
  star_border: 't-icon__star_border',
  star_fill: 't-icon__star_fill',
  road_add: 't-icon__road_add',
  folder_open: 't-icon__folder_open',
  search: 't-icon__search',
  list: 't-icon__list',
  home: 't-icon__home',
  fullscreen: 't-icon__fullscreen',
  fullscreen_off: 't-icon__fullscreen_off',
  info: 't-icon__info',
  error: 't-icon__error',
  direction_right: 't-icon__direction_right',
  moving: 't-icon__moving',
  speed: 't-icon__speed',
  water_drop: 't-icon__water_drop',
  copy: 't-icon__copy',
  web_window: 't-icon__web_window',
  delete: 't-icon__delete',
  bell: 't-icon__bell',
  close: 't-icon__close',
  leaf_through: 't-icon__leaf_through',
  plus: 't-icon__plus',
  minus: 't-icon__minus',
  arrow_left_top: 't-icon__arrow_left_top',
  arrow_left_bottom: 't-icon__arrow_left_bottom',
  arrow_right_top: 't-icon__arrow_right_top',
  arrow_right_bottom: 't-icon__arrow_right_bottom',
  arrow_left: 't-icon__arrow_left',
  arrow_top: 't-icon__arrow_top',
  arrow_right: 't-icon__arrow_right',
  arrow_bottom: 't-icon__arrow_bottom',
  arrow_tail_right: 't-icon__arrow_tail_right',
  download: 't-icon__download',
  pie: 't-icon__pie',
  check_circle: 't-icon__check_circle',
  pause: 't-icon__pause',
  play: 't-icon__play',
  circle: 't-icon__circle',
  direction_walk: 't-icon__direction_walk',
  check: 't-icon__check',
};

export type IconKey = keyof typeof iconSprite;

const useSprite = {
  install() {
    const container = document.body;
    if (!container) return;
    const spriteContainer = document.createElement('div');
    container.appendChild(spriteContainer);

    createApp(Sprite).mount(spriteContainer);
  },
};

export default useSprite;
