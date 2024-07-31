import React, { useState, useEffect, useRef } from 'react';
import { Saturation, Hue, useColor } from "react-color-palette";
import "react-color-palette/css";
import './SettingsModal.css';
import Modal from '../Modal/Modal';
import close_modal_img from '../Modal/img/close.svg'

import Section from './sections/Section';
import SubSection from './sections/SubSection';
import Setting from './sections/Setting';

import Dropdown from './options/Dropdown';
import Checkbox from './options/Checkbox';

const SettingsModal = ({ onSubmit, isOpen, onClose, currentProjectname, settings}) => {
  const [color, setColor] = useColor("rgb(128 0 128)");
  const [open, setOpen] = useState(false);


  useEffect(() => {
    // Load settings
  }, [isOpen]);

  // useEffect(() => {
  //   console.log("rgb("+Math.round(color.rgb.r)+","+Math.round(color.rgb.g)+","+Math.round(color.rgb.b)+")")
  //   document.documentElement.style.setProperty("--header", "rgb("+Math.round(color.rgb.r)+","+Math.round(color.rgb.g)+","+Math.round(color.rgb.b)+")");
  // }, [color]);

  const handleCancel = () => {
    // Save settings
    let json_settings = {"name": currentProjectname, "config":{}}

    Object.entries(settings).map( ([key, setting]) => {
      json_settings.config[key] = setting.value;
    })

    const str = JSON.stringify(json_settings);

    console.log(str);
    
    fetch("/tree_api/save_project_configuration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project_name: currentProjectname, settings: str,}),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "An error occurred.");
        });
      }
    })
    onClose()
  };

  if (isOpen) {
  return (
    <Modal id="settings-modal" hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit} onReset={handleCancel} style={{display: "flex", flexDirection: "column", flexGrow: "1"}}>
        <div className="modal-titlebar">
          <label className='modal-titlebar-title' htmlFor="actionName" style={{ textAlign: "center" }}>Settings</label>
          <img className="modal-titlebar-close" onClick={() => { handleCancel(); } } src={close_modal_img}></img>
        </div>
        <div className="form-row" style={{display: "flex", flexDirection: "column", flexGrow: "1"}}>
            <ul className='settings-entry-list'>
              {/* <Section title="General">
                <SubSection title="Accent Colors">
                  <Setting title ="Turn on project accent color">
                  </Setting>
                  <Setting title ="Project accent color">
                    <Saturation height={100} color={color} onChange={setColor} />
                    <Hue width={300} color={color} onChange={setColor} />
                  </Setting>
                </SubSection>
              </Section> */}
              <Section title="Appearance">
                <SubSection title="Color theme">
                  <Setting title ="Set color theme">
                    <Dropdown
                      setting={settings.theme}
                      possibleValues={["dark", "light"]}
                    />
                  </Setting>
                </SubSection>
                <SubSection title="Editor">
                  <Setting title ="Show actions accent color">
                    <Checkbox setting={settings.editorShowAccentColors}/>
                  </Setting>
                </SubSection>
              </Section>
              <Section title="Behaviour Tree">
                <SubSection title="Execution settings">
                  <Setting title ="Order of execution of the behavior tree">
                    {/* Add explanation here */}
                    <Dropdown
                      setting={settings.btOrder}
                      possibleValues={["bottom-to-top", "top-to-bottom"]}
                    />
                  </Setting>
                </SubSection>
              </Section>
            </ul>
          </div>
      </form>
    </Modal>
  );
  }
};

export default SettingsModal;