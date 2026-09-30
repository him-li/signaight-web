"use client";
import { ReactNode, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import type { Feature, GeoJsonProperties, Point } from "geojson";
import Map, {
  Source,
  Layer,
  MapRef,
  ViewState,
  LngLatBoundsLike,
  PointLike,
  PaddingOptions,
} from "react-map-gl/mapbox";
import Display from "@/components/atoms/Display";
import { mapDataLayer } from "styles/styles";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGeoTraceState } from "@/contexts/geoTraceContext/GeoTraceContext";
const GeoPointPin = dynamic(() => import("./GeoPointPin"), {
  loading: () => <div />,
  ssr: false,
});

type ReduceCallback = (
  acc: number,
  value: number,
  index: number,
  array: number[],
) => number;

export default function GeoTraceMap() {
  const { dateRange, geoTrace: geoData } = useGeoTraceState();
  const mapRef = useRef<MapRef>(null);

  const latitudeArray = [];
  const longitudeArray = [];
  if (geoData?.features) {
    for (const feature of geoData?.features) {
      if (feature.geometry.type == "Point") {
        latitudeArray.push(feature.geometry.coordinates[1]);
        longitudeArray.push(feature.geometry.coordinates[0]);
      }
    }
  }

  const calculateMean: ReduceCallback = (acc, value, index, array) => {
    acc += value;
    if (index === array.length - 1) {
      return acc / array.length;
    } else {
      return acc;
    }
  };

  const latAvg = latitudeArray.flat().reduce(calculateMean, 0);
  const longAvg = longitudeArray.flat().reduce(calculateMean, 0);

  const pins = useCallback(() => {
    return geoData?.features?.map((city, i) => {
      const cityDate = city.properties?.date
        ? new Date(city.properties?.date)
        : null;
      if (
        (cityDate &&
          cityDate >= new Date(dateRange.start.toString()) &&
          cityDate <= new Date(dateRange.end.toString())) ||
        (!city.properties?.date && city.geometry?.type === "Point")
      ) {
        return (
          <GeoPointPin
            key={city.id + i.toString()}
            city={city as Feature<Point, GeoJsonProperties>}
          />
        );
      } else {
        return null;
      }
    });
  }, [dateRange.end, dateRange.start, geoData?.features]);

  const renderMap = useCallback(
    (
      initialViewState: Partial<ViewState> & {
        bounds?: LngLatBoundsLike;
        fitBoundsOptions?: {
          offset?: PointLike;
          minZoom?: number;
          maxZoom?: number;
          padding?: number | PaddingOptions;
        };
      },
      key: string,
      interactiveLayerIds?: string[],
      children?: ReactNode,
    ) => (
      <Map
        key={key}
        ref={mapRef}
        initialViewState={initialViewState}
        style={{
          borderRadius: 15,
          width: "100%",
          height: "100%",
          minHeight: "200px",
        }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        cursor="pointer"
        attributionControl={false}
        interactiveLayerIds={interactiveLayerIds}
      >
        {children}
      </Map>
    ),
    [],
  );

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return <div className="flex min-h-[200px] items-center justify-center text-sm text-default-500">Map unavailable: Mapbox token not configured.</div>;
  }

  return (
    <Display
      when={!!geoData}
      fallback={renderMap(
        {
          latitude: 51.5072,
          longitude: 0.1276,
          zoom: 4,
        },
        "mapwithoutdata",
      )}
    >
      {renderMap(
        {
          latitude: latAvg < 90 && latAvg > -90 ? latAvg : 0,
          longitude: longAvg,
          zoom: 1,
        },
        "mapbox",
        ["data"],
        <>
          <Source type="geojson" data={geoData}>
            <Layer {...mapDataLayer} />
          </Source>
          {pins()}
        </>,
      )}
    </Display>
  );
}
