import { ComponentType, useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Skeleton } from "@heroui/react";
import NotFound from "@/components/atoms/Icons/NotFound";
import type cytoscape from "cytoscape";
import ProjectLinkAnalysisProvider, {
  useProjectLinkAnalysisState,
} from "@/contexts/projectLinkAnalisysContext/ProjectLinkAnalysisContext";
import { useAppSelector } from "@/store/store";
import ClickNode from "./ClickNode";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";

let cytoscapeLoaded: typeof cytoscape | null = null;

export async function loadCytoscape() {
  if (cytoscapeLoaded) return cytoscapeLoaded;

  const cytoscape = (await import("cytoscape")).default;
  const fcose = (await import("cytoscape-fcose")).default;

  cytoscape.use(fcose);

  cytoscapeLoaded = cytoscape;
  return cytoscape;
}

function svgToBase64(svg: string) {
  return `data:image/svg+xml;base64,${btoa(
    new TextEncoder()
      .encode(svg)
      .reduce((str, byte) => str + String.fromCharCode(byte), ""),
  )}`;
}

function reactIconToSvg(Icon: ComponentType<any>, props = {}) {
  return renderToStaticMarkup(<Icon {...props} />);
}

export function iconToDataUrl(Icon: ComponentType<any>, props = {}) {
  const inner = reactIconToSvg(Icon, props);
  return svgToBase64(inner);
}

const DEFAUTL_PERSON_IMAGE =
  "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=";

export default function Graph() {
  const cyRef = useRef<HTMLDivElement>(null);
  const projectId = useAppSelector(selectCurrentProjectId)!;
  const { graphData, loading } = useProjectLinkAnalysisState();
  const [cy, setCy] = useState<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!cyRef.current) return;

    const getData = async () => {
      const cytoscape = await loadCytoscape();

      const cy = cytoscape({
        container: cyRef.current,
        elements: graphData,

        style: [
          {
            selector: "node",
            style: {
              label: "data(name)",
              width: 60,
              height: 60,
              shape: (ele: any) =>
                ele.data("type") === "person" ? "ellipse" : "round-rectangle",
              "background-fit": "cover",
              "background-clip": "node",
              "background-image": (ele: any) => {
                const type = ele.data("type");
                const picture = ele.data("picture");

                if (picture?.includes("icon::")) {
                  const content = picture.replace("icon::", "");
                  let icon = (getSocialMediaIcon(content) as any) || null;

                  if (icon) {
                    icon = iconToDataUrl(icon);
                    return icon;
                  }
                }

                if (type === "person" && picture) {
                  return `/api/image?url=${encodeURIComponent(picture)}`;
                }

                return DEFAUTL_PERSON_IMAGE;
              },

              "border-width": (ele: any) =>
                ele.data("type") === "person" ? 3 : 1,
              "border-color": (ele: any) =>
                ele.data("type") === "person" ? "#19a093" : "#fff",
              color: "black",
              "text-valign": "bottom",
              "text-halign": "center",
              "text-margin-y": 4,
              "font-size": 14,
              "font-weight": "bold",
            },
          },
          {
            selector: "edge",
            style: {
              width: 1,
              "line-color": "#ccc",
            },
          },
        ],
        layout: {
          name: "fcose",
          fit: true,
          nodeRepulsion: 22000,
          idealEdgeLength: 80,
          edgeElasticity: 0.45,

          gravity: 0.02,
          gravityRange: 3.8,
          animate: false,

          nodeOverlap: 40,
          componentSpacing: 400,
        } as cytoscape.BaseLayoutOptions,
      });
      setCy(cy);
    };
    getData();

    return () => {
      cy?.destroy();
    };
  }, [graphData]);

  return (
    <div className="relative w-full">
      {!loading && !graphData?.length ? (
        <NotFound size={100} text="No Data Available" />
      ) : null}
      {graphData?.length > 0 && (
        <div ref={cyRef} className="w-full h-80">
          {cy ? (
            <ProjectLinkAnalysisProvider projectId={projectId}>
              <ClickNode cy={cy} />
            </ProjectLinkAnalysisProvider>
          ) : null}
        </div>
      )}
      {loading && !graphData?.length ? <Skeleton className="h-80" /> : null}
    </div>
  );
}
