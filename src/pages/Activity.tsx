import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { Navbar } from "@/components/Navbar";
import { ContributionGraph } from "@/components/ContributionGraph";
import { AnimatedBackground } from "@/components/AnimatedBackground";

interface ActivityNote {
  date: string;
  note: string;
}

// Generate mock activity data
const generateMockData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const random = Math.random();
    if (random > 0.3) {
      data.push({
        date,
        count: Math.floor(Math.random() * 5),
        notes: random > 0.7 ? "Completed daily tasks" : undefined,
      });
    }
  }
  return data;
};

export default function Activity() {
  const [activityData] = useState(generateMockData());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<ActivityNote[]>([
    { date: format(new Date(), "yyyy-MM-dd"), note: "Great progress today! Completed all tasks." },
  ]);
  const [newNote, setNewNote] = useState("");

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddNote = () => {
    if (!selectedDate || !newNote.trim()) return;
    
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    setNotes([...notes.filter((n) => n.date !== dateStr), { date: dateStr, note: newNote }]);
    setNewNote("");
  };

  const selectedDateNotes = selectedDate
    ? notes.find((n) => n.date === format(selectedDate, "yyyy-MM-dd"))
    : null;

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground">Activity Tracker</h1>
            <p className="text-muted-foreground mt-1">
              Track your daily progress and add notes to remember your journey
            </p>
          </motion.div>

          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ContributionGraph data={activityData} onDayClick={handleDayClick} />
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
          >
            {[
              { label: "Total Activities", value: activityData.reduce((sum, d) => sum + d.count, 0) },
              { label: "Active Days", value: activityData.filter((d) => d.count > 0).length },
              { label: "Current Streak", value: "12 days" },
              { label: "Best Streak", value: "28 days" },
            ].map((stat, i) => (
              <div key={stat.label} className="glass p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Recent Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 mt-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Notes
            </h3>
            
            {notes.length > 0 ? (
              <div className="space-y-3">
                {notes.slice(0, 5).map((note) => (
                  <div
                    key={note.date}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {format(new Date(note.date), "MMMM d, yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">{note.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Click on a day in the graph to add notes
              </p>
            )}
          </motion.div>
        </div>
      </main>

      {/* Day Detail Modal */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {format(selectedDate, "MMMM d, yyyy")}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Existing Note */}
              {selectedDateNotes && (
                <div className="p-4 bg-primary/10 rounded-lg mb-4">
                  <p className="text-sm text-foreground">{selectedDateNotes.note}</p>
                </div>
              )}

              {/* Add/Update Note */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {selectedDateNotes ? "Update note" : "Add a note"}
                </label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="What did you accomplish today?"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddNote}
                    className="btn-interactive flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {selectedDateNotes ? "Update Note" : "Add Note"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
