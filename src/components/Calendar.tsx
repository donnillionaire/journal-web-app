import { useState, useEffect, useRef, useCallback } from "react";
import dayjs from "dayjs";
import { Menu, PlusCircle, X, XCircle } from "lucide-react";

const CalendarApp = () => {
  const currentYear = dayjs().year();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  //   const [events, setEvents] = useState<{ date: string; title: string; description: string }[]>([
  //     { date: "2025-03-19", title: "Sad Day", description: "Today has been a rough day." },
  //     { date: "2025-03-20", title: "Meeting", description: "Project sync-up at 10 AM." },
  //   ]);

  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", description: "" });

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;
    setEvents([...events, { date: selectedDate, ...newEvent }]);
    setNewEvent({ title: "", description: "" });
    setShowForm(false);
  };

  const [events, setEvents] = useState<
    { date: string; title: string; description: string }[]
  >([
    {
      date: "2025-03-19",
      title: "Sad Day",
      description: "Today has been a rough day.",
    },
    {
      date: "2025-03-20",
      title: "Meeting",
      description: "Project sync-up at 10 AM.",
    },
  ]);

  const [months, setMonths] = useState(() =>
    Array.from({ length: dayjs().month() + 1 }, (_, i) =>
      dayjs(`${currentYear}-${i + 1}-01`)
    )
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null); // ✅ Explicitly definig Container Ref

  const loadPreviousMonth = useCallback(() => {
    const firstMonth = months[0].subtract(1, "month");
    if (firstMonth.year() === dayjs().year()) {
      setMonths((prev) => [firstMonth, ...prev]);
    }
  }, [months]);

  const loadNextMonth = useCallback(() => {
    const lastMonth = months[months.length - 1].add(1, "month");
    if (lastMonth.year() === dayjs().year()) {
      setMonths((prev) => [...prev, lastMonth]);
    }
  }, [months]);

  useEffect(() => {
    window.scrollTo(0, 2); // Scrolls to the top when the component mounts
    const container = containerRef.current;
    if (!container) return;
    container.scrollTop = 500; // Scroll to 500px from the top

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "top-marker") {
              loadPreviousMonth();
            } else if (entry.target.id === "bottom-month") {
              loadNextMonth();
            }
          }
        });
      },
      { root: container, threshold: 0.1 }
    );

    const topElement = document.getElementById("top-month");
    const bottomElement = document.getElementById("bottom-month");

    if (topElement) observer.observe(topElement);
    if (bottomElement) observer.observe(bottomElement);

    return () => observer.disconnect();
  }, [months, loadPreviousMonth, loadNextMonth]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Menu Bar */}
      <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">Journal App</h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-2 rounded text-white ${
            showForm
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {showForm ? <XCircle size={20} /> : <PlusCircle size={20} />}
          {showForm ? "Close Entry" : "New Entry"}
        </button>
      </div>

      <div className="flex h-screen bg-gray-900 text-white shadow-xl">
        {/* Collapsible Sidebar */}
        <div
          className={`bg-gray-800 p-3 transition-all duration-300 ${
            sidebarOpen ? "w-56" : "w-0"
          }`}
        >
          {sidebarOpen && <p className="text-gray-300">Sidebar Content</p>}
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 left-4 bg-gray-700 p-2 rounded-full"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Calendar */}
        <div
          className="w-2/5 p-5 border-r border-gray-700 overflow-y-auto"
          ref={containerRef}
        >
          <h2 className="text-xl font-semibold mb-4">Calendar</h2>
          <div className="space-y-6">
            {months.map((month, index) => (
              <div
                key={month.format("YYYY-MM")}
                id={
                  index === 0
                    ? "top-month"
                    : index === months.length - 1
                    ? "bottom-month"
                    : undefined
                }
              >
                <h3 className="text-lg font-bold mb-2">
                  {month.format("MMMM YYYY")}
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center font-bold text-gray-400"
                      >
                        {day}
                      </div>
                    )
                  )}
                  {Array.from({ length: month.daysInMonth() }, (_, i) =>
                    month.startOf("month").add(i, "day")
                  ).map((day) => (
                    <button
                      key={day.format("YYYY-MM-DD")}
                      className={`p-2 text-center rounded ${
                        selectedDate === day.format("YYYY-MM-DD")
                          ? "bg-blue-500"
                          : "hover:bg-gray-700"
                      }`}
                      onClick={() => setSelectedDate(day.format("YYYY-MM-DD"))}
                    >
                      {day.format("D")}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Panel */}
        <div className="w-3/5 p-5">
          <h2 className="text-xl font-semibold mb-4">
            Events on {dayjs(selectedDate).format("MMMM D, YYYY")}
          </h2>

          {showForm && (
            <div className="p-4 bg-gray-800 rounded mb-4">
              <input
                type="text"
                className="w-full p-2 mb-2 bg-gray-700 rounded text-white"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <textarea
                className="w-full p-2 mb-2 bg-gray-700 rounded text-white"
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
              <button
                onClick={handleAddEvent}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              >
                Add Event
              </button>
            </div>
          )}
          {events.filter((event) => event.date === selectedDate).length > 0 ? (
            events
              .filter((event) => event.date === selectedDate)
              .map((event, index) => (
                <div key={index} className="p-4 mb-4 bg-gray-800 rounded">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-gray-400">{event.description}</p>
                </div>
              ))
          ) : (
            <p className="text-gray-500">No events for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
