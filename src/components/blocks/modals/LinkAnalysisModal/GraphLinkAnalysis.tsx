import { renderToStaticMarkup } from "react-dom/server";
import { ComponentType, useEffect, useRef } from "react";
import type cytoscape from "cytoscape";
import { Spinner } from "@heroui/react";
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

export default function GraphLinkAnalysis() {
  const cyRef = useRef<HTMLDivElement>(null);
  // const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const { graphData, loading } = useProjectLinkAnalysisState();

  useEffect(() => {
    if (!cyRef.current) return;
    let cy: cytoscape.Core | null = null;

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
              width: 40,
              height: 40,
              shape: (ele: any) =>
                ele.data("type") === "person" ? "ellipse" : "round-rectangle",
              "background-fit": "cover",
              "background-clip": "node",
              "background-image": (ele: any) => {
                const picture = ele.data("picture");
                if (picture.includes("icon::")) {
                  const content = picture.replace("icon::", "");
                  console.log("content", content);
                  let icon = (getSocialMediaIcon(content) as any) || null;

                  if (icon) {
                    icon = iconToDataUrl(icon);
                    return icon;
                  }
                }
                if (picture) {
                  return `/api/image?url=${encodeURIComponent(ele.data("picture"))}`;
                }
                let icon = (getSocialMediaIcon("") as any) || null;

                icon = iconToDataUrl(icon);
                return icon;
              },
              "border-width": (ele: any) =>
                ele.data("type") === "person" ? 3 : 1,
              "border-color": (ele: any) =>
                ele.data("type") === "person" ? "#19a093" : "#fff",
              color: "black",
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
              width: 1,
              "font-size": 10,
              "font-weight": "bold",
              "text-rotation": "autorotate",
              "text-background-color": "#fff",
              "text-background-opacity": 1,
              "text-wrap": "wrap",
              "text-max-width": "90px",
              "text-margin-y": -10,
            },
          },
        ],
        layout: {
          name: "fcose",
          fit: true,
          nodeRepulsion: 22000,
          idealEdgeLength: 120,
          animate: false,
        } as cytoscape.BaseLayoutOptions,
      });
    };
    getData();

    return () => {
      cy?.destroy();
    };
  }, [graphData]);

  return (
    <div className="relative">
      {loading && <Spinner size="lg" className="absolute inset-0 z-10" />}
      {!loading && !graphData?.length ? (
        <NotFound size={200} text="No Data Available" />
      ) : null}
      {!loading && graphData?.length && (
        <div ref={cyRef} className="w-full h-[90vh]" />
      )}
      {/* {selectedNode && (
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
            <div>
              <Button
                fullWidth
                as={Link}
                href={selectedNode.url}
                target="_blank"
              >
                Open Profile
              </Button>
            </div>
          )}

          {selectedNode.type !== "person" ? (
            <Button
              fullWidth
              style={{ marginTop: "8px" }}
              onClick={() => alert(`Discovery ${selectedNode.url}`)}
            >
              Discovery
            </Button>
          ) : null}
        </div>
      )} */}
    </div>
  );
}
