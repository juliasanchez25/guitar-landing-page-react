export type Data = {
  id: number;
  text: string;
  subText: string;
  description: string;
  swatchColor: string;
  background: string;
  textColor: string;
  buttonColor: { text: string; background: string };
  itemList: {
    bag: { color: string };
    strap: { color: string };
    metal: { color: string };
  };
};
