import React from "react";
import { Swatches } from "../Swatches/Swatches";
import { Data } from "../../../../interfaces/Data";

type CanvasProps = {
  activeData: Data;
  swatchData: Data[];
  handleSwatchClick: (item: Data) => void;
};

export class Canvas extends React.Component<CanvasProps> {
  render() {
    const { activeData, swatchData, handleSwatchClick } = this.props;

    return (
      <div className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full">
        <Swatches
          activeData={activeData}
          swatchData={swatchData}
          handleSwatchClick={handleSwatchClick}
        />
      </div>
    );
  }
}