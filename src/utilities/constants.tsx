export const CANVAS_SIZE = {x: 600, y: 400};
export const SCALE = 20;
export const snakeInitialSpeed = 150;

export const DIRECTION_UP = {x: 0, y: -1};
export const DIRECTION_DOWN = {x: 0, y: 1};
export const DIRECTION_LEFT = {x: -1, y: 0};
export const DIRECTION_RIGHT = {x: 1, y: 0};

import snakeHeadUp from '../assets/Bone_HeadUp.png';
import snakeHeadRight from '../assets/Bone_HeadRight.png';
import snakeHeadDown from '../assets/Bone_HeadDown.png';
import snakeHeadLeft from '../assets/Bone_HeadLeft.png';

import snakeBodyUp from '../assets/Bone_BodyUp.png';
import snakeBodyRight from '../assets/Bone_BodyRight.png';
import snakeBodyDown from '../assets/Bone_BodyDown.png';
import snakeBodyLeft from '../assets/Bone_BodyLeft.png';

import snakeTailUp from '../assets/Bone_TailUp.png';
import snakeTailRight from '../assets/Bone_TailRight.png';
import snakeTailDown from '../assets/Bone_TailDown.png';
import snakeTailLeft from '../assets/Bone_TailLeft.png';

import guideVoodooDoll from '../assets/Guide_Voodoo_Doll.png';
import lavaSlime from '../assets/Lava_Slime.png';
import lavaBat from '../assets/Lava_Bat.png';

export const loadImg = async (imgPath: string): Promise<HTMLImageElement> => {
  return await new Promise((res, rej) => {
    let image = new Image();
    image.onload = () => { res(image) }
    image.src = imgPath;  
    })
}

export const snakeHeadUpImgPath = loadImg(snakeHeadUp);
export const snakeHeadRightImgPath = loadImg(snakeHeadRight);
export const snakeHeadDownImgPath = loadImg(snakeHeadDown);
export const snakeHeadLeftImgPath = loadImg(snakeHeadLeft);

export const snakeBodyUpImgPath = loadImg(snakeBodyUp);
export const snakeBodyRightImgPath = loadImg(snakeBodyRight);
export const snakeBodyDownImgPath = loadImg(snakeBodyDown);
export const snakeBodyLeftImgPath = loadImg(snakeBodyLeft);

export const snakeTailUpImgPath = loadImg(snakeTailUp);
export const snakeTailRightImgPath = loadImg(snakeTailRight);
export const snakeTailDownImgPath = loadImg(snakeTailDown);
export const snakeTailLeftImgPath = loadImg(snakeTailLeft);

export const guideVoodooDollImgPath = loadImg(guideVoodooDoll);
export const lavaSlimeImgPath = loadImg(lavaSlime);
export const lavaBatImgPath = loadImg(lavaBat);