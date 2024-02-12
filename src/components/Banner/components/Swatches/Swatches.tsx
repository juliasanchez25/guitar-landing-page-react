import { Data } from "../../../../interfaces/Data";
import { SwatchCircle } from "./SwatchCircle";

type SwatchesProps = {
  activeData: Data;
  swatchData: Data[];
  handleSwatchClick: (item: Data) => void;
};

export const Swatches = ({ activeData, swatchData, handleSwatchClick }: SwatchesProps) => {
  const handleSwatchClicked = (item: Data) => {
    handleSwatchClick(item);
  }

  return (
    <div className="h-fit absolute z-20 w-full bottom-0 flex justify-center gap-8 mb-2  lg:w-fit lg:inset-y-[40%] lg:right-20 lg:flex-col">
      {swatchData.map((item, index) => (
        <SwatchCircle
          key={index}
          item={item}
          activeId={activeData.id}
          handleClick={handleSwatchClicked}
        />
      ))}
    </div>
  );
}