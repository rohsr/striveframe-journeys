import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Palette,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const fontOptions = [
  { label: "Default", value: "inherit" },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Mono", value: "'Space Mono', monospace" },
  { label: "Display", value: "'Bebas Neue', sans-serif" },
];

const colorOptions = [
  "#000000", "#374151", "#dc2626", "#ea580c", "#ca8a04",
  "#16a34a", "#0891b2", "#2563eb", "#7c3aed", "#db2777",
];

export const RichTextEditor = ({ value = "", onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const ToolbarButton = ({ 
    icon: Icon, 
    command, 
    value: cmdValue,
    active,
    onClick 
  }: { 
    icon: React.ElementType; 
    command?: string; 
    value?: string;
    active?: boolean;
    onClick?: () => void;
  }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      className={`p-2 rounded-lg transition-colors ${
        active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
      }`}
      onClick={() => {
        if (onClick) {
          onClick();
        } else if (command) {
          execCommand(command, cmdValue);
        }
      }}
    >
      <Icon className="w-4 h-4" />
    </motion.button>
  );

  return (
    <div className="glass overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30">
        <ToolbarButton icon={Bold} command="bold" />
        <ToolbarButton icon={Italic} command="italic" />
        <ToolbarButton icon={Underline} command="underline" />
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <ToolbarButton icon={List} command="insertUnorderedList" />
        <ToolbarButton icon={ListOrdered} command="insertOrderedList" />
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <ToolbarButton icon={AlignLeft} command="justifyLeft" />
        <ToolbarButton icon={AlignCenter} command="justifyCenter" />
        <ToolbarButton icon={AlignRight} command="justifyRight" />
        
        <div className="w-px h-6 bg-border mx-1" />
        
        {/* Color Picker */}
        <div className="relative">
          <ToolbarButton 
            icon={Palette} 
            active={showColorPicker}
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowFontPicker(false);
            }} 
          />
          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-1 p-2 bg-popover border border-border rounded-lg shadow-lg z-10 grid grid-cols-5 gap-1"
            >
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    execCommand("foreColor", color);
                    setShowColorPicker(false);
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Font Picker */}
        <div className="relative">
          <ToolbarButton 
            icon={Type} 
            active={showFontPicker}
            onClick={() => {
              setShowFontPicker(!showFontPicker);
              setShowColorPicker(false);
            }} 
          />
          {showFontPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 overflow-hidden"
            >
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors"
                  style={{ fontFamily: font.value }}
                  onClick={() => {
                    execCommand("fontName", font.value);
                    setShowFontPicker(false);
                  }}
                >
                  {font.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-4 text-foreground focus:outline-none"
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
        style={{
          position: "relative",
        }}
      />
      
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
