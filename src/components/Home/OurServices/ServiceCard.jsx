import React from "react";
import "@/styles/ServiceCard.css";
import { IoGameControllerOutline } from "react-icons/io5";
import { RiMusicLine } from "react-icons/ri";
import {
  SiUnrealengine,
  SiUnity,
  SiBlender,
  SiGodotengine,
  SiAseprite,
  SiProtools,
  SiAutodeskmaya,
} from "react-icons/si";
import { MdOutlineGames } from "react-icons/md";
import { TbCube3dSphere } from "react-icons/tb";
import { Icon } from "@iconify/react";
import GDevelopIcon from "@/assets/Icons/gdev.svg?react";
import FlStudioIcon from "@/assets/Icons/icons8-fl-studio.svg?react";
import AbletonliveIcon from "@/assets/Icons/abletonlive-svgrepo-com.svg?react";
import ZBrushIcon from "@/assets/Icons/zbrush-svgrepo-com.svg?react";
import SubstancePainterIcon from "@/assets/Icons/substance-painter.svg?react";

const IconMap = {
  Unity: SiUnity,
  Unreal: SiUnrealengine,
  Blender: SiBlender,
  GameLine: MdOutlineGames,
  Controller: IoGameControllerOutline,
  Music: RiMusicLine,
  Modelling: TbCube3dSphere,
  Godot: SiGodotengine,
  Aseprite: SiAseprite,
  ProTools: SiProtools,
  Maya: SiAutodeskmaya,
  // Local Assets (Imported as Images)
  GDevelop: GDevelopIcon,
  FlStudio: FlStudioIcon,
  Abletonlive: AbletonliveIcon,
  ZBrush: ZBrushIcon,
  SubstancePainter: SubstancePainterIcon,
};

export default function ServiceCard({ service }) {
  const ServiceIcon = IconMap[service.service_icon];

  return (
    <div className="service-card site-card radius-8 p-20">
      {/* Service Icon */}
      <div className="service-icon-container m-auto">
        {service.service_icon.startsWith("/assets/") ? (
          <img
            src={service.service_icon}
            alt={service.service_name}
            className="service-icon"
          />
        ) : ServiceIcon ? (
          typeof ServiceIcon === "function" ? (
            <ServiceIcon className="service-icon t-color-gray" />
          ) : (
            <Icon
              icon={`simple-icons:${service.service_icon.toLowerCase()}`}
              className="service-icon"
            />
          )
        ) : null}
      </div>

      {/* Service Name */}
      <h3 className="service-title t-18 t-color-cyan text-center t-bold">
        {service.service_name}
      </h3>

      {/* Service Tools */}
      <div className="service-tools">
        {Object.keys(service.service_tools).map((key, index) => {
          const toolKey = service.service_tools_icons[`icon${index + 1}`];
          const ToolIcon = IconMap[toolKey];

          return (
            <div
              key={index}
              className="service-tool radius-8 t-color-gray t-14"
            >
              {typeof ToolIcon === "function" ? (
                <ToolIcon className="icon-24" />
              ) : ToolIcon ? (
                <img
                  src={ToolIcon}
                  alt={service.service_tools[key]}
                  className="icon-24 t-color-gray"
                />
              ) : (
                <Icon
                  icon={`simple-icons:${toolKey.toLowerCase()}`}
                  className="icon-24"
                />
              )}
              <span>{service.service_tools[key]}</span>
            </div>
          );
        })}
      </div>

      {/* Service Description */}
      <p className="service-description t-16">{service.service_description}</p>
    </div>
  );
}
