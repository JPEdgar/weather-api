import React from "react";

// libraries
import { Form } from "react-bootstrap";

export default function UnitSettings({
   id,
   label,
   value,
   tempSettings,
   setTempSettings,
}) {
   let isDefault = false;

   if (tempSettings.units === value) isDefault = true;

   return (
      <>
         {isDefault ? (
            <Form.Check
               type="radio"
               label={label}
               name="settings_Units"
               id={`settings_Units_${id}`}
               value={value}
               onChange={() =>
                  setTempSettings((curr) => ({ ...curr, units: value }))
               }
               defaultChecked
            />
         ) : (
            <Form.Check
               type="radio"
               label={label}
               name="settings_Units"
               id={`settings_Units_${id}`}
               value={value}
               onChange={() =>
                  setTempSettings((curr) => ({ ...curr, units: value }))
               }
            />
         )}
      </>
   );
}
