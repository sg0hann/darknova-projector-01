
import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import { X, Move } from "lucide-react";

interface DraggableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}

const DraggableModal: React.FC<DraggableModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-md"
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal with Draggable */}
          <div className="fixed inset-0 z-[51] pointer-events-none overflow-hidden">
            <Draggable
              handle=".modal-handle"
              defaultPosition={{x: window.innerWidth / 2 - 200, y: 100}}
              bounds="parent"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`${width} bg-card border border-border rounded-lg shadow-lg p-6 pointer-events-auto`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-5 modal-handle cursor-move select-none">
                  <div className="flex items-center gap-2">
                    <Move size={16} className="text-muted-foreground" />
                    <h2 className="text-xl font-bold">{title}</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {children}
              </motion.div>
            </Draggable>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DraggableModal;
