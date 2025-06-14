import React from "react";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

const DeleteButtonTrigger = React.forwardRef((props, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="icon"
    {...props}
  >
    <Delete />
  </Button>
));

DeleteButtonTrigger.displayName = "DeleteButtonTrigger";

export default DeleteButtonTrigger;
