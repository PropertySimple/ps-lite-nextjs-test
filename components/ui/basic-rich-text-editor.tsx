"use client";

import * as React from "react"
import { Bold, Italic, Underline, Type, Palette } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface BasicRichTextEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const BasicRichTextEditor = React.forwardRef<HTMLDivElement, BasicRichTextEditorProps>(
  ({ value = "", onChange, placeholder, className, disabled, ...props }, ref) => {
    const editorRef = React.useRef<HTMLDivElement>(null)
    const [isBold, setIsBold] = React.useState(false)
    const [isItalic, setIsItalic] = React.useState(false)
    const [isUnderline, setIsUnderline] = React.useState(false)
    const [fontSize, setFontSize] = React.useState("")
    const [textColor, setTextColor] = React.useState("")

    // Update editor content when value prop changes
    React.useEffect(() => {
      if (editorRef.current && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value
      }
    }, [value])

    // Handle content changes
    const handleInput = () => {
      if (editorRef.current && onChange) {
        onChange(editorRef.current.innerHTML)
      }
    }

    // Update button states based on current selection
    const updateButtonStates = () => {
      setIsBold(document.queryCommandState('bold'))
      setIsItalic(document.queryCommandState('italic'))
      setIsUnderline(document.queryCommandState('underline'))
      
      // Get current font size and color
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const element = range.commonAncestorContainer.nodeType === Node.TEXT_NODE 
          ? range.commonAncestorContainer.parentElement 
          : range.commonAncestorContainer as Element
        
        if (element instanceof HTMLElement) {
          const computedStyle = window.getComputedStyle(element)
          setTextColor(computedStyle.color)
        }
      }
    }

    // Format commands
    const executeCommand = (command: string, value?: string) => {
      document.execCommand(command, false, value)
      editorRef.current?.focus()
      updateButtonStates()
      handleInput()
    }

    // Handle font size change
    const handleFontSizeChange = (size: string) => {
      setFontSize(size)
      executeCommand('fontSize', size)
    }

    // Handle color change
    const handleColorChange = (color: string) => {
      setTextColor(color)
      executeCommand('foreColor', color)
    }

    // Handle keyboard shortcuts
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault()
            executeCommand('bold')
            break
          case 'i':
            e.preventDefault()
            executeCommand('italic')
            break
          case 'u':
            e.preventDefault()
            executeCommand('underline')
            break
        }
      }
    }

    // Handle selection changes to update button states
    const handleSelectionChange = () => {
      if (document.activeElement === editorRef.current) {
        updateButtonStates()
      }
    }

    React.useEffect(() => {
      document.addEventListener('selectionchange', handleSelectionChange)
      return () => document.removeEventListener('selectionchange', handleSelectionChange)
    }, [])

    return (
      <div className={cn("space-y-2", className)} {...props}>
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 p-1 border border-input bg-background rounded-md flex-wrap">
          <div className="flex items-center gap-1">
            <Toggle
              size="sm"
              pressed={isBold}
              onPressedChange={() => executeCommand('bold')}
              disabled={disabled}
              aria-label="Bold"
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={isItalic}
              onPressedChange={() => executeCommand('italic')}
              disabled={disabled}
              aria-label="Italic"
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={isUnderline}
              onPressedChange={() => executeCommand('underline')}
              disabled={disabled}
              aria-label="Underline"
            >
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>
          
          {/* Divider */}
          <div className="w-px h-6 bg-border" />
          
          {/* Font Size */}
          <Select value={fontSize} onValueChange={handleFontSizeChange} disabled={disabled}>
            <SelectTrigger className="w-16 h-8 text-xs">
              <Type className="h-3 w-3" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Small</SelectItem>
              <SelectItem value="3">Normal</SelectItem>
              <SelectItem value="4">Large</SelectItem>
              <SelectItem value="5">XL</SelectItem>
              <SelectItem value="6">XXL</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Text Color */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0" 
                disabled={disabled}
                aria-label="Text Color"
              >
                <Palette className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="start">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Text Color</h4>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
                    '#ff0000', '#ff8800', '#ffff00', '#88ff00', '#00ff00', '#00ff88',
                    '#00ffff', '#0088ff', '#0000ff', '#8800ff', '#ff00ff', '#ff0088',
                    '#8b4513', '#daa520', '#808080', '#800080', '#008080', '#000080'
                  ].map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Content Editable Area */}
        <div
          ref={(node) => {
            editorRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          contentEditable={!disabled}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={updateButtonStates}
          suppressContentEditableWarning
          className={cn(
            "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&_strong]:font-bold [&_em]:italic [&_u]:underline",
            "[&_font[size='1']]:text-xs [&_font[size='3']]:text-sm [&_font[size='4']]:text-base [&_font[size='5']]:text-lg [&_font[size='6']]:text-xl",
            "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:pointer-events-none",
            className
          )}
          data-placeholder={placeholder}
        />
      </div>
    )
  }
)

BasicRichTextEditor.displayName = "BasicRichTextEditor"

export { BasicRichTextEditor }