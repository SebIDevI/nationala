import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import React, { ReactElement } from "react";
import { AccrdnProps } from "@/types/IndexTypes";

const Accrd: React.FC<AccrdnProps> = (props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{props.nume}</AccordionTrigger>
        <AccordionContent className="text-left">
          {props.lista
            ? props.lista.map((val) => <li className="list-none">{val}</li>)
            : props.descriere}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Accrd;
