import React from "react";

function FormControl({label,name,type,value,handleChange}) {

    function handleInput(e)
    {
        if(type!='file')
        {
            handleChange(e.target.value)
        }
        else
        {
            handleChange(e.target.files[0])
            
        }

    }
  return (
    <div className="p-2 flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold">{label}</label>
      <input
        type={type}
        className="border w-[100%]
       outline-0 p-1 rounded-md"
       { ...(type != "file" && { value: value }) }
        id={name}

        onChange={(e)=>handleInput(e)}
      ></input>
    </div>
  );
}

export default FormControl;
