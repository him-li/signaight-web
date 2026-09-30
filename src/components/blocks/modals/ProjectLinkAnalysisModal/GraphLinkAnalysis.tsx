import { ComponentType, useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button, Spinner } from "@heroui/react";
import { useTheme } from "next-themes";
import type cytoscape from "cytoscape";
import Link from "next/link";
import { useProjectLinkAnalysisState } from "@/contexts/projectLinkAnalisysContext/ProjectLinkAnalysisContext";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import NotFound from "@/components/atoms/Icons/NotFound";

let cytoscapeLoaded: typeof cytoscape | null = null;

export async function loadCytoscape() {
  if (cytoscapeLoaded) return cytoscapeLoaded;

  const cytoscape = (await import("cytoscape")).default;
  const fcose = (await import("cytoscape-fcose")).default;

  cytoscape.use(fcose);

  cytoscapeLoaded = cytoscape;
  return cytoscape;
}

type NodeData = {
  id: string;
  type?: string;
  url?: string;
  picture?: string;
  name?: string;
};

const relationLabels = {
  bidirectional: "Two way",
  likes_page: "Page Likes",
  mutual_follow: "Bidirectional",
  mutual_friend: "Bidirectional",
  friendship: "friends",
};

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

function iconToDataUrl(Icon: ComponentType<any>, props = {}) {
  const inner = reactIconToSvg(Icon, props);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54">
      <circle cx="12" cy="12" r="12" fill="white"/>
      <g transform="translate(4,4)">
        ${inner}
      </g>
    </svg>
  `;
  return svgToBase64(svg);
}

const DEFAUTL_PERSON_IMAGE =
  "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=";

export default function GraphLinkAnalysis() {
  const { theme } = useTheme();
  const cyRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { graphData, loading } = useProjectLinkAnalysisState();

  useEffect(() => {
    if (!cyRef.current) return;
    let cy: cytoscape.Core | null = null;

    const getEdgeLabel = (ele: any) => {
      const raw = ele.data("label");
      return relationLabels[raw as keyof typeof relationLabels] || raw || "";
    };

    const getParallelIndex = (ele: any) => {
      const source = ele.data("source");
      const target = ele.data("target");

      const sameDirection = graphData.filter(
        (item: any) =>
          item.data?.source === source && item.data?.target === target,
      );

      const reverseDirection = graphData.filter(
        (item: any) =>
          item.data?.source === target && item.data?.target === source,
      );

      const allParallel = [...sameDirection, ...reverseDirection]
        .filter((item: any) => item.data?.source && item.data?.target)
        .sort((a: any, b: any) => (a.data.id > b.data.id ? 1 : -1));

      const currentIndex = allParallel.findIndex(
        (item: any) => item.data.id === ele.id(),
      );

      return {
        index: currentIndex,
        total: allParallel.length,
      };
    };

    const getControlPointDistance = (ele: any) => {
      const { index, total } = getParallelIndex(ele);

      if (total <= 1) return 0;

      const middle = (total - 1) / 2;
      return (index - middle) * 28;
    };

    const getLabelMarginY = (ele: any) => {
      const { index, total } = getParallelIndex(ele);

      if (total <= 1) return -10;

      const middle = (total - 1) / 2;
      return -10 + (index - middle) * 14;
    };

    const getData = async () => {
      const cytoscape = await loadCytoscape();

      cy = cytoscape({
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
                ele.data("type") === "person" ||
                ele.data("type") === "candidate"
                  ? "ellipse"
                  : "round-rectangle",
              "background-image": (ele: any) => {
                const avatar = ele.data("picture")
                  ? `/api/image?url=${encodeURIComponent(ele.data("picture"))}`
                  : DEFAUTL_PERSON_IMAGE;

                if (!ele.data("platform")) {
                  return [avatar];
                }
                if (
                  ele.data("type") !== "candidate" &&
                  ele.data("type") !== "person"
                ) {
                  let icon =
                    (getSocialMediaIcon(ele.data("platform")) as any) || null;

                  if (icon) {
                    icon = iconToDataUrl(icon);
                  }

                  return icon ? [avatar, icon] : [avatar];
                }
                return [avatar];
              },

              "background-fit": ["cover", "contain"],
              "background-clip": ["node", "none"],

              "background-width": ["100%", "10%"],
              "background-height": ["100%", "10%"],

              "background-position-x": ["50%", "85%"],
              "background-position-y": ["50%", "15%"],
              "border-width": (ele: any) =>
                ele.data("type") === "person" ? 3 : 1,
              "border-color": (ele: any) =>
                ele.data("type") === "person" ? "#19a093" : "#fff",
              color: theme === "light" ? "black" : "white",
              "text-valign": "bottom",
              "text-halign": "center",
              "text-margin-y": 4,
              "font-size": 8,
              "font-weight": "bold",
            },
          },
          {
            selector: "edge",
            style: {
              label: getEdgeLabel,
              width: 1,
              "line-color": (ele: any) =>
                ele.data("relation") === "bidirectional" ? "#19a093" : "#ccc",

              "curve-style": "unbundled-bezier",
              "control-point-distances": (ele: any) => [
                getControlPointDistance(ele),
              ],
              "control-point-weights": [0.8],

              "target-arrow-shape": (ele: any) => {
                const relation = ele.data("relation");
                if (
                  relation === "bidirectional" ||
                  relation === "unidirectional" ||
                  relation === "mutual_follow"
                ) {
                  return "vee";
                }
                return "none";
              },

              "source-arrow-shape": (ele: any) =>
                ele.data("relation") === "bidirectional" ? "vee" : "none",

              "target-arrow-color": (ele: any) =>
                ele.data("relation") === "bidirectional" ? "#19a093" : "#ccc",

              "source-arrow-color": (ele: any) =>
                ele.data("relation") === "bidirectional" ? "#19a093" : "#ccc",

              "font-size": 10,
              "font-weight": "bold",
              "text-rotation": "none",
              "text-margin-y": getLabelMarginY,
              "text-background-color": "#fff",
              "text-background-opacity": 1,
              "text-background-padding": "2px",
              color: "#111",
              "text-border-opacity": 0,
              "text-wrap": "none",
              "text-justification": "center",
            } as any,
          },
        ],

        layout: {
          name: "fcose",
          fit: true,
          boundingBox: {
            x1: 0,
            y1: 0,
            x2: 4000,
            y2: 2000,
          },
          nodeRepulsion: 22000,
          idealEdgeLength: 160,
          edgeElasticity: 0.2,
          gravity: 0.02,
          gravityRange: 3.8,
          animate: false,
          nodeOverlap: 40,
          componentSpacing: 400,
          nodeDimensionsIncludeLabels: true,
        } as cytoscape.BaseLayoutOptions,
      });

      cy.nodes('[type="person"]').forEach((node) => {
        const count = node.connectedEdges('[relation="bidirectional"]').length;
        node.data("bidirectionalCount", count);
      });

      cy.nodes('[type="person"]').forEach((node) => {
        const count = node.data("bidirectionalCount") || 0;
        const size = count >= 2 ? 70 + count * 10 : 60;

        node.style({
          width: size,
          height: size,
        });
      });

      cy.on("tap", "node", (evt) => {
        const node = evt.target;
        const renderedPosition = node.renderedPosition();

        setSelectedNode(node.data());
        setPosition({
          x: renderedPosition.x,
          y: renderedPosition.y,
        });
      });

      cy.on("tap", (evt) => {
        if (evt.target === cy) {
          setSelectedNode(null);
        }
      });
    };

    getData();

    return () => {
      cy?.destroy();
    };
  }, [graphData]);

  return (
    <div className="relative w-full">
      {loading && <Spinner size="lg" className="absolute inset-0 z-10" />}

      {!loading && !graphData?.length ? (
        <NotFound size={100} text="No Data Available" />
      ) : null}

      {!loading && graphData?.length > 0 && (
        <div ref={cyRef} className="w-full h-[90vh]" />
      )}

      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            background: "white",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transform: "translate(-50%, -120%)",
            zIndex: 10,
          }}
        >
          <div>
            <strong>{selectedNode.name}</strong>
          </div>

          {selectedNode.url && (
            <Link href={selectedNode.url} target="_blank">
              <Button fullWidth>Open Profile</Button>
            </Link>
          )}

          {selectedNode.type === "candidate" ? (
            <Button
              fullWidth
              className="mt-2"
              onPress={() => alert(`Discovery ${selectedNode.url}`)}
            >
              Discovery
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
