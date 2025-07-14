import { PropsWithChildren } from "react";
import Navbar from "../_components/navbar";

export default async function WithLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
