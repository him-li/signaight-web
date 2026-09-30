"use client";
import React from "react";
import { ControlProps } from "@jsonforms/core";

type Props = React.PropsWithChildren<ControlProps>;

export default function SettingsWrapper({ children }: Props) {
  // const [hover, setHover] = useState(false);
  // const { modal, setOpenModal } = useUpdateJsonFormControlModal(props);
  return <>{children}</>;

  // return (
  //   <div className="relative w-full">
  //     <div
  //       onMouseEnter={() => {
  //         setHover(true);
  //       }}
  //       onMouseLeave={() => {
  //         setHover(false);
  //       }}
  //     >
  //       {hover && (
  //         <div className="absolute top-0 end-[-3px] cursor-pointer z-50">
  //           <Tooltip content={props.label + " schema settings"}>
  //             <RoundButton
  //               isIconOnly
  //               startContent={<MdSettings />}
  //               color="white"
  //               aria-label={props.label + " schema settings"}
  //               onClick={() => {
  //                 setOpenModal(true);
  //               }}
  //             />
  //           </Tooltip>
  //         </div>
  //       )}
  //       {children}
  //       {modal}
  //     </div>
  //   </div>
  // );
}
