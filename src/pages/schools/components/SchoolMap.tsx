import React, { useEffect, useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

import allStates from "./data/allstates.json";
import styles from "./SchoolMap.module.css";
import { useSheetsContext } from "@/context/SheetsContext";

export interface SchoolState {
  id: string;
  val: string;
  lat: number;
  lon: number;
  name: string;
  url: string;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets: { [key: string]: number[] } = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const MapChart = () => {
  const { schoolsContext } = useSheetsContext();
  const schoolStates = schoolsContext.schoolStates;

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#667517"
              />
            ))}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              const curSchool = schoolStates.filter((s) => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    curSchool.length > 0 &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <>
                        <Marker coordinates={centroid}>
                          <text
                            y="2"
                            fontSize={14}
                            textAnchor="middle"
                            fill="#000"
                          >
                            {cur.id}
                          </text>
                        </Marker>
                        {curSchool.map((school: SchoolState, index: number) => {
                          return (
                            <SchoolDot
                              school={school}
                              index={index}
                              key={`${school.name}-${index}`}
                            />
                          );
                        })}
                      </>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                        connectorProps={{}}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;

const SchoolDot = ({
  school,
  index,
}: {
  school: SchoolState;
  index: number;
}) => {
  const [showSchoolName, setShowSchoolName] = useState(false);
  const [radius, setRadius] = useState(3);
  const color = getColor(index);
  return (
    <Marker
      coordinates={[school.lon, school.lat]}
      key={`${school.name}-${index}`}
      onMouseEnter={() => {
        setShowSchoolName(true);
        setRadius(7);
      }}
      onMouseLeave={() => {
        setShowSchoolName(false);
        setRadius(3);
      }}
      className={showSchoolName === true ? styles.schoolDot : ""}
      onClick={() => {
        window.open(school.url, "_blank");
      }}
    >
      <circle r={radius} fill={color} stroke="#000" strokeWidth={1} />
      {showSchoolName === true ? <text>{school.name}</text> : null}
    </Marker>
  );
};

const getColor = (index: number) => {
  switch (index) {
    case 0:
      return "#F00";
    case 1:
      return "#0F0";
    case 2:
      return "#00F";
    case 3:
      return "#FF0";
    case 4:
      return "#0FF";
    case 5:
      return "#FF0";
    case 6:
      return "#FFF";

    default:
      return "#F00";
  }
};
