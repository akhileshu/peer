import { Components } from "@/components";
import { lib } from "@/lib";
import React from "react";

function page() {
  return (
    <div>
      <div>welcome to my app</div>
      <Components.userInput.TreeDropdownRoot treeDataInitialConfig={lib.ui.treeDropdownConfig.treeDataInitialConfig}/>
    </div>
  );
}

export default page;
