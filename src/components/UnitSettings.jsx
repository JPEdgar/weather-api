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
   let type = "";
   let isDefault = false;

   if (tempSettings.units === "M") type = "M";
   else if (tempSettings.units === "S") type = "S";
   else if (tempSettings.units === "I") type = "I";

   if (type === tempSettings.units) isDefault = true;

   return (
      <>
         {isDefault ? (
            <Form.Check
               type="radio"
               label={label}
               name="settings_Units"
               id={`settings_Units_${id}`}
               value={value}
               onChange={() => setTempSettings({ ...tempSettings, units: value })}
               defaultChecked
            />
         ) : (
            <Form.Check
               type="radio"
               label={label}
               name="settings_Units"
               id={`settings_Units_${id}`}
               value={value}
               onChange={() => setTempSettings({ ...tempSettings, units: value })}
            />
         )}
      </>
   );
}
