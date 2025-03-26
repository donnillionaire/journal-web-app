// import { useState, useEffect, useRef, useCallback } from "react";
// import dayjs from "dayjs";
// import { Menu, PlusCircle, X, XCircle } from "lucide-react";
// import {
//   getJournalsByDate,
//   createJournal,
//   updateJournal,
// } from "../services/JournalService"; // Import service functions
// import { useNavigate } from "react-router-dom";
// import GeneralSuccess from "./Alerts/Success";
// import GeneralError from "./Alerts/Error";

// const CalendarApp = () => {
//   const currentYear = dayjs().year();
//   const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
//   const [events, setEvents] = useState<
//     {
//       id: string;
//       date: string;
//       title: string;
//       description: string;
//       category: string;
//       journal_category: string;
//     }[]
//   >([]);
//   const [showForm, setShowForm] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     description: "",
//     category: "",
//   });
//   const [months, setMonths] = useState(() =>
//     Array.from({ length: dayjs().month() + 1 }, (_, i) =>
//       dayjs(`${currentYear}-${i + 1}-01`)
//     )
//   );
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [editingEvent, setEditingEvent] = useState<{
//     id: string;
//     date: string;
//     title: string;
//     description: string;
//     category: string;
//   } | null>(null);
//   const [loading, setLoading] = useState(false); // Add loading state
//   const [error, setError] = useState<string | null>(null); // Add error state
//   const [successAlert, setSuccessAlert] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorAlert, setErrorAlert] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   // Fetch entries for the selected date
//   const fetchEvents = async (date: string) => {
//     console.log("fetch events called...", date)
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getJournalsByDate(date); // Fetch data from the backend
//       console.log("response:->", response.data)
//       const formattedEvents = response.data.map((entry: any) => ({
//         date: dayjs(entry.date_of_entry).format("YYYY-MM-DD"), // Format date
//         title: entry.title,
//         description: entry.content,
//         id: entry.id,
//         category: entry.journal_category || "Uncategorized", // Default to "Uncategorized" if no category exists
//         journal_category: entry.journal_category || "Uncategorized",
//       }));

//       console.log("formatted events:->", formattedEvents)
//       setEvents(formattedEvents); // Update events state
//     } catch (err: any) {
//       console.error("Error fetching journal entries:", err);
//       const error_text =
//         err.response?.data?.detail || "An unexpected error occurred.";
//       if (error_text === "Token expired") {
//         console.log("Token has expired, redirecting to login screen...");
//         setErrorAlert(true);
//         setErrorMsg(error_text + " Redirecting to login page...");
//         localStorage.removeItem("token"); // Clear the expired token
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000); // 2-second delay before redirecting
//       } else {
//         setError(error_text);
//       }
//     } finally {
//       setLoading(false);
//       console.log('finally:!')
//     }
//   };

//   // // Fetch events when the component mounts
//   // useEffect(() => {
//   //   fetchEvents(selectedDate); // Fetch entries for the current date
//   // }, []); // Empty dependency array ensures this runs only once on mount

//   // Fetch events when selectedDate changes
//   useEffect(() => {
//     fetchEvents(selectedDate); // Fetch entries whenever the selected date changes
//   }, [selectedDate]);

//   // Handle opening the form for adding a new event
//   const handleAddEventClick = () => {
//     setEditingEvent(null); // Reset editing mode
//     setNewEvent({ title: "", description: "", category: "" }); // Clear form fields
//     setShowForm(true);
//   };

//   // Handle opening the form for editing an event
//   const handleEditClick = (event: {
//     id: string;
//     date: string;
//     title: string;
//     description: string;
//     category: string;
//   }) => {
//     console.log("event", event);
//     setEditingEvent(event); // Set the event to be edited
//     setNewEvent({
//       title: event.title,
//       description: event.description,
//       category: event.category,
//     }); // Populate form fields
//     setShowForm(true);
//   };

