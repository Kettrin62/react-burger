type TType = 'bun' | 'main' | 'sauce';

export type TCard = {
  readonly calories: number,
  readonly carbohydrates: number,
  readonly fat: number,
  readonly image: string,
  readonly image_large: string,
  readonly image_mobile: string,
  readonly price: number,
  readonly name: string,
  readonly proteins: number,
  readonly __v: number,
  readonly _id: string,
  readonly type: TType,
};

export type TTabCurrent = 'one' | 'two' | 'three';