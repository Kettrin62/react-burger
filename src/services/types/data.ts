export type TType = 'bun' | 'main' | 'sauce';

export type TCard = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly price: number;
  readonly name: string;
  readonly proteins: number;
  readonly __v: number;
  readonly _id: string;
  readonly type: TType;
};

export type TTabCurrent = 'one' | 'two' | 'three';

export type TCards = {
  readonly id: string;
  readonly key: string;
}

export type TUser = {
  email?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
}

export type TCardOrder = {
  readonly createdAt: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}

type TLocationObj = {
  pathname: string;
}

export type TUseLocationState = {
  from: TLocationObj;
}