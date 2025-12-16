import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar, Trash2, Edit3, Save, X } from "lucide-react";
import { format } from "date-fns";
import { Navbar } from "@/components/Navbar";
import { RichTextEditor } from "@/components/RichTextEditor";
import { AnimatedBackground } from "@/components/AnimatedBackground";

interface DiaryEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  color: string;
}

const colorOptions = [
  { label: "Default", value: "bg-card" },
  { label: "Warm", value: "bg-primary/10" },
  { label: "Cool", value: "bg-accent/10" },
  { label: "Success", value: "bg-emerald-500/10" },
  { label: "Info", value: "bg-blue-500/10" },
];

// Mock data
const mockEntries: DiaryEntry[] = [
  {
    id: "1",
    date: new Date(),
    title: "Started my fitness journey",
    content: "<p>Today I decided to <strong>commit</strong> to a healthier lifestyle. I went for a 30-minute morning jog and felt amazing afterwards!</p><ul><li>Morning jog - 30 mins</li><li>Healthy breakfast</li><li>8 glasses of water</li></ul>",
    color: "bg-emerald-500/10",
  },
  {
    id: "2",
    date: new Date(Date.now() - 86400000),
    title: "Reflecting on goals",
    content: "<p>Spent some time thinking about where I want to be in 6 months. Key areas to focus on:</p><ol><li>Health and fitness</li><li>Learning new skills</li><li>Building better habits</li></ol>",
    color: "bg-primary/10",
  },
];

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>(mockEntries);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    color: "bg-card",
  });

  const handleCreate = () => {
    if (!newEntry.title.trim()) return;
    
    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title: newEntry.title,
      content: newEntry.content,
      color: newEntry.color,
    };
    
    setEntries([entry, ...entries]);
    setNewEntry({ title: "", content: "", color: "bg-card" });
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const handleUpdate = (id: string, updates: Partial<DiaryEntry>) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Diary</h1>
              <p className="text-muted-foreground mt-1">
                Capture your thoughts, reflections, and progress
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="btn-interactive flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Entry
            </motion.button>
          </motion.div>

          {/* New Entry Form */}
          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">New Entry</h2>
                    <button
                      onClick={() => setIsCreating(false)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Entry title..."
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                  />

                  <RichTextEditor
                    value={newEntry.content}
                    onChange={(content) => setNewEntry({ ...newEntry, content })}
                    placeholder="Write your thoughts..."
                  />

                  {/* Color Selection */}
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm text-muted-foreground">Card color:</span>
                    <div className="flex gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setNewEntry({ ...newEntry, color: color.value })}
                          className={`w-6 h-6 rounded-full ${color.value} border-2 transition-all ${
                            newEntry.color === color.value
                              ? "border-primary scale-110"
                              : "border-transparent hover:scale-105"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setIsCreating(false)}
                      className="btn-ghost-interactive"
                    >
                      Cancel
                    </button>
                    <button onClick={handleCreate} className="btn-interactive">
                      <Save className="w-4 h-4 mr-2" />
                      Save Entry
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Entries List */}
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass ${entry.color} overflow-hidden`}
              >
                {editingId === entry.id ? (
                  <div className="p-6">
                    <input
                      type="text"
                      value={entry.title}
                      onChange={(e) =>
                        setEntries(
                          entries.map((en) =>
                            en.id === entry.id ? { ...en, title: e.target.value } : en
                          )
                        )
                      }
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground mb-4"
                    />
                    <RichTextEditor
                      value={entry.content}
                      onChange={(content) =>
                        setEntries(
                          entries.map((en) =>
                            en.id === entry.id ? { ...en, content } : en
                          )
                        )
                      }
                    />
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn-ghost-interactive"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdate(entry.id, entry)}
                        className="btn-interactive"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {entry.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4" />
                          {format(entry.date, "MMMM d, yyyy")}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setEditingId(entry.id)}
                          className="p-2 hover:bg-background/50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4 text-muted-foreground" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(entry.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </motion.button>
                      </div>
                    </div>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: entry.content }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {entries.length === 0 && !isCreating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground mb-4">No diary entries yet</p>
              <button
                onClick={() => setIsCreating(true)}
                className="btn-interactive"
              >
                Create your first entry
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
