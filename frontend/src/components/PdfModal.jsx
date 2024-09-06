import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  Worker,
  Viewer,
  SpecialZoomLevel,
  Plugin,
} from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { scrollModePlugin, ScrollMode } from "@react-pdf-viewer/scroll-mode";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

// Custom plugin to disable scrolling
const disableScrollPlugin = () => {
  const renderViewer = (props) => {
    const { slot } = props;
    if (slot.subSlot && slot.subSlot.attrs && slot.subSlot.attrs.style) {
      slot.subSlot.attrs.style = {
        ...slot.subSlot.attrs.style,
        overflow: "hidden", // Disable scrolling in the pages container
      };
    }
    return slot;
  };

  return {
    renderViewer,
  };
};

export default function PdfModal({ fileUrl, recommendation }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage } = pageNavigationPluginInstance;

  const scrollModePluginInstance = scrollModePlugin();
  const disableScrollPluginInstance = disableScrollPlugin();

  return (
    <>
      {recommendation ? (
        <Button
          color="primary"
          className="text-white w-[20%]"
          size="sm"
          onPress={onOpen}
        >
          View CV
        </Button>
      ) : (
        <div className="flex gap-1">
          <p className="text-md font-bold mt-1">Your CV :</p>

          <Button
            color="primary"
            className="text-white w-[20%]"
            size="sm"
            onPress={onOpen}
          >
            View CV
          </Button>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <div className="relative w-full h-screen">
                    {/* Navigation Buttons */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50">
                      <button
                        className="px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
                        onClick={jumpToPreviousPage}
                      >
                        &lt;
                      </button>
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50">
                      <button
                        className="px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
                        onClick={jumpToNextPage}
                      >
                        &gt;
                      </button>
                    </div>
                    {/* Viewer with custom plugins */}
                    <Viewer
                      fileUrl={fileUrl}
                      plugins={[
                        pageNavigationPluginInstance,
                        scrollModePluginInstance,
                        disableScrollPluginInstance,
                      ]}
                      defaultScale={SpecialZoomLevel.PageWidth}
                    />
                  </div>
                </Worker>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