//   // Handle saving the event (either adding or editing)
//   const handleSaveEvent = async () => {
//     if (!newEvent.title.trim()) return;
//     try {
//       setLoading(true); // Show loading state
//       if (editingEvent) {
//         // Editing an existing event
//         const requestData = {
//           title: newEvent.title,
//           content: newEvent.description,
//           journal_category: newEvent.category, // Include category
//         };
//         console.log("requestedData", requestData);
//         // Call the backend to update the journal entry
//         const updatedEntry = await updateJournal(editingEvent.id, requestData); // Assuming `id` is part of `editingEvent`
//         console.log("Updated entry:", updatedEntry);
//         // Update the local state with the updated event
//         setEvents((prevEvents) =>
//           prevEvents.map((ev) =>
//             ev.date === editingEvent.date && ev.title === editingEvent.title
//               ? {
//                   ...ev,
//                   title: newEvent.title,
//                   description: newEvent.description,
//                   category: newEvent.category,
//                 }
//               : ev
//           )
//         );
//       } else {
//         // Adding a new event
//         const requestData: any = {
//           title: newEvent.title,
//           content: newEvent.description,
//           journal_category: newEvent.category, // Include category
//           date_of_entry: selectedDate,
//         };
//         console.log("selected date", selectedDate);
//         // Call the backend to create the journal entry
//         const createdEntry = await createJournal(requestData);
//         console.log("created entry", createdEntry);
//         // Add the new entry to the local state
//         setEvents([
//           ...events,
//           {
//             id: createdEntry.id,
//             date: dayjs(createdEntry.created_at).format("YYYY-MM-DD"),
//             title: createdEntry.title,
//             description: createdEntry.content,
//             category: createdEntry.journal_category || "Uncategorized",
//             journal_category: createdEntry.journal_category || "Uncategorized",
//           },
//         ]);
//       }
//       // Reset form and exit edit/add mode
//       setNewEvent({ title: "", description: "", category: "" });
//       setEditingEvent(null);
//       setShowForm(false);
//       // Show success alert
//       setSuccessAlert(true);
//       setSuccessMsg("Journal entry saved successfully!");
//     } catch (err: any) {
//       console.error("Error saving journal entry:", err);
//       // Show error alert
//       setErrorAlert(true);
//       setErrorMsg("Failed to save journal entry.");
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };

//   // Handle canceling the form
//   const handleCancel = () => {
//     setNewEvent({ title: "", description: "", category: "" }); // Clear form fields
//     setEditingEvent(null); // Exit edit mode
//     setShowForm(false); // Hide the form
//   };

//   // Load the previous month
//   const loadPreviousMonth = useCallback(() => {
//     const firstMonth = months[0].subtract(1, "month");
//     if (firstMonth.year() === dayjs().year()) {
//       setMonths((prev) => [firstMonth, ...prev]);
//     }
//   }, [months]);

//   // Load the next month
//   const loadNextMonth = useCallback(() => {
//     const lastMonth = months[months.length - 1].add(1, "month");
//     if (lastMonth.year() === dayjs().year()) {
//       setMonths((prev) => [...prev, lastMonth]);
//     }
//   }, [months]);

