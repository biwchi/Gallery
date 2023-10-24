import { createWrapperAndAppendToBody } from "@/utils";
import { createPortal } from "react-dom";

type ReactPortalProps = {
  children: JSX.Element;
  wrapperId: string;
};

export default function ReactPortal({
  children,
  wrapperId,
}: ReactPortalProps) {
  let nodeElement = document.getElementById(wrapperId);

  if (!nodeElement) {
    nodeElement = createWrapperAndAppendToBody(wrapperId);
  }

  return createPortal(children, nodeElement);
}