//   // Scroll behavior and IntersectionObserver setup
//   useEffect(() => {
//     window.scrollTo(0, 2); // Scrolls to the top when the component mounts
//     const container = containerRef.current;
//     if (!container) return;
//     container.scrollTop = 300; // Scroll to 300px from the top
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             if (entry.target.id === "top-marker") {
//               loadPreviousMonth();
//             } else if (entry.target.id === "bottom-month") {
//               loadNextMonth();
//             }
//           }
//         });
//       },
//       { root: container, threshold: 0.1 }
//     );
//     const topElement = document.getElementById("top-month");
//     const bottomElement = document.getElementById("bottom-month");
//     if (topElement) observer.observe(topElement);
//     if (bottomElement) observer.observe(bottomElement);
//     return () => observer.disconnect();
//   }, [months, loadPreviousMonth, loadNextMonth]);

//   return (
//     <>
//       <GeneralSuccess
//         open={successAlert}
//         onClose={() => setSuccessAlert(false)}
//         autoHideDuration={4000}
//         msg={successMsg}
//       />
//       <GeneralError
//         open={errorAlert}
//         onClose={() => setErrorAlert(false)}
//         autoHideDuration={4000}
//         Errmsg={errorMsg}
//       />
//       <div className="flex flex-col h-screen bg-gray-800 text-white">
//         {/* Top Menu Bar */}
//         <div className="flex justify-between items-center p-4 bg-gray shadow-md">
//           <h1 className="text-xl font-bold mx-15">Journal App</h1>
//           <button
//             onClick={handleAddEventClick}
//             className="flex items-center gap-2 px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
//           >
//             <PlusCircle size={20} />
//             New Entry
//           </button>
//         </div>
//         <div className="flex h-screen bg-white text-white shadow-xl">
//           {/* Collapsible Sidebar */}
//           <div
//             className={`bg-gray-800 p-3 transition-all duration-300 ${
//               sidebarOpen ? "w-56" : "w-0"
//             }`}
//           >
//             {sidebarOpen && <p className="text-gray-300">Sidebar Content</p>}
//           </div>
//           {/* Sidebar Toggle Button */}
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="absolute top-4 left-4 bg-gray-700 p-2 rounded-full"
//           >
//             {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//           {/* Calendar */}
//           <div
//             className="w-2/5 p-5 border-r border-gray-700 overflow-y-auto"
//             ref={containerRef}
//           >
//             <h2 className="text-xl font-semibold mb-4">Calendar</h2>
//             <div className="space-y-6">
//               {months.map((month, index) => (
//                 <div
//                   key={month.format("YYYY-MM")}
//                   id={
//                     index === 0
//                       ? "top-month"
//                       : index === months.length - 1
//                       ? "bottom-month"
//                       : undefined
//                   }
//                 >
//                   <h3 className="px-[200px] text-lg font-bold mb-2 text-gray-300">
//                     {month.format("MMMM YYYY")}
//                   </h3>
//                   <div className="grid grid-cols-7 gap-2">
//                     {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                       (day) => (
//                         <div
//                           key={day}
//                           className="text-center font-bold text-gray-400"
//                         >
//                           {day}
//                         </div>
//                       )
//                     )}
//                     {Array.from({ length: month.daysInMonth() }, (_, i) =>
//                       month.startOf("month").add(i, "day")
//                     ).map((day) => (
//                       <button
//                         key={day.format("YYYY-MM-DD")}
//                         className={`p-2 text-center rounded text-gray-700 transition duration-200 ${
//                           selectedDate === day.format("YYYY-MM-DD")
//                             ? "bg-blue-500 text-white"
//                             : "hover:bg-gray-200"
//                         }`}
//                         onClick={() => {
//                           setSelectedDate(day.format("YYYY-MM-DD"));
//                           // fetchEvents(day.format("YYYY-MM-DD"));
//                         }}
//                       >
//                         {day.format("D")}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Events Panel */}
//           <div
//             className="w-3/5 p-5 overflow-y-auto"
//             style={{ maxHeight: "calc(100vh - 100px)" }}
//           >
//             {showForm && (
//               <div className="p-4 bg-gray-100 rounded mb-4">
//                 <select
//                   className="w-full p-2 mb-2 bg-gray-300 rounded text-black"
//                   value={newEvent.category}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, category: e.target.value })
//                   }
//                 >
//                   <option value="">Select Category</option>
//                   <option value="Personal">Personal</option>
//                   <option value="Work">Work</option>
//                   <option value="Travel">Travel</option>
//                   <option value="Health">Health</option>
//                   <option value="Social">Social</option>
//                 </select>
//                 <input
//                   type="text"
//                   className="w-full p-2 mb-2 bg-gray-300 rounded text-black"
//                   placeholder="Event Title"
//                   value={newEvent.title}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, title: e.target.value })
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 mb-2 bg-gray-300 rounded text-black h-50"
//                   placeholder="Event Description"
//                   value={newEvent.description}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, description: e.target.value })
//                   }
//                 />
//                 <div className="flex gap-2">
//                   <button
//                     className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
//                     onClick={handleSaveEvent}
//                   >
//                     {editingEvent ? "Save Event" : "Add Event"}
//                   </button>
//                   <button
//                     className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//             <h2 className="text-xl font-semibold mb-4 text-gray-500">
//               Entries on {dayjs(selectedDate).format("MMMM D, YYYY")}
//             </h2>
//             {loading ? (
//               <p className="text-gray-500">Loading entries... {selectedDate}</p>
//             ) : error ? (
//               <p className="text-red-500">{error}</p>
//             ) : events.filter((event) => event.date === selectedDate).length >
//               0 ? (
//               events
//                 .filter((event) => event.date === selectedDate)
//                 .map((event, index) => (
//                   <div
//                     key={index}
//                     className="p-6 mb-4 bg-gray-600 rounded-sm cursor-pointer shadow-md hover:bg-gray-800 transition"
//                     onClick={() => handleEditClick(event)} // Click to edit
//                   >
//                     <h3 className="text-xl font-bold text-white">
//                       {event.title}
//                     </h3>
//                     <p className="text-gray-400">{event.description}</p>
//                     <p className="text-sm text-gray-300 mt-2">
//                       Category: {event.journal_category || "Uncategorized"}
//                     </p>
//                   </div>
//                 ))
//             ) : (
//               <p className="text-gray-500">No entries for this day.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CalendarApp;

import { useState, useEffect, useRef, useCallback } from "react";
import dayjs from "dayjs";
import { Menu, PlusCircle, X, XCircle } from "lucide-react";
import {
  getJournalsByDate,
  getJournalsByYear,
  createJournal,
  updateJournal,
} from "../services/JournalService"; // Import service functions
import { useNavigate } from "react-router-dom";
import GeneralSuccess from "./Alerts/Success";
import GeneralError from "./Alerts/Error";

const CalendarApp = () => {
  const currentYear = dayjs().year();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [events, setEvents] = useState<
    {
      id: string;
      date: string;
      title: string;
      description: string;
      category: string;
      journal_category: string;
    }[]
  >([]);
  const [datesWithEntries, setDatesWithEntries] = useState<string[]>([]); // Dates with entries
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [months, setMonths] = useState(() =>
    Array.from({ length: dayjs().month() + 1 }, (_, i) =>
      dayjs(`${currentYear}-${i + 1}-01`)
    )
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [editingEvent, setEditingEvent] = useState<{
    id: string;
    date: string;
    title: string;
    description: string;
    category: string;
  } | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Fetch entries for the selected date
  const fetchEvents = async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getJournalsByDate(date); // Fetch data from the backend
      const formattedEvents = response.data.map((entry: any) => ({
        date: dayjs(entry.date_of_entry).format("YYYY-MM-DD"), // Format date
        title: entry.title,
        description: entry.content,
        id: entry.id,
        category: entry.journal_category || "Uncategorized", // Default to "Uncategorized" if no category exists
        journal_category: entry.journal_category || "Uncategorized",
      }));
      setEvents(formattedEvents); // Update events state
    } catch (err: any) {
      console.error("Error fetching journal entries:", err);
      const error_text =
        err.response?.data?.detail || "An unexpected error occurred.";
      if (error_text === "Token expired") {
        console.log("Token has expired, redirecting to login screen...");
        setErrorAlert(true);
        setErrorMsg(error_text + " Redirecting to login page...");
        localStorage.removeItem("token"); // Clear the expired token
        setTimeout(() => {
          navigate("/login");
        }, 2000); // 2-second delay before redirecting
      } else {
        setError(error_text);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch entries for the entire year
  const fetchEntriesForYear = async () => {
    try {
      const response = await getJournalsByYear(currentYear.toString()); // Fetch entries for the year
      const uniqueDates = Array.from(
        new Set(
          response.data.map((entry: any) =>
            dayjs(entry.date_of_entry).format("YYYY-MM-DD")
          )
        )
      );
      setDatesWithEntries(uniqueDates); // Update dates with entries
    } catch (err: any) {
      console.error("Error fetching journal entries for the year:", err);
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEntriesForYear(); // Fetch entries for the current year
    fetchEvents(selectedDate); // Fetch entries for the current date
  }, []); // Empty dependency array ensures this runs only once on mount

  // Fetch events when selectedDate changes
  useEffect(() => {
    fetchEvents(selectedDate); // Fetch entries whenever the selected date changes
  }, [selectedDate]);

  // Handle opening the form for adding a new event
  const handleAddEventClick = () => {
    setEditingEvent(null); // Reset editing mode
    setNewEvent({ title: "", description: "", category: "" }); // Clear form fields
    setShowForm(true);
  };

  // Handle opening the form for editing an event
  const handleEditClick = (event: {
    id: string;
    date: string;
    title: string;
    description: string;
    category: string;
  }) => {
    setEditingEvent(event); // Set the event to be edited
    setNewEvent({
      title: event.title,
      description: event.description,
      category: event.category,
    }); // Populate form fields
    setShowForm(true);
  };

  // Handle saving the event (either adding or editing)
  const handleSaveEvent = async () => {
    if (!newEvent.title.trim()) return;
    try {
      setLoading(true); // Show loading state
      if (editingEvent) {
        // Editing an existing event
        const requestData = {
          title: newEvent.title,
          content: newEvent.description,
          journal_category: newEvent.category,
        };
        const updatedEntry = await updateJournal(editingEvent.id, requestData);
        setEvents((prevEvents) =>
          prevEvents.map((ev) =>
            ev.id === editingEvent.id
              ? {
                  ...ev,
                  title: newEvent.title,
                  description: newEvent.description,
                  category: newEvent.category,
                }
              : ev
          )
        );
      } else {
        // Adding a new event
        const requestData: any = {
          title: newEvent.title,
          content: newEvent.description,
          journal_category: newEvent.category,
          date_of_entry: selectedDate,
        };
        const createdEntry = await createJournal(requestData);
        setEvents([
          ...events,
          {
            id: createdEntry.id,
            date: dayjs(createdEntry.date_of_entry).format("YYYY-MM-DD"),
            title: createdEntry.title,
            description: createdEntry.content,
            category: createdEntry.journal_category || "Uncategorized",
            journal_category: createdEntry.journal_category || "Uncategorized",
          },
        ]);
      }
      // Refetch entries for the year to update the calendar
      await fetchEntriesForYear();
      // Reset form and exit edit/add mode
      setNewEvent({ title: "", description: "", category: "" });
      setEditingEvent(null);
      setShowForm(false);
      // Show success alert
      setSuccessAlert(true);
      setSuccessMsg("Journal entry saved successfully!");
    } catch (err: any) {
      console.error("Error saving journal entry:", err);
      setErrorAlert(true);
      setErrorMsg("Failed to save journal entry.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Handle canceling the form
  const handleCancel = () => {
    setNewEvent({ title: "", description: "", category: "" }); // Clear form fields
    setEditingEvent(null); // Exit edit mode
    setShowForm(false); // Hide the form
  };

  // Load the previous month
  const loadPreviousMonth = useCallback(() => {
    const firstMonth = months[0].subtract(1, "month");
    if (firstMonth.year() === dayjs().year()) {
      setMonths((prev) => [firstMonth, ...prev]);
    }
  }, [months]);

  // Load the next month
  const loadNextMonth = useCallback(() => {
    const lastMonth = months[months.length - 1].add(1, "month");
    if (lastMonth.year() === dayjs().year()) {
      setMonths((prev) => [...prev, lastMonth]);
    }
  }, [months]);

  // Scroll behavior and IntersectionObserver setup
  useEffect(() => {
    window.scrollTo(0, 2); // Scrolls to the top when the component mounts
    const container = containerRef.current;
    if (!container) return;
    container.scrollTop = 300; // Scroll to 300px from the top
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
    <>
      <GeneralSuccess
        open={successAlert}
        onClose={() => setSuccessAlert(false)}
        autoHideDuration={4000}
        msg={successMsg}
      />
      <GeneralError
        open={errorAlert}
        onClose={() => setErrorAlert(false)}
        autoHideDuration={4000}
        Errmsg={errorMsg}
      />
      <div className="flex flex-col h-screen bg-gray-800 text-white">
        {/* Top Menu Bar */}
        <div className="flex justify-between items-center p-4 bg-gray shadow-md">
          <h1 className="text-xl font-bold mx-15">Journal App</h1>
          <button
            onClick={handleAddEventClick}
            className="flex items-center gap-2 px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
          >
            <PlusCircle size={20} />
            New Entry
          </button>
        </div>
        <div className="flex h-screen bg-white text-white shadow-xl">
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
                  <h3 className="px-[200px] text-lg font-bold mb-2 text-gray-300">
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
                    ).map((day) => {
                      const formattedDay = day.format("YYYY-MM-DD");
                      const hasEntry = datesWithEntries.includes(formattedDay);

                      return (
                        <button
                          key={formattedDay}
                          className={`p-2 text-center rounded text-gray-700 transition duration-200 ${
                            selectedDate === formattedDay
                              ? "bg-blue-500 text-white"
                              : hasEntry
                              ? "border-2 border-green-500 hover:bg-gray-200"
                              : "hover:bg-gray-200"
                          }`}
                          onClick={() => {
                            setSelectedDate(formattedDay);
                            fetchEvents(formattedDay);
                          }}
                        >
                          {day.format("D")}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Events Panel */}
          <div
            className="w-3/5 p-5 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 100px)" }}
          >
            {showForm && (
              <div className="p-4 bg-gray-100 rounded mb-4">
                <select
                  className="w-full p-2 mb-2 bg-gray-300 rounded text-black"
                  value={newEvent.category}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Travel">Travel</option>
                  <option value="Health">Health</option>
                  <option value="Social">Social</option>
                </select>
                <input
                  type="text"
                  className="w-full p-2 mb-2 bg-gray-300 rounded text-black"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <textarea
                  className="w-full p-2 mb-2 bg-gray-300 rounded text-black h-50"
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSaveEvent}
                  >
                    {editingEvent ? "Save Event" : "Add Event"}
                  </button>
                  <button
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <h2 className="text-xl font-semibold mb-4 text-gray-500">
              Entries on {dayjs(selectedDate).format("MMMM D, YYYY")}
            </h2>
            {loading ? (
              <p className="text-gray-500">Loading entries...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : events.filter((event) => event.date === selectedDate).length >
              0 ? (
              events
                .filter((event) => event.date === selectedDate)
                .map((event, index) => (
                  <div
                    key={index}
                    className="p-6 mb-4 bg-gray-600 rounded-sm cursor-pointer shadow-md hover:bg-gray-800 transition"
                    onClick={() => handleEditClick(event)} // Click to edit
                  >
                    <h3 className="text-xl font-bold text-white">
                      {event.title}
                    </h3>
                    <p className="text-gray-400">{event.description}</p>
                    <p className="text-sm text-gray-300 mt-2">
                      Category: {event.journal_category || "Uncategorized"}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No entries for this day.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarApp;
