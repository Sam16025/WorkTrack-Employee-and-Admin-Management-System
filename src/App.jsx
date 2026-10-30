import { useState, useEffect, useId, useRef } from "react";
import {
  Users, ShieldCheck, ClipboardList, Clock3, Search,
  Plus, CheckCircle2, CalendarDays, UserRound, LayoutDashboard,
  CalendarCheck2, ClipboardCheck, CalendarClock, PartyPopper,
  BriefcaseBusiness, Menu, X, CircleAlert, KeyRound, Copy, Bell,
Eye, EyeOff,
FileClock, FileBarChart, Headset, Trash2, Pencil, Paperclip, MessageCircle
} from "lucide-react";
import "./App.css";
const ADMIN = {
  username: "admin@logacc",
  password: "adminlog467",
};
const getAdminCredentials = () => readStore("wt_adminCredentials", ADMIN);
const EMPTY_FORM = {
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  email: "",
  password: "",
  position: "",
  mobile: "",
  joiningCode: "",
  attendanceBatch: "",
  employeeId: "",
};
const readStore = (key, fallback = []) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};
const saveStore = (key, value) => { localStorage.setItem(key, JSON.stringify(value)); };
const sortRecordsNewestFirst = (records = []) => [...records].sort((a, b) => {
  const getStamp = (item) => {
    const raw = item?.createdAt || item?.createdOn || item?.submittedAt || item?.updatedAt || item?.approvedAt || item?.timestamp || item?.date || item?.weekStartDate || item?.deadline || "";
    const parsed = new Date(raw).getTime();
    return Number.isFinite(parsed) ? parsed : 0;
  };
  return getStamp(b) - getStamp(a);
});
const formatDate = (value) => {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};
const passwordStrength = (value) => { if (!value) return "Low"; let score = 0; if (value.length >= 8) score++; if (/[A-Z]/.test(value)) score++; if (/[a-z]/.test(value)) score++; if (/\d/.test(value)) score++; if (/[^A-Za-z0-9]/.test(value)) score++; return score <= 2 ? "Low" : score <= 4 ? "Medium" : "High"; };
const adminPasswordStrength = (value) => { if (!value) return "Low"; let score = 0; if (value.length >= 8) score++; if (/[A-Z]/.test(value)) score++; if (/[a-z]/.test(value)) score++; if (/\d/.test(value)) score++; if (/[^A-Za-z0-9]/.test(value)) score++; return score <= 2 ? "Low" : score <= 4 ? "Weak" : "Strong"; };
export default function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("employee");
  const [section, setSection] = useState("Dashboard");
  const [chatTargetEmployeeId, setChatTargetEmployeeId] = useState("");
  const [ticketRequestsInitialTab, setTicketRequestsInitialTab] = useState("Home");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [approvalSearch, setApprovalSearch] = useState("");
  const [adminTaskTab, setAdminTaskTab] = useState("All");
  const [adminTaskSearch, setAdminTaskSearch] = useState("");
  const [employeeTaskTab, setEmployeeTaskTab] = useState("All");
  const [employeeTaskSearch, setEmployeeTaskSearch] = useState("");
  const [employeeLeaveTab, setEmployeeLeaveTab] = useState("All");
  const [adminTimesheetSearch, setAdminTimesheetSearch] = useState("");
  const [adminTimesheetTab, setAdminTimesheetTab] = useState("All");
  const [attendanceSearch, setAttendanceSearch] = useState("");
  const [attendanceTabTarget, setAttendanceTabTarget] = useState("Attendance Marked");
  const [leaveTabTarget, setLeaveTabTarget] = useState("All");
  const [dashboardNow, setDashboardNow] = useState(() => new Date());
  const [approvalTab, setApprovalTab] = useState("Pending");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [zoom, setZoom] = useState(100);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationItems, setNotificationItems] = useState(() => readStore("wt_notifications", []));
  const [chatNotificationRevision, setChatNotificationRevision] = useState(0);
  useEffect(() => {
    const refreshChatNotifications = () => setChatNotificationRevision((value) => value + 1);
    window.addEventListener("wt_employee_chat_updated", refreshChatNotifications);
    window.addEventListener("storage", refreshChatNotifications);
    return () => {
      window.removeEventListener("wt_employee_chat_updated", refreshChatNotifications);
      window.removeEventListener("storage", refreshChatNotifications);
    };
  }, []);
  const [ticketNavRecords, setTicketNavRecords] = useState(() => sortRecordsNewestFirst(readStore("wt_support_tickets", [])));
  const [attendanceReminderOpen, setAttendanceReminderOpen] = useState(false);
  const [attendanceMonth, setAttendanceMonth] = useState(() => new Date().getMonth());
  const [attendanceYear, setAttendanceYear] = useState(() => new Date().getFullYear());
  const [attendanceDay, setAttendanceDay] = useState(() => new Date().getDate());
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [adminCurrentUsername, setAdminCurrentUsername] = useState("");
  const [adminNewUsername, setAdminNewUsername] = useState("");
  const [adminCurrentPassword, setAdminCurrentPassword] = useState("");
  const [adminNewPassword, setAdminNewPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [showAdminCurrentUsername, setShowAdminCurrentUsername] = useState(false);
  const [showAdminNewUsername, setShowAdminNewUsername] = useState(false);
  const [showAdminCurrentPassword, setShowAdminCurrentPassword] = useState(false);
  const [showAdminNewPassword, setShowAdminNewPassword] = useState(false);
  const [showAdminConfirmPassword, setShowAdminConfirmPassword] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementAttachment, setAnnouncementAttachment] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [profileMobile, setProfileMobile] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [reportingManager, setReportingManager] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timesheets, setTimesheets] = useState(() => sortRecordsNewestFirst(readStore("wt_timesheets")));
  const [timesheetSelectedDate, setTimesheetSelectedDate] = useState(() => getLocalDateKey(new Date()));
  const timesheetAnchorDate = new Date(`${timesheetSelectedDate}T12:00:00`);
  const timesheetYear = timesheetAnchorDate.getFullYear();
  const timesheetMonth = timesheetAnchorDate.getMonth();
  const timesheetWeek = getWeekIndex(timesheetAnchorDate);
  const [timesheetRows, setTimesheetRows] = useState([{ activity: "", shift: "", dayTypes: Array(7).fill(""), hours: Array(7).fill(""), remarks: "", fileName: "" }]);
  const timesheetIdPrefix = useId();
  const timesheetIdCounter = useRef(0);
  const createTimesheetId = () => { timesheetIdCounter.current += 1; return `TS-${timesheetIdPrefix}-${timesheetIdCounter.current}`; };
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setPasswordPanelOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  useEffect(() => {
    const timer = setInterval(() => setDashboardNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const refreshTickets = () => setTicketNavRecords(sortRecordsNewestFirst(readStore("wt_support_tickets", [])));
    window.addEventListener("wt_support_tickets_updated", refreshTickets);
    return () => window.removeEventListener("wt_support_tickets_updated", refreshTickets);
  }, []);
  const [employees, setEmployees] = useState(() => sortRecordsNewestFirst(readStore("wt_employees")));
  const [tasks, setTasks] = useState(() => sortRecordsNewestFirst(readStore("wt_tasks")));
  const [leaves, setLeaves] = useState(() => sortRecordsNewestFirst(readStore("wt_leaves")));
  const [currentUser, setCurrentUser] = useState(() =>
    readStore("wt_currentUser", null)
  );
  const [pendingEmail, setPendingEmail] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [statusEmail, setStatusEmail] = useState("");
  const [checkedRequest, setCheckedRequest] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmployeeId, setResetEmployeeId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [taskForm, setTaskForm] = useState({
    title: "",
    employeeId: "",
    deadline: "",
    description: "",
  });
  const [taskEmployeeSearch, setTaskEmployeeSearch] = useState("");
  const [leaveForm, setLeaveForm] = useState({ leaveType: "", reason: "", startDate: "", endDate: "", remarks: "", attachmentName: "", attachmentData: "" });
  const [leaveFromFilter, setLeaveFromFilter] = useState("");
  const [leaveToFilter, setLeaveToFilter] = useState("");
  const [leaveSearch, setLeaveSearch] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showCommonLeaveForm, setShowCommonLeaveForm] = useState(false);
  const [commonHolidaysYear, setCommonHolidaysYear] = useState(() => new Date().getFullYear());
  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const updateEmployees = (data) => {
    const ordered = sortRecordsNewestFirst(data);
    setEmployees(ordered);
    saveStore("wt_employees", ordered);
  };
  const updateTasks = (data) => {
    const ordered = sortRecordsNewestFirst(data);
    setTasks(ordered);
    saveStore("wt_tasks", ordered);
  };
  const updateLeaves = (data) => {
    const ordered = sortRecordsNewestFirst(data);
    setLeaves(ordered);
    saveStore("wt_leaves", ordered);
  };
  const enterApp = (user, destination) => {
    let activeUser = user;
    if (destination === "employee" && !activeUser?.attendanceBatch) {
      activeUser = { ...activeUser, attendanceBatch: "General Batch" };
      const updatedEmployees = employees.map((employee) => employee.employeeId === activeUser.employeeId ? activeUser : employee);
      updateEmployees(updatedEmployees);
    }
    setCurrentUser(activeUser);
    const today = new Date();
    setAttendanceReminderOpen(destination === "employee" && !isWeekend(today));
    setProfileName(activeUser?.name || "");
    setProfileMobile(activeUser?.mobile || "");
    setProfilePhoto(activeUser?.photo || "");
    setReportingManager(activeUser?.reportingManager || "");
    saveStore("wt_currentUser", activeUser);
    setPage(destination);
    setSection("Dashboard");
    setMessage("");
    setForm(EMPTY_FORM);
  };
  useEffect(() => {
    const refreshRequests = () => {
      const stored = readStore("wt_employees");
      setEmployees(stored);
      if (!pendingEmail) return;
      const employee = stored.find((item) => item.email === pendingEmail);
      if (employee?.status === "Active" && employee.employeeId) {
        setCheckedRequest(employee);
        setPage("employee-approved");
      } else if (employee?.status === "Rejected") {
        setCheckedRequest(employee);
        setPage("request-rejected");
      }
    };
    refreshRequests();
    const onStorage = (event) => {
      if (event.key === "wt_employees" || event.key === null) {
        refreshRequests();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [pendingEmail]);
  const handleSignup = (e) => {
    e.preventDefault();
    setMessage("");
    const email = form.email.trim().toLowerCase();
    const mobile = form.mobile.replace(/\D/g, "");
    const codeNumber = form.joiningCode.replace(/\D/g, "");
    if (!/^\d{10}$/.test(mobile)) {
      setMessage("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!/^\d{4,10}$/.test(codeNumber)) {
      setMessage("Enter the joining-code numbers supplied by your company.");
      return;
    }
    if (form.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }
    if (employees.some((employee) => employee.email?.toLowerCase() === email)) {
      setMessage("This email is already registered.");
      return;
    }
    const name = [
      form.firstName,
      form.middleName,
      form.lastName,
    ].map((part) => part.trim()).filter(Boolean).join(" ");
    const employee = {
      name,
      firstName: form.firstName.trim(),
      middleName: form.middleName.trim(),
      lastName: form.lastName.trim(),
      dob: form.dob,
      email,
      password: form.password,
      mobile,
      role: form.position.trim(),
      joiningCode: `WT-${codeNumber}`,
      attendanceBatch: form.attendanceBatch,
      employeeId: "",
      status: "Pending Approval",
      attendance: "Not Checked In",
      checkIn: "",
      checkOut: "",
      createdAt: new Date().toISOString(),
    };
    updateEmployees([...employees, employee]);
    setPendingEmail(email);
    setCheckedRequest(employee);
    setForm(EMPTY_FORM);
    setPage("pending");
    setMessage("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    if (role === "admin") {
      const adminCredentials = getAdminCredentials();
      if (
        form.email.trim().toLowerCase() === String(adminCredentials.username || ADMIN.username).trim().toLowerCase() &&
        form.password === (adminCredentials.password || ADMIN.password)
      ) {
        enterApp({
          name: "Administrator",
          email: adminCredentials.username || ADMIN.username,
          password: adminCredentials.password || ADMIN.password,
          role: "Administrator",
          status: "Active",
        }, "admin");
      } else {
        setMessage("Incorrect admin username or password.");
      }
      return;
    }
    const id = form.employeeId.trim().toUpperCase();
    const employee = employees.find(
      (item) =>
        item.employeeId?.toUpperCase() === id &&
        item.password === form.password
    );
    if (!employee) {
      setMessage("Invalid Employee ID or password.");
      return;
    }
    if (employee.status === "Pending Approval") {
      setMessage("Your account is awaiting administrator approval.");
      return;
    }
    if (employee.status === "Rejected") {
      setMessage("Your request was rejected. Contact the administrator.");
      return;
    }
    if (employee.status === "Blocked") {
      setMessage("Your account is blocked. Contact the administrator.");
      return;
    }
    if (employee.status !== "Active") {
      setMessage("Your account is not active yet.");
      return;
    }
    enterApp(employee, "employee");
  };
  const approveEmployee = (email, fromRejected = false) => {
    const target = employees.find((employee) => employee.email === email);
    if (!target || (fromRejected ? target.status !== "Rejected" : target.status !== "Pending Approval")) {
      setMessage("This request is no longer available for approval.");
      return;
    }
    const usedIds = employees
      .map((employee) =>
        Number((employee.employeeId || "").replace(/^EMP-/, ""))
      )
      .filter((number) => Number.isFinite(number) && number >= 1000);
    const employeeId = `EMP-${Math.max(1000, ...usedIds) + 1}`;
    const updated = employees.map((employee) =>
      employee.email === email
        ? {
            ...employee,
            employeeId,
            status: "Active",
            approvedAt: new Date().toISOString(),
          }
        : employee
    );
    updateEmployees(updated);
    setMessage(`Approved successfully. Employee ID: ${employeeId}`);
  };
  const rejectEmployee = (email) => {
    updateEmployees(
      employees.map((employee) =>
        employee.email === email && employee.status === "Pending Approval"
          ? { ...employee, status: "Rejected" }
          : employee
      )
    );
    setMessage("Signup request rejected.");
  };
  const deleteRejectedEmployee = (email) => {
    updateEmployees(employees.filter((employee) => !(employee.email === email && employee.status === "Rejected")));
    setMessage("Rejected signup request deleted.");
  };
  const checkRequestStatus = (e) => {
    e.preventDefault();
    setMessage("");
    const code = `WT-${statusCode.trim()}`;
    const email = statusEmail.trim().toLowerCase();
    const stored = readStore("wt_employees");
    const employee = stored.find(
      (item) =>
        item.joiningCode === code &&
        item.email?.toLowerCase() === email
    );
    setEmployees(stored);
    if (!employee) {
      setCheckedRequest({
        status: "Not Found",
        message: "No request matches these details. Check your code and email.",
      });
      return;
    }
    setCheckedRequest(employee);
    if (employee.status === "Active" && employee.employeeId) {
      setPendingEmail(employee.email);
      setPage("employee-approved");
    } else if (employee.status === "Rejected") {
      setPage("request-rejected");
    }
  };
  const handleResetPassword = (e) => {
    e.preventDefault();
    const email = resetEmail.trim().toLowerCase();
    const id = resetEmployeeId.trim().toUpperCase();
    const target = employees.find(
      (employee) =>
        employee.email === email &&
        employee.employeeId?.toUpperCase() === id
    );
    if (!target) {
      setMessage("Email and Employee ID do not match.");
      return;
    }
    if (target.status !== "Active") {
      setMessage("Only approved employees can reset their password.");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("New password must contain at least 6 characters.");
      return;
    }
    updateEmployees(
      employees.map((employee) =>
        employee.email === email
          ? { ...employee, password: newPassword }
          : employee
      )
    );
    setResetEmail("");
    setResetEmployeeId("");
    setNewPassword("");
    setForm(EMPTY_FORM);
    setPage("login");
    setRole("employee");
    setMessage("Demo password updated. Please sign in again.");
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("wt_currentUser");
    setPage("login");
    setRole("employee");
    setSection("Dashboard");
    setForm(EMPTY_FORM);
    setMessage("");
  };
  const addTask = (e) => {
    e.preventDefault();
    const task = {
      id: "TASK-" + Date.now(),
      title: taskForm.title.trim(),
      employeeId: taskForm.employeeId,
      deadline: taskForm.deadline,
      description: taskForm.description.trim(),
      status: "Pending",
      progress: 0,
    };
    updateTasks([...tasks, task]);
    setTaskForm({
      title: "",
      employeeId: "",
      deadline: "",
      description: "",
    });
    setTaskEmployeeSearch("");
    setShowTaskForm(false);
    setMessage("Task assigned successfully.");
  };
  const updateTask = (id, changes) => {
    updateTasks(tasks.map((task) =>
      task.id === id ? { ...task, ...changes } : task
    ));
  };
  const toggleEmployee = (id) => {
    const updated = employees.map((employee) =>
      employee.employeeId === id
        ? {
            ...employee,
            status: employee.status === "Blocked" ? "Active" : "Blocked",
          }
        : employee
    );
    updateEmployees(updated);
    const updatedUser = updated.find(
      (employee) => employee.employeeId === currentUser?.employeeId
    );
    if (updatedUser) {
      setCurrentUser(updatedUser);
      saveStore("wt_currentUser", updatedUser);
    }
    setMessage("Employee status updated.");
  };
  const saveAttendanceEmployee = (employeePatch, successMessage) => {
    const updated = employees.map((employee) =>
      employee.employeeId === currentUser.employeeId
        ? { ...employee, ...employeePatch }
        : employee
    );
    updateEmployees(updated);
    const user = updated.find((employee) => employee.employeeId === currentUser.employeeId);
    setCurrentUser(user);
    setProfileName(user?.name || "");
    setProfileMobile(user?.mobile || "");
    setProfilePhoto(user?.photo || "");
    setReportingManager(user?.reportingManager || "");
    saveStore("wt_currentUser", user);
    setMessage(successMessage);
  };
  const checkIn = () => {
    if (!currentUser?.employeeId) return;
    const now = new Date();
    const dateKey = getLocalDateKey(now);
    if (isWeekend(now)) {
      setMessage("Saturday and Sunday are weekly holidays. Attendance is available Monday to Friday.");
      return;
    }
    const batch = currentUser.attendanceBatch || "General Batch";
    const windows = {
      "Morning Batch": [5 * 60, 5 * 60 + 15],
      "General Batch": [9 * 60, 9 * 60 + 15],
      "Night Batch": [21 * 60, 21 * 60 + 15],
    };
    const [start, end] = windows[batch] || windows["General Batch"];
    const minuteOfDay = now.getHours() * 60 + now.getMinutes();
    if (minuteOfDay < start || minuteOfDay > end) {
      setMessage(`Check-in for your ${batch} is allowed only between ${formatMinuteRange(start, end)}.`);
      return;
    }
    const records = currentUser.attendanceRecords || [];
    if (records.some((record) => record.date === dateKey && record.checkIn)) {
      setAttendanceReminderOpen(false);
      setMessage("Your attendance is already marked for today.");
      return;
    }
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const record = {
      id: `${currentUser.employeeId}-${dateKey}`,
      date: dateKey,
      batch,
      checkIn: time,
      checkOut: "—",
      status: "Present",
      weekStart: getWeekStartKey(now),
    };
    saveAttendanceEmployee({
      attendance: "Present",
      checkIn: time,
      checkOut: "—",
      attendanceRecords: [...records.filter((item) => item.date !== dateKey), record],
    }, `Attendance marked successfully at ${time}.`);
    setAttendanceReminderOpen(false);
  };
  const submitLeave = (e) => {
    e.preventDefault();
    const isCommonHoliday = leaveForm.requestCategory === "Common Holiday";
    if (isCommonHoliday) {
      if (!leaveForm.leaveType) {
        setMessage("Please select a common holiday.");
        return;
      }
      const selectedHoliday = [
        ...getCommonHolidays(commonHolidaysYear),
        ...getCommonHolidays(new Date().getFullYear()),
        ...getCommonHolidays(new Date().getFullYear() + 1),
      ].find((holiday) => holiday.name === leaveForm.leaveType &&
        (!leaveForm.startDate || holiday.date === leaveForm.startDate));
      const holidayDate = selectedHoliday?.date || leaveForm.startDate;
      if (!holidayDate) {
        setMessage("Please select a valid common holiday.");
        return;
      }
      const alreadyRecorded = leaves.some((item) =>
        item.employeeId === currentUser.employeeId &&
        item.requestCategory === "Common Holiday" &&
        (item.startDate || item.date) === holidayDate &&
        item.leaveType === leaveForm.leaveType
      );
      if (!alreadyRecorded) {
        const now = new Date();
        const commonHolidayRecord = {
          id: `COMMON-HOLIDAY-${currentUser.employeeId}-${holidayDate}`,
          docNo: `CH-${holidayDate.replace(/-/g, "")}`,
          employeeId: currentUser.employeeId,
          employeeName: currentUser.name || currentUser.fullName || "Employee",
          leaveType: leaveForm.leaveType,
          requestType: "-",
          requestCategory: "Common Holiday",
          companyName: "WorkTrack Solutions",
          startDate: holidayDate,
          endDate: holidayDate,
          duration: `${formatDate(holidayDate)} – ${formatDate(holidayDate)}`,
          days: 1,
          reason: `Common holiday: ${leaveForm.leaveType}`,
          remarks: (leaveForm.remarks || "").trim(),
          attachmentName: "",
          attachmentData: "",
          status: "Approved",
          pendingWith: "—",
          createdAt: now.toISOString(),
          createdBy: formatDate(now.toISOString()),
        };
        updateLeaves([...leaves, commonHolidayRecord]);
        setMessage(`${leaveForm.leaveType} added to My Leaves as approved common holiday.`);
      } else {
        setMessage(`${leaveForm.leaveType} is already recorded in My Leaves.`);
      }
      setLeaveForm({ leaveType: "", reason: "", startDate: "", endDate: "", remarks: "", attachmentName: "", attachmentData: "", requestCategory: "" });
      setShowLeaveForm(false);
      setShowCommonLeaveForm(false);
      return;
    }
    if (!leaveForm.leaveType || !leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason.trim()) {
      setMessage("Please complete all required leave fields.");
      return;
    }
    if (leaveForm.endDate < leaveForm.startDate) {
      setMessage("End date cannot be earlier than start date.");
      return;
    }
    const myExistingLeaves = leaves.filter((item) => item.employeeId === currentUser.employeeId);
    const durationDays = Math.floor((new Date(`${leaveForm.endDate}T00:00:00`) - new Date(`${leaveForm.startDate}T00:00:00`)) / 86400000) + 1;
    const requestNumber = myExistingLeaves.reduce((max, item) => Math.max(max, Number(item.requestNumber) || 0), 0) + 1;
    const leave = {
      id: `LEAVE-${Date.now()}`,
      requestNumber,
      docNo: `LR-${String(requestNumber).padStart(4, "0")}`,
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name,
      leaveType: leaveForm.leaveType,
      requestType: isCommonHoliday ? "Common Holiday" : requestNumber,
      requestCategory: isCommonHoliday ? "Common Holiday" : "Leave Request",
      companyName: "WorkTrack Solutions",
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      duration: `${formatDate(leaveForm.startDate)} – ${formatDate(leaveForm.endDate)}`,
      days: durationDays,
      reason: (leaveForm.reason || (isCommonHoliday ? `Common holiday: ${leaveForm.leaveType}` : "")).trim(),
      remarks: leaveForm.remarks.trim(),
      attachmentName: leaveForm.attachmentName,
      attachmentData: leaveForm.attachmentData,
      status: "Pending",
      pendingWith: "Admin",
      createdAt: new Date().toISOString(),
      createdBy: formatDate(new Date().toISOString()),
    };
    updateLeaves([...leaves, leave]);
    setLeaveForm({ leaveType: "", reason: "", startDate: "", endDate: "", remarks: "", attachmentName: "", attachmentData: "", requestCategory: "" });
    setShowLeaveForm(false);
    setShowCommonLeaveForm(false);
    setMessage("Leave request submitted to admin for approval.");
    const existingNotifications = readStore("wt_notifications", []);
    saveStore("wt_notifications", [{ id: `leave-notice-${leave.id}`, audience: "admin", kind: "leave-request", recordId: leave.id, title: "New leave request", message: `${leave.employeeName} (${leave.employeeId}) submitted ${leave.leaveType} for ${leave.days} day(s).`, employeeId: "", isNew: true, createdAt: new Date().toISOString() }, ...existingNotifications]);
  };
  const updateLeaveStatus = (id, status) => {
    const updatedLeaves = leaves.map((leave) => leave.id === id ? { ...leave, status, pendingWith: status === "Pending" ? "Admin" : "—", reviewedAt: new Date().toISOString() } : leave);
    updateLeaves(updatedLeaves);
    const changedLeave = updatedLeaves.find((leave) => leave.id === id);
    if (changedLeave) {
      const existingNotifications = readStore("wt_notifications", []);
      saveStore("wt_notifications", [{ id: `leave-status-${id}-${status}-${Date.now()}`, title: `Leave ${status}`, message: `Your ${changedLeave.leaveType || "leave"} request (${changedLeave.docNo || changedLeave.id}) was ${status.toLowerCase()}.`, employeeId: changedLeave.employeeId, createdAt: new Date().toISOString() }, ...existingNotifications]);
    }
    setMessage(`Leave request ${status.toLowerCase()}.`);
  };
  const handleLeaveAttachment = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLeaveForm((previous) => ({ ...previous, attachmentName: file.name, attachmentData: String(reader.result || "") }));
    reader.readAsDataURL(file);
  };
  const saveTimesheetDraft = () => {
    if (!currentUser?.employeeId) { setMessage("Please log in as an employee."); return; }
    const weekStartDate = getSundayWeekStart(timesheetAnchorDate);
    const key = getLocalDateKey(weekStartDate);
    const legacyKey = `${timesheetYear}-${timesheetMonth}-${timesheetWeek}`;
    const existing = timesheets.find(item => item.employeeId === currentUser.employeeId && (item.weekStartDate === key || item.periodKey === legacyKey));
    if (key < getLocalDateKey(getSundayWeekStart(new Date()))) { setMessage("Previous weeks are view-only."); return; }
    if (existing?.status === "Approved") { setMessage("This timesheet is already approved."); return; }
    const entry = { id: existing?.id || createTimesheetId(), employeeId: currentUser.employeeId, employeeName: currentUser.name || "Employee", year: weekStartDate.getFullYear(), month: weekStartDate.getMonth(), week: getWeekIndex(weekStartDate), weekStartDate: key, periodKey: legacyKey, batch: currentUser?.attendanceBatch || "General Batch", rows: timesheetRows.map((row) => ({ ...row, shift: currentUser?.attendanceBatch || "General Batch" })), status: existing?.status === "Pending" || existing?.status === "Approved" ? existing.status : "Pending with User", savedAt: new Date().toISOString() };
    const updated = existing ? timesheets.map(item => item.id === existing.id ? entry : item) : [...timesheets, entry];
    const ordered = sortRecordsNewestFirst(updated); setTimesheets(ordered); saveStore("wt_timesheets", ordered); setMessage("Timesheet draft saved.");
  };
  const submitTimesheet = (e) => {
    e.preventDefault();
    if (!currentUser?.employeeId) {
      setMessage("Please log in as an employee before submitting a timesheet.");
      return;
    }
    const rows = timesheetRows
      .map((row) => ({
        activity: (row.activity || "").trim(),
        activityByDay: (row.activityByDay || Array(7).fill("")).map((value) => String(value || "").trim()),
        shift: row.shift || "",
        dayTypes: row.dayTypes || Array(7).fill(""),
        hours: row.hours || Array(7).fill(""),
        remarks: (row.remarks || "").trim(),
        remarksByDay: (row.remarksByDay || Array(7).fill("")).map((value) => String(value || "").trim()),
        fileName: row.fileName || "",
        fileData: row.fileData || "",
        fileNameByDay: row.fileNameByDay || Array(7).fill(""),
        fileDataByDay: row.fileDataByDay || Array(7).fill(""),
      }))
      .filter((row) => row.activity || row.activityByDay.some(Boolean) || row.shift || row.remarks || row.remarksByDay.some(Boolean) || row.fileName || row.fileNameByDay.some(Boolean) || (row.hours || []).some((h) => h !== "") || (row.dayTypes || []).some((type) => type));
    if (!rows.length || !rows.some((row) => row.activity || row.activityByDay.some(Boolean))) {
      setMessage("Please enter at least one daily activity before submitting.");
      return;
    }
    const weekStartDate = getSundayWeekStart(timesheetAnchorDate);
    const weekStartKey = getLocalDateKey(weekStartDate);
    if (weekStartKey < getLocalDateKey(getSundayWeekStart(new Date()))) {
      setMessage("Previous weeks are view-only. You cannot submit a timesheet for a past week.");
      return;
    }
    const legacyKey = `${timesheetYear}-${timesheetMonth}-${timesheetWeek}`;
    const existing = timesheets.find((item) => item.employeeId === currentUser.employeeId && (item.weekStartDate === weekStartKey || item.periodKey === legacyKey));
    if (existing?.status === "Approved") {
      setMessage("This timesheet has already been approved and cannot be changed.");
      return;
    }
    const entry = {
      id: existing?.id || createTimesheetId(),
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name || currentUser.fullName || "Employee",
      year: weekStartDate.getFullYear(),
      month: weekStartDate.getMonth(),
      week: getWeekIndex(weekStartDate),
      weekStartDate: weekStartKey,
      periodKey: legacyKey,
      batch: currentUser?.attendanceBatch || "General Batch",
      rows: rows.map((row) => ({ ...row, shift: currentUser?.attendanceBatch || "General Batch" })),
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };
    const updated = existing
      ? timesheets.map((item) => item.id === existing.id ? entry : item)
      : [...timesheets, entry];
    const ordered = sortRecordsNewestFirst(updated);
    setTimesheets(ordered);
    saveStore("wt_timesheets", ordered);
    const existingNotifications = readStore("wt_notifications", []);
    const adminNotificationId = `admin-timesheet-submit-${entry.id}-${entry.submittedAt}`;
    saveStore("wt_notifications", [{ id: adminNotificationId, audience: "admin", kind: "timesheet-submission", recordId: entry.id, title: "Timesheet submitted", message: `${entry.employeeName} (${entry.employeeId}) submitted a timesheet for week starting ${entry.weekStartDate}.`, isNew: true, createdAt: new Date().toISOString() }, ...existingNotifications]);
    setTimesheetRows([{ activity: "", shift: "", dayTypes: Array(7).fill(""), hours: Array(7).fill(""), remarks: "", fileName: "" }]);
    setMessage("Timesheet submitted. Status: Pending admin approval.");
  };
  const updateTimesheetStatus = (id, status) => {
    const updated = timesheets.map((item) =>
      item.id === id ? { ...item, status, reviewedAt: new Date().toISOString() } : item
    );
    const ordered = sortRecordsNewestFirst(updated);
    setTimesheets(ordered);
    saveStore("wt_timesheets", ordered);
    setMessage(`Timesheet ${status.toLowerCase()}.`);
  };
  const deleteTimesheet = (id) => {
    const deleted = timesheets.find((item) => item.id === id);
    const updated = timesheets.filter((item) => item.id !== id);
    const ordered = sortRecordsNewestFirst(updated);
    setTimesheets(ordered);
    saveStore("wt_timesheets", ordered);
    if (deleted?.employeeId === currentUser?.employeeId) {
      const deletedWeekStart = deleted.weekStartDate || getLocalDateKey(getSundayWeekStart(new Date(deleted.year, deleted.month, Math.max(1, deleted.week * 7 + 1))));
      const selectedWeekStart = getLocalDateKey(getSundayWeekStart(new Date(`${timesheetSelectedDate}T12:00:00`)));
      if (deletedWeekStart === selectedWeekStart) {
        setTimesheetRows([{ activity: "", shift: "", dayTypes: Array(7).fill(""), hours: Array(7).fill(""), remarks: "", fileName: "" }]);
      }
    }
    setMessage("Submitted timesheet deleted. You can fill it again and submit it for admin approval.");
  };
  const goToSearchResult = () => {
    const query = globalSearch.trim().toLowerCase();
    if (!query) { setMessage("Type a page or feature name to search."); return; }
    const pages = isAdmin
      ? ["Dashboard", "Approvals", "Employees", "Tasks", "Rejected Tasks", "Actionable", "Time-Sheet Approvals", "Attendance", "Leave Requests", "Ticket Requests"]
      : ["Dashboard", "My Tasks", "Time-Sheet", "Attendance", "My Leaves", "My Info", "My Profile", "Change Password", "Support Hub", "Reports"];
    const aliases = [
      { terms: ["timesheet", "time sheet", "time-sheet", "timesheets"], pageName: isAdmin ? "Time-Sheet Approvals" : "Time-Sheet" },
      { terms: ["leave", "leaves"], pageName: isAdmin ? "Leave Requests" : "My Leaves" },
      { terms: ["ticket", "tickets", "support"], pageName: isAdmin ? "Ticket Requests" : "Support Hub" },
      { terms: ["attendance", "attend"], pageName: "Attendance" },
      { terms: ["employee", "employees", "staff"], pageName: isAdmin ? "Employees" : "My Info" },
      { terms: ["approval", "approvals", "pending approval"], pageName: isAdmin ? "Approvals" : "My Tasks" },
      { terms: ["task", "tasks", "completed", "deadline", "rejected"], pageName: isAdmin ? (query.includes("reject") ? "Rejected Tasks" : "Tasks") : "My Tasks" },
      { terms: ["announcement", "announcements", "notice"], pageName: "Dashboard" },
      { terms: ["username", "change username"], pageName: isAdmin ? "Change Username" : "My Profile" },
      { terms: ["profile", "password"], pageName: query.includes("password") ? (isAdmin ? "Admin Change Password" : "Change Password") : "My Profile" },
    ];
    let match = pages.find((item) => item.toLowerCase() === query)
      || pages.find((item) => item.toLowerCase().includes(query) || query.includes(item.toLowerCase()));
    if (!match) {
      const alias = aliases.find((item) => item.terms.some((term) => term.includes(query) || query.includes(term)));
      if (alias) match = alias.pageName;
    }
    if (match && pages.includes(match)) {
      setSection(match); setGlobalSearch(""); setMessage(""); setMobileMenu(false);
    } else setMessage(`No application/page named "${globalSearch.trim()}" exists in this workspace.`);
  };
  const updateProfile = (e) => {
    e.preventDefault();
    const updated = employees.map((employee) => employee.employeeId === currentUser?.employeeId
      ? { ...employee, name: profileName.trim(), mobile: profileMobile.trim(), photo: profilePhoto }
      : employee);
    updateEmployees(updated);
    const user = { ...currentUser, name: profileName.trim(), mobile: profileMobile.trim(), photo: profilePhoto };
    setCurrentUser(user); saveStore("wt_currentUser", user); setMessage("Profile updated successfully.");
  };
  const saveNewPassword = (e) => {
    e.preventDefault();
    if (currentPassword !== currentUser?.password) { setMessage("Current password is incorrect."); return; }
    if (changePassword.length < 6) { setMessage("New password must contain at least 6 characters."); return; }
    if (changePassword !== confirmPassword) { setMessage("New password and confirmation do not match."); return; }
    const updated = employees.map((employee) => employee.employeeId === currentUser?.employeeId ? { ...employee, password: changePassword } : employee);
    updateEmployees(updated);
    const user = { ...currentUser, password: changePassword }; setCurrentUser(user); saveStore("wt_currentUser", user);
    setCurrentPassword(""); setChangePassword(""); setConfirmPassword(""); setPasswordPanelOpen(false); setMessage("Password changed successfully.");
  };
  const saveAdminUsername = (e) => {
    e.preventDefault();
    const credentials = getAdminCredentials();
    if (adminCurrentUsername.trim().toLowerCase() !== String(credentials.username || ADMIN.username).trim().toLowerCase()) {
      setMessage("Current username is incorrect."); return;
    }
    const nextUsername = adminNewUsername.trim();
    if (!nextUsername || nextUsername.length < 4) { setMessage("New username must contain at least 4 characters."); return; }
    const updatedCredentials = { ...credentials, username: nextUsername };
    saveStore("wt_adminCredentials", updatedCredentials);
    const updatedUser = { ...(currentUser || {}), email: nextUsername };
    setCurrentUser(updatedUser); saveStore("wt_currentUser", updatedUser);
    setAdminCurrentUsername(""); setAdminNewUsername("");
    setShowAdminCurrentUsername(false); setShowAdminNewUsername(false);
    setMessage("Admin username changed successfully. Use the new username next time you log in.");
  };
  const saveAdminPassword = (e) => {
    e.preventDefault();
    const credentials = getAdminCredentials();
    if (adminCurrentPassword !== (credentials.password || ADMIN.password)) { setMessage("Current password is incorrect."); return; }
    if (adminNewPassword.length < 6) { setMessage("New password must contain at least 6 characters."); return; }
    if (adminNewPassword !== adminConfirmPassword) { setMessage("New password and confirmation do not match."); return; }
    const updatedCredentials = { ...credentials, password: adminNewPassword };
    saveStore("wt_adminCredentials", updatedCredentials);
    const updatedUser = { ...(currentUser || {}), password: adminNewPassword };
    setCurrentUser(updatedUser); saveStore("wt_currentUser", updatedUser);
    setAdminCurrentPassword(""); setAdminNewPassword(""); setAdminConfirmPassword("");
    setShowAdminCurrentPassword(false); setShowAdminNewPassword(false); setShowAdminConfirmPassword(false);
    setMessage("Admin password changed successfully. Use the new password next time you log in.");
  };
  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setMessage("Please choose an image file."); return; }
    const reader = new FileReader(); reader.onload = () => setProfilePhoto(String(reader.result)); reader.readAsDataURL(file);
  };
  const isAdmin = page === "admin";
  useEffect(() => {
    if (page !== "admin" && page !== "employee") return;
    if (!section || section === "Dashboard") return;
    const visited = readStore("wt_recentlyVisited", []);
    const updatedVisited = [section, ...visited.filter((item) => item !== section)].slice(0, 5);
    saveStore("wt_recentlyVisited", updatedVisited);
  }, [section, page]);
  useEffect(() => {
    if (page !== "admin") return undefined;
    const snapshot = () => ({
      leaves: readStore("wt_leaves", []),
      timesheets: readStore("wt_timesheets", []),
      tickets: readStore("wt_support_tickets", []),
    });
    let previous = snapshot();
    const interval = window.setInterval(() => {
      const current = snapshot();
      const existing = readStore("wt_notifications", []);
      const additions = [];
      const employeeFor = (record) => employees.find((employee) => employee.employeeId === record.employeeId);
      const notifyOnce = (id, title, messageText, kind, recordId) => {
        if (!existing.some((item) => item.id === id || (item.audience === "admin" && item.kind === kind && item.recordId === recordId)) && !additions.some((item) => item.id === id || (item.kind === kind && item.recordId === recordId))) {
          additions.push({ id, audience: "admin", kind, recordId, title, message: messageText, isNew: true, createdAt: new Date().toISOString() });
        }
      };
      current.timesheets.forEach((item) => {
        const old = previous.timesheets.find((record) => record.id === item.id);
        if ((!old && item.status === "Pending") || (old && old.status !== "Pending" && item.status === "Pending" && item.submittedAt)) {
          const employee = employeeFor(item);
          notifyOnce(`ADMIN-TIMESHEET-${item.id}-${item.submittedAt || item.status}`, "Timesheet submitted", `${item.employeeName || employee?.name || "Employee"} (${item.employeeId || employee?.employeeId || "No ID"}) submitted a timesheet for week starting ${item.weekStartDate || "the selected week"}.`, "timesheet-submission", item.id);
        }
      });
      current.tickets.forEach((item) => {
        if (!previous.tickets.some((old) => old.id === item.id)) {
          const employee = employeeFor(item);
          notifyOnce(`ADMIN-TICKET-${item.id}`, "New support ticket", `${item.employeeName || employee?.name || "Employee"} (${item.employeeId || employee?.employeeId || "No ID"}) raised ticket ${item.ticketNumber || item.id}: ${item.subject || "Support request"}.`, "ticket-submission", item.id);
        }
      });
      if (additions.length) {
        const next = [...additions, ...existing];
        saveStore("wt_notifications", next);
        setNotificationItems(next);
      } else {
        setNotificationItems((items) => {
          const latest = readStore("wt_notifications", []);
          return JSON.stringify(items) === JSON.stringify(latest) ? items : latest;
        });
      }
      previous = current;
    }, 1500);
    return () => window.clearInterval(interval);
  }, [page, employees]);
  useEffect(() => {
    if (page !== "employee" || !currentUser?.employeeId) return undefined;
    const employeeId = currentUser.employeeId;
    const readSnapshot = () => ({
      tasks: readStore("wt_tasks", []).filter((item) => item.employeeId === employeeId),
      timesheets: readStore("wt_timesheets", []).filter((item) => item.employeeId === employeeId),
      leaves: readStore("wt_leaves", []).filter((item) => item.employeeId === employeeId),
      tickets: readStore("wt_support_tickets", []).filter((item) => item.employeeId === employeeId),
      announcements: readStore("wt_notifications", []).filter((item) => (item.kind === "announcement" || String(item.id || "").startsWith("ANN-")) && (!item.employeeId || item.employeeId === employeeId)),
    });
    let previous = readSnapshot();
    const interval = window.setInterval(() => {
      const current = readSnapshot();
      const existingNotifications = readStore("wt_notifications", []);
      const additions = [];
      const pushOnce = (id, title, message, kind, recordId) => {
        if (!existingNotifications.some((item) => item.id === id) && !additions.some((item) => item.id === id)) {
          additions.push({ id, title, message, kind, recordId, employeeId, createdAt: new Date().toISOString(), isNew: true });
        }
      };
      const oldTaskIds = new Set(previous.tasks.map((item) => item.id));
      current.tasks.forEach((task) => {
        const old = previous.tasks.find((item) => item.id === task.id);
        if (!old && !oldTaskIds.has(task.id)) {
          pushOnce(`EMP-TASK-ASSIGNED-${task.id}`, "New task assigned", `The administrator assigned you the task “${task.title || "Task"}”.`, "task", task.id);
          return;
        }
        if (old && old.status !== task.status && ["Approved", "Completed", "Rejected"].includes(task.status)) {
          const alreadyNotified = task.status === "Approved" && existingNotifications.some((item) => item.taskId === task.id && item.title === "Task completed");
          if (!alreadyNotified) {
            const title = task.status === "Rejected" ? "Task rejected" : "Task completed";
            pushOnce(`EMP-TASK-STATUS-${task.id}-${task.status}-${task.updatedAt || task.approvedAt || task.rejectedAt || task.status}`, title, `Your task “${task.title || "Task"}” was ${task.status === "Approved" ? "approved and marked completed" : task.status.toLowerCase()} by the administrator.`, "task", task.id);
          }
        }
      });
      current.timesheets.forEach((item) => {
        const old = previous.timesheets.find((record) => record.id === item.id);
        if (old && old.status !== item.status && ["Approved", "Rejected"].includes(item.status)) {
          pushOnce(`EMP-TIMESHEET-${item.id}-${item.status}-${item.reviewedAt || item.status}`, `Timesheet ${item.status.toLowerCase()}`, `Your timesheet for ${item.weekStartDate || "the selected week"} was ${item.status.toLowerCase()} by the administrator.`, "timesheet", item.id);
        }
      });
      current.leaves.forEach((item) => {
        const old = previous.leaves.find((record) => record.id === item.id);
        if (old && old.status !== item.status && ["Approved", "Rejected"].includes(item.status)) {
          pushOnce(`EMP-LEAVE-${item.id}-${item.status}-${item.reviewedAt || item.status}`, `Leave ${item.status.toLowerCase()}`, `Your ${item.leaveType || "leave"} request was ${item.status.toLowerCase()} by the administrator.`, "leave", item.id);
        }
      });
      current.tickets.forEach((item) => {
        const old = previous.tickets.find((record) => record.id === item.id);
        if (old && old.status !== item.status) {
          const status = String(item.status || "updated");
          pushOnce(`EMP-TICKET-${item.id}-${status}-${item.updatedAt || item.reviewedAt || status}`, `Support ticket ${status}`, `Your ticket ${item.ticketNumber || item.id} (“${item.subject || "Support request"}”) is now ${status}.`, "ticket", item.id);
        }
      });
      current.announcements.forEach((item) => {
        if (!previous.announcements.some((old) => old.id === item.id)) {
          pushOnce(`EMP-ANNOUNCEMENT-${item.id}`, item.title || "New announcement", item.message || item.text || "The administrator published a new announcement.", "announcement", item.id);
        }
      });
      if (additions.length) {
        const nextNotifications = [...additions, ...existingNotifications];
        saveStore("wt_notifications", nextNotifications);
        setNotificationItems(nextNotifications);
      } else {
        setNotificationItems((items) => {
          const latest = readStore("wt_notifications", []);
          return JSON.stringify(items) === JSON.stringify(latest) ? items : latest;
        });
      }
      previous = current;
    }, 1500);
    return () => window.clearInterval(interval);
  }, [page, currentUser?.employeeId]);
  useEffect(() => {
    const checkOverdueTasks = () => {
      const today = getLocalDateKey(new Date());
      const currentTasks = readStore("wt_tasks", []);
      const currentEmployees = readStore("wt_employees", []);
      let tasksChanged = false;
      const nextTasks = currentTasks.map((task) => {
        const deadlinePassed = Boolean(task.deadline && task.deadline < today);
        const overdueWithoutSubmission = deadlinePassed && !task.submittedAt && task.status !== "Approved" && task.status !== "Completed";
        const rejectedAfterDeadline = deadlinePassed && task.status === "Rejected";
        const overdue = overdueWithoutSubmission || rejectedAfterDeadline;
        if (overdue && !task.actionable) {
          tasksChanged = true;
          return { ...task, actionable: true, actionableSince: new Date().toISOString() };
        }
        return task;
      });
      if (!tasksChanged) return;
      const notifications = readStore("wt_notifications", []);
      const newAlerts = nextTasks.filter((task) => task.actionable && !task.adminNotified).map((task) => {
        const employee = currentEmployees.find((item) => item.employeeId === task.employeeId);
        return {
          id: `TASK-OVERDUE-${task.id}`,
          title: "Task deadline missed",
          message: `${employee?.name || task.employeeId} has not submitted “${task.title}” by the deadline (${task.deadline}).`,
          taskId: task.id,
          createdAt: new Date().toISOString(),
        };
      });
      let finalTasks = nextTasks;
      if (newAlerts.length) {
        saveStore("wt_notifications", [...newAlerts, ...notifications]);
        const alertedIds = new Set(newAlerts.map((item) => item.taskId));
        finalTasks = nextTasks.map((task) => alertedIds.has(task.id) ? { ...task, adminNotified: true } : task);
      }
      updateTasks(finalTasks);
    };
    checkOverdueTasks();
    const timer = window.setInterval(checkOverdueTasks, 60000);
    return () => window.clearInterval(timer);
  }, []);
  const myTasks = tasks.filter(
    (task) => task.employeeId === currentUser?.employeeId
  );
  const myLeaves = leaves.filter(
    (leave) => leave.employeeId === currentUser?.employeeId
  );
  const myLeaveRecords = myLeaves;
  const myLeaveRequests = myLeaves.filter((leave) =>
    String(leave.requestCategory || leave.requestType || "").trim().toLowerCase() !== "common holiday" &&
    String(leave.requestType || "").trim().toLowerCase() !== "common holiday"
  );
  const employeePendingTasks = myTasks.filter((task) => {
    const status = String(task.status || "pending").trim().toLowerCase();
    const deadline = String(task.deadline || "").slice(0, 10);
    const submitted = String(task.lastSubmittedDate || task.submittedAt || "").slice(0, 10);
    const today = getLocalDateKey(dashboardNow);
    const late = Boolean(deadline && ((submitted && submitted > deadline) || (deadline < today && !submitted)));
    return !["submitted", "approved", "completed", "rejected"].includes(status) && !late;
  });
  const visibleTasks = isAdmin ? tasks : myTasks;
  const completedTasks = visibleTasks.filter(
    (task) => task.status === "Completed" || (!isAdmin && task.status === "Approved")
  ).length;
  const employeeRejectedTaskCount = myTasks.filter((task) =>
    String(task.status || "").trim().toLowerCase() === "rejected"
  ).length;
  const employeeTaskDeadlineCount = myTasks.filter((task) => {
    const status = String(task.status || "pending").trim().toLowerCase();
    const deadline = String(task.deadline || "").slice(0, 10);
    const submitted = String(task.lastSubmittedDate || task.submittedAt || "").slice(0, 10);
    const today = getLocalDateKey(dashboardNow);
    if (["rejected", "approved", "completed"].includes(status)) return false;
    return Boolean(deadline && ((submitted && submitted > deadline) || (deadline < today && !submitted)));
  }).length;
  const employeeOutstandingTaskCount = employeePendingTasks.length + employeeRejectedTaskCount + employeeTaskDeadlineCount;
  const employeeAttendanceRecords = employees.find((item) => item.employeeId === currentUser?.employeeId)?.attendanceRecords || currentUser?.attendanceRecords || [];
  const currentEmployeeRecord = employees.find((item) => item.employeeId === currentUser?.employeeId) || currentUser;
  const todayAttendanceRecord = employeeAttendanceRecords.find((record) => record.date === getLocalDateKey(dashboardNow) && record.checkIn);
  const employeeBatch = currentEmployeeRecord?.attendanceBatch || "General Batch";
  const employeeBatchWindow = ({ "Morning Batch": [300, 315], "General Batch": [540, 555], "Night Batch": [1260, 1275] })[employeeBatch] || [540, 555];
  const currentMinuteOfDay = dashboardNow.getHours() * 60 + dashboardNow.getMinutes();
  const employeeAttendanceLabel = isWeekend(dashboardNow) ? "Holiday" : todayAttendanceRecord ? "Attendance Marked" : currentMinuteOfDay < employeeBatchWindow[0] ? "Attendance not started yet" : currentMinuteOfDay > employeeBatchWindow[1] ? "Attendance Not Marked" : "Attendance can be marked now";
  const employeeMonthKey = `${dashboardNow.getFullYear()}-${String(dashboardNow.getMonth() + 1).padStart(2, "0")}`;
  const employeeMonthlyAttendanceDays = new Set(employeeAttendanceRecords.filter((record) => String(record.date || "").startsWith(employeeMonthKey) && (record.checkIn || record.status === "Present")).map((record) => record.date)).size;
  const todayHolidayKey = getLocalDateKey(new Date());
  const upcomingHoliday = [
    ...getCommonHolidays(new Date().getFullYear()),
    ...getCommonHolidays(new Date().getFullYear() + 1),
  ].filter((holiday) => holiday.date >= todayHolidayKey).sort((a, b) => a.date.localeCompare(b.date))[0];
  const daysUntilUpcomingHoliday = upcomingHoliday
    ? Math.ceil((new Date(`${upcomingHoliday.date}T00:00:00`) - new Date(`${todayHolidayKey}T00:00:00`)) / 86400000)
    : null;
  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.employeeId} ${employee.mobile}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const dashboardTodayKey = getLocalDateKey(dashboardNow);
  const dashboardCurrentMinute = dashboardNow.getHours() * 60 + dashboardNow.getMinutes();
  const dashboardBatchWindows = { "Morning Batch": [300, 315], "General Batch": [540, 555], "Night Batch": [1260, 1275] };
  const dashboardAttendanceNotMarked = isWeekend(dashboardNow) ? 0 : employees.filter((employee) => {
    if (!employee.employeeId) return false;
    const batch = employee.attendanceBatch || "General Batch";
    const [, end] = dashboardBatchWindows[batch] || dashboardBatchWindows["General Batch"];
    const marked = (employee.attendanceRecords || []).some((record) => record.date === dashboardTodayKey && record.checkIn);
    return !marked && dashboardCurrentMinute > end;
  }).length;
  const dashboardTaskDeadlines = tasks.filter((task) => {
    if (!task.deadline) return false;
    const deadlineKey = String(task.deadline).slice(0, 10);
    return deadlineKey === dashboardTodayKey;
  }).length;
  const dashboardPendingTickets = ticketNavRecords.filter((ticket) => /pending/i.test(String(ticket.status || "Pending for Approval"))).length;
  const pendingLeaveCount = leaves.filter((leave) => String(leave.status || "Pending").trim().toLowerCase() === "pending").length;
  const pendingTimesheetCount = timesheets.filter((item) => ["pending", "pending approval", "pending admin approval"].includes(String(item.status || "").trim().toLowerCase())).length;
  const pendingEmployeeApprovalCount = employees.filter((employee) => employee.status === "Pending Approval").length;
  const rejectedEmployeeApprovalCount = employees.filter((employee) => employee.status === "Rejected").length;
  const todayForTaskCounts = getLocalDateKey(dashboardNow);
  const taskSubmittedDate = (task) => task.lastSubmittedDate || (task.submittedAt ? String(task.submittedAt).slice(0, 10) : "");
  const isTaskSubmittedOnTime = (task) => {
    const status = String(task.status || "").trim().toLowerCase();
    const submittedDate = taskSubmittedDate(task);
    return status === "submitted" && Boolean(submittedDate) && (!task.deadline || submittedDate <= String(task.deadline).slice(0, 10));
  };
  const isTaskLateOrOverdue = (task) => {
    const status = String(task.status || "").trim().toLowerCase();
    if (["rejected", "approved", "completed"].includes(status)) return false;
    const deadline = String(task.deadline || "").slice(0, 10);
    const submittedDate = taskSubmittedDate(task);
    const submittedLate = Boolean(deadline && submittedDate && submittedDate > deadline);
    const overdueWithoutOnTimeSubmission = Boolean(deadline && deadline < todayForTaskCounts && !submittedDate);
    return submittedLate || overdueWithoutOnTimeSubmission;
  };
  const deadlineTaskCount = tasks.filter(isTaskLateOrOverdue).length;
  const completedTaskCount = tasks.filter(isTaskSubmittedOnTime).length;
  const menuItems = isAdmin
    ? ["Dashboard", "Approvals", "Employees", "Tasks", "Time-Sheet Approvals", "Attendance", "Leave Requests", "Ticket Requests", "ChatBox"]
    : ["Dashboard", "My Tasks", "Time-Sheet", "Attendance", "My Leaves", "My Info", "Support Hub"];
  if (page === "pending") {
    return (
      <AuthMessagePage
        icon={<ShieldCheck size={48} />}
        title="Request Pending"
        message="Your account request has been submitted. Your Employee ID will be generated after administrator approval."
        onBack={() => {
          setPage("login");
          setRole("employee");
        }}
      />
    );
  }
  if (page === "request-rejected") {
    return (
      <AuthMessagePage
        icon={<CircleAlert size={48} />}
        title="Request Not Approved"
        message="Your request was not approved. Please contact your company administrator."
        onBack={() => {
          setPage("login");
          setRole("employee");
        }}
      />
    );
  }
  if (page === "employee-approved" && checkedRequest?.employeeId) {
    const employee = checkedRequest;
    return (
      <div className="auth-page">
        <section className="auth-area">
          <div className="auth-card approval-wait-card">
            <CheckCircle2 size={48} />
            <h2>Account Approved!</h2>
            <p>Your account has been approved by the administrator.</p>
            <div className="demo-credentials">
              <strong>Your Employee ID</strong>
              <h2>{employee.employeeId}</h2>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  if (navigator.clipboard?.writeText) {
                    navigator.clipboard.writeText(employee.employeeId)
                      .then(() => setMessage("Employee ID copied."))
                      .catch(() => setMessage("Please select and copy the Employee ID manually."));
                  } else {
                    setMessage("Please select and copy the Employee ID manually.");
                  }
                }}
              >
                <Copy size={16} /> Copy Employee ID
              </button>
            </div>
            <div className="profile-grid">
              <ProfileField label="Full name" value={employee.name} />
              <ProfileField label="Company email" value={employee.email} />
              <ProfileField label="Mobile number" value={employee.mobile} />
              <ProfileField label="Position" value={employee.role} />
              <ProfileField label="Joining code" value={employee.joiningCode} />
              <ProfileField label="Status" value={employee.status} />
            </div>
            {message && <div className="alert-message">{message}</div>}
            <button
              className="primary-btn"
              onClick={() => {
                setForm(EMPTY_FORM);
                setRole("employee");
                setMessage("");
                setPage("login");
              }}
            >
              Continue to Login →
            </button>
          </div>
        </section>
      </div>
    );
  }
  if (page === "request-status") {
    const request = checkedRequest;
    return (
      <div className="auth-page">
        <section className="auth-area">
          <div className="auth-card">
            <h2>Check Request Status</h2>
            <p className="muted">
              Enter your joining code and registered company email.
            </p>
            <form onSubmit={checkRequestStatus}>
              <div className="field">
                <label>Company Joining Code</label>
                <div className="joining-code-input">
                  <span>WT-</span>
                  <input
                    value={statusCode}
                    onChange={(e) =>
                      setStatusCode(
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="Enter code numbers only"
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label>Registered company email</label>
                <input
                  type="email"
                  value={statusEmail}
                  onChange={(e) => setStatusEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <button className="primary-btn" type="submit">
                Check Status
              </button>
            </form>
            {request && (
              <div className="request-result">
                {request.status === "Not Found" ? (
                  <p>{request.message}</p>
                ) : (
                  <>
                    <h3>
                      Request: {request.status === "Active" ? "Approved" : request.status}
                    </h3>
                    <ProfileField label="Name" value={request.name} />
                    <ProfileField label="Email" value={request.email} />
                    <ProfileField label="Mobile" value={request.mobile} />
                    <ProfileField label="Position" value={request.role} />
                    {request.status === "Pending Approval" && (
                      <p>Your request is awaiting administrator approval.</p>
                    )}
                    {request.status === "Active" && request.employeeId && (
                      <>
                        <div className="demo-credentials">
                          <strong>Your Employee ID</strong>
                          <h2>{request.employeeId}</h2>
                        </div>
                        <button
                          type="button"
                          className="primary-btn"
                          onClick={() => setPage("employee-approved")}
                        >
                          View Employee ID &amp; Details
                        </button>
                      </>
                    )}
                    {request.status === "Rejected" && (
                      <p>Your request was rejected. Contact the administrator.</p>
                    )}
                  </>
                )}
              </div>
            )}
            <p className="auth-switch">
              <button
                type="button"
                onClick={() => {
                  setPage("login");
                  setMessage("");
                }}
              >
                Back to Login
              </button>
            </p>
          </div>
        </section>
      </div>
    );
  }
  if (["login", "signup", "reset"].includes(page)) {
    return (
      <div className="auth-page">
        <section className="auth-area">
          <div className="mobile-brand brand">
            <ClipboardList size={26} /><span>WorkTrack Solutions</span>
          </div>
          <div className="auth-card">
            <span className="overline dark-overline">YOUR WORKSPACE AWAITS</span>
            <h2>
              {page === "signup" ? "Create your account" :
               page === "reset" ? "Reset password" : "Welcome back"}
            </h2>
            <p className="muted">
              {page === "signup" ? "Enter your company details to request access." :
               page === "reset" ? "Set a new demo password." :
               "Sign in to access your workspace."}
            </p>
            {page === "login" && (
              <div className="role-switch">
                <button
                  type="button"
                  className={role === "employee" ? "role-btn selected" : "role-btn"}
                  onClick={() => {
                    setRole("employee");
                    setForm(EMPTY_FORM);
                    setMessage("");
                  }}
                >
                  <Users size={17} /> Employee
                </button>
                <button
                  type="button"
                  className={role === "admin" ? "role-btn selected" : "role-btn"}
                  onClick={() => {
                    setRole("admin");
                    setForm(EMPTY_FORM);
                    setMessage("");
                  }}
                >
                  <ShieldCheck size={17} /> Admin
                </button>
              </div>
            )}
            {page === "reset" ? (
              <form onSubmit={handleResetPassword}>
                <div className="field">
                  <label>Registered company email</label>
                  <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Employee ID</label>
                  <input value={resetEmployeeId} onChange={(e) => setResetEmployeeId(e.target.value)} placeholder="Enter ID" required />
                </div>
                <div className="field">
                  <label>New password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} required />
                </div>
                {message && <div className="alert-message">{message}</div>}
                <button className="primary-btn" type="submit">Update password <KeyRound size={17} /></button>
                <p className="auth-switch">
                  <button type="button" onClick={() => { setPage("login"); setMessage(""); }}>Back to Login</button>
                </p>
              </form>
            ) : (
              <form onSubmit={page === "signup" ? handleSignup : handleLogin}>
                {page === "signup" && (
                  <>
                    <div className="form-grid">
                      <div className="field">
                        <label>First name</label>
                        <input name="firstName" value={form.firstName} onChange={updateForm} required />
                      </div>
                      <div className="field">
                        <label>Middle name (optional)</label>
                        <input name="middleName" value={form.middleName} onChange={updateForm} />
                      </div>
                      <div className="field">
                        <label>Last name</label>
                        <input name="lastName" value={form.lastName} onChange={updateForm} required />
                      </div>
                      <div className="field">
                        <label>Date of birth</label>
                        <input type="date" name="dob" value={form.dob} max={new Date().toISOString().slice(0, 10)} onChange={updateForm} required />
                      </div>
                    </div>
                    <div className="field">
                      <label>Position / Designation</label>
                      <input name="position" value={form.position} onChange={updateForm} placeholder="e.g. Front-End Developer" required />
                    </div>
                    <div className="field">
                      <label>Attendance batch / shift</label>
                      <select name="attendanceBatch" value={form.attendanceBatch} onChange={updateForm} required>
                        <option value="">Select your batch</option>
                        <option value="Morning Batch">Morning Batch (5:00 AM–5:15 AM)</option>
                        <option value="General Batch">General Batch (9:00 AM–9:15 AM)</option>
                        <option value="Night Batch">Night Batch (9:00 PM–9:15 PM)</option>
                      </select>
                      <small className="muted">Your selected batch will be saved in your employee profile.</small>
                    </div>
                    <div className="field">
                      <label>Mobile number</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                        placeholder="10-digit mobile number"
                        inputMode="numeric"
                        maxLength={10}
                        required
                      />
                    </div>
                    <div className="field">
                      <label>Company email address</label>
                      <input type="email" name="email" value={form.email} onChange={updateForm} placeholder="you@company.com" required />
                    </div>
                    <div className="field">
                      <label>Company Joining Code</label>
                      <div className="joining-code-input">
                        <span>WT-</span>
                        <input
                          name="joiningCode"
                          value={form.joiningCode}
                          onChange={(e) => setForm({ ...form, joiningCode: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                          placeholder="Enter code numbers only"
                          inputMode="numeric"
                          required
                        />
                      </div>
                      <small className="muted">Enter only the numbers supplied by your company.</small>
                    </div>
                  </>
                )}
                {page === "login" && (
                  <div className="field">
                    <label>{role === "admin" ? "Admin username" : "Employee ID"}</label>
                    <input
                      type="text"
                      name={role === "admin" ? "email" : "employeeId"}
                      value={role === "admin" ? form.email : form.employeeId}
                      onChange={updateForm}
                      placeholder={role === "admin" ? "Username" : "Enter ID"}
                      required
                    />
                  </div>
                )}
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={updateForm}
                    placeholder={page === "signup" ? "Create a password" : "Enter password"}
                    minLength={6}
                    required
                  />
                </div>
                {message && <div className="alert-message">{message}</div>}
                <button className={`primary-btn ${page === "login" ? "auth-login-submit" : ""}`} type="submit">
                  {page === "signup" ? "Create account" : "Sign in"} <span>→</span>
                </button>
              </form>
            )}
            {page === "login" && role === "employee" && (
              <>
                <p className="auth-switch">
                  Forgot your password?{" "}
                  <button type="button" onClick={() => { setPage("reset"); setMessage(""); }}>
                    Reset Password
                  </button>
                </p>
                <p className="auth-switch">
                  New employee?{" "}
                  <button type="button" onClick={() => { setPage("signup"); setForm(EMPTY_FORM); setMessage(""); }}>
                    Create account
                  </button>
                </p>
                <p className="auth-switch">
                  Already requested access?{" "}
                  <button type="button" onClick={() => { setCheckedRequest(null); setPage("request-status"); setMessage(""); }}>
                    Check Joining Code / Request Status
                  </button>
                </p>
              </>
            )}
            {page === "signup" && (
              <p className="auth-switch">
                Already registered?{" "}
                <button type="button" onClick={() => { setPage("login"); setForm(EMPTY_FORM); setMessage(""); }}>
                  Sign in
                </button>
              </p>
            )}
            {page === "login" && role === "admin" && (
              <div className="demo-credentials">
                <strong>Admin demo credentials</strong>
                <p>Username: {getAdminCredentials().username || ADMIN.username}</p>
                <p>Password: {getAdminCredentials().password || ADMIN.password}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
  const visibleNotificationItems = notificationItems.filter((n) => {
    const belongsToViewer = n.audience === "admin" ? isAdmin : (!n.employeeId || n.employeeId === currentUser?.employeeId);
    if (!belongsToViewer || String(n.title || "").trim().toLowerCase() === "welcome to worktrack solution") return false;
    if (!isAdmin) return true;
    return ["timesheet-submission", "ticket-submission", "ticket-comment", "leave-request", "employee-chat"].includes(n.kind);
  });
  const unreadVisibleNotificationCount = visibleNotificationItems.filter((n) => n.isNew).length;
  return (
    <div className={`app-layout ${sidebarCollapsed ? "sidebar-collapsed" : ""}`} style={{ zoom: zoom / 100 }}>
      {mobileMenu && (
        <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMobileMenu(false)} />
      )}
      <aside className={mobileMenu ? "sidebar sidebar-open" : "sidebar"}>
        <div className="sidebar-brand">
          <ClipboardList size={28} />
          <span>WorkTrack Solutions</span>
          <button className="close-menu" onClick={() => { setMobileMenu(false); setSidebarCollapsed(true); }} aria-label="Close menu"><X size={20} /></button>
        </div>
        <p className="menu-label">{isAdmin ? "ADMIN WORKSPACE" : "EMPLOYEE WORKSPACE"}</p>
        {menuItems.map((item) => {
          const icons = {
            Dashboard: LayoutDashboard,
            Employees: Users,
            ChatBox: MessageCircle,
            Approvals: ShieldCheck,
            Tasks: ClipboardList,
            "My Tasks": ClipboardList,
            Attendance: Clock3,
            "Time-Sheet": FileClock,
            "Time-Sheet Approvals": FileClock,
            Report: FileBarChart,
            "Leave Requests": CalendarDays,
            "Ticket Requests": Headset,
            "My Leaves": CalendarDays,
            "Common Holidays": CalendarDays,
            "My Info": UserRound,
            "Support Hub": Headset,
          };
          const Icon = icons[item] || BriefcaseBusiness;
          return (
            <button
              key={item}
              className={section === item ? "nav-item active" : "nav-item"}
              onClick={() => { setSection(item); setMessage(""); setMobileMenu(false); }}
            >
              <Icon size={18} /> {isAdmin && item === "Attendance" ? "Attendance System" : item}
              {isAdmin && item === "ChatBox" && employees.some((employee) => employee.employeeId && readStore(`wt_employee_admin_chat_${String(employee.employeeId || employee.email || "employee").replace(/[^a-zA-Z0-9_-]/g, "_")}`, []).some((chatMessage) => chatMessage.from === "Employee" && !chatMessage.readByAdmin)) && <span className="nav-notification-dot" title="Unread employee chat messages" aria-label="Unread chat messages" />}
              {item === "Approvals" && (pendingEmployeeApprovalCount > 0 || rejectedEmployeeApprovalCount > 0) && <span className="nav-notification-dot" title={`Pending: ${pendingEmployeeApprovalCount}; Rejected: ${rejectedEmployeeApprovalCount}`} aria-label="Approval notifications" />}
              {item === "Leave Requests" && pendingLeaveCount > 0 && <span className="nav-notification-dot" title={`${pendingLeaveCount} pending leave request(s)`} aria-label="Pending leave notifications" />}
              {item === "Time-Sheet Approvals" && pendingTimesheetCount > 0 && <span className="nav-notification-dot" title={`${pendingTimesheetCount} timesheet(s) awaiting approval`} aria-label="Pending timesheet notifications" />}
              {!isAdmin && item === "Support Hub" && (() => {
                const ownTickets = ticketNavRecords.filter((ticket) => !ticket.employeeId || ticket.employeeId === currentUser?.employeeId);
                const pendingTickets = ownTickets.filter((ticket) => ["pending", "pending for approval", "pending approval"].includes(String(ticket.status || "").trim().toLowerCase())).length;
                const reportTickets = ownTickets.filter((ticket) => ["opened", "open", "in progress", "on hold", "resolved"].includes(String(ticket.status || "").trim().toLowerCase())).length;
                const unreadAdminComments = ownTickets.some((ticket) => (ticket.replies || []).some((reply) => reply.from === "Admin" && !reply.readByEmployee));
                const ownChat = readStore(`wt_employee_admin_chat_${String(currentUser?.employeeId || currentUser?.email || "employee").replace(/[^a-zA-Z0-9_-]/g, "_")}`, []);
                const unreadAdminChat = ownChat.some((chatMessage) => chatMessage.from === "Admin" && !chatMessage.readByEmployee);
                void chatNotificationRevision;
                return pendingTickets > 0 || reportTickets > 0 || unreadAdminComments || unreadAdminChat;
              })() && <span className="nav-notification-dot" title="Pending tickets, report records, or unread admin comments" aria-label="Support Hub notifications" />}
              {item === "Ticket Requests" && ticketNavRecords.some((ticket) => {
                const hasActiveTicket = String(ticket.status || "Pending for Approval").trim().toLowerCase() !== "closed";
                const hasUnreadEmployeeComment = (ticket.replies || []).some((reply) => reply.from !== "Admin" && !reply.readByAdmin);
                return hasActiveTicket || hasUnreadEmployeeComment;
              }) && <span className="nav-notification-dot" title="Active tickets or unread employee comments" aria-label="Ticket notifications" />}
              {((isAdmin && item === "Tasks" && (deadlineTaskCount > 0 || completedTaskCount > 0)) || (!isAdmin && item === "My Tasks" && (employeePendingTasks.length > 0 || employeeRejectedTaskCount > 0 || employeeTaskDeadlineCount > 0))) && <span className="nav-notification-dot" title={isAdmin ? `Deadlines: ${deadlineTaskCount}; Completed: ${completedTaskCount}` : "Pending, rejected, or deadline tasks need attention"} aria-label="Task notifications" />}
            </button>
          );
        })}
      </aside>
      <main className="main-area">
        <header className="topbar worktrack-topbar">
          <button className="topbar-menu-btn" aria-label="Toggle sidebar" aria-expanded={!sidebarCollapsed} onClick={() => { setSidebarCollapsed((value) => !value); setMobileMenu((value) => !value); }}><Menu size={21} /></button>
          <form className="application-search" onSubmit={(e) => { e.preventDefault(); goToSearchResult(); }}>
            <Search size={17} /><input value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} placeholder="Search" aria-label="Search" /><button type="submit">Search</button>
          </form>
          <div className="global-tools">
            <button title="Decrease display size" onClick={() => setZoom((z) => Math.max(80, z - 10))}>A−</button><button title="Normal display" onClick={() => setZoom(100)}>A</button><button title="Increase display size" onClick={() => setZoom((z) => Math.min(120, z + 10))}>A+</button>
            <div className="header-popover-wrap notification-bell-wrap"><button className={unreadVisibleNotificationCount > 0 ? "notification-bell has-unread" : "notification-bell"} title="Notifications" aria-label={`Notifications${unreadVisibleNotificationCount ? `, ${unreadVisibleNotificationCount} unread` : ""}`} onClick={() => { const opening = !notificationsOpen; setNotificationsOpen(opening); if (opening) { const visibleIds = new Set(visibleNotificationItems.map((n) => n.id)); const updated = readStore("wt_notifications", []).map((n) => visibleIds.has(n.id) ? { ...n, isNew: false } : n); saveStore("wt_notifications", updated); setNotificationItems(updated); } }}><Bell size={18}/>{unreadVisibleNotificationCount > 0 && <span className="notification-count">{unreadVisibleNotificationCount > 99 ? "99+" : unreadVisibleNotificationCount}</span>}</button>{notificationsOpen && <div className="header-popover notification-popover"><strong>Notifications</strong>{visibleNotificationItems.length ? visibleNotificationItems.map((n, i) => <div className="notification-item" key={n.id || i}>{n.isNew && <span className="notification-new-badge"><CircleAlert size={13}/> New</span>}<b>{n.title || "Employee request"}</b><span>{n.message || n.text}</span>{n.createdAt && <small>{formatDate(n.createdAt)}</small>}</div>) : <p className="notification-empty">No new employee requests.</p>}</div>}</div>
            <div className="header-popover-wrap"><button className={`profile-trigger ${isAdmin ? "admin-profile-trigger" : "employee-profile-trigger"}`} onClick={() => setProfileMenuOpen(!profileMenuOpen)} aria-label="Open profile menu"><span className="avatar">{currentUser?.photo ? <img src={currentUser.photo} alt="Profile" /> : (currentUser?.name || "U").charAt(0).toUpperCase()}</span></button>{profileMenuOpen && <div className={`header-popover profile-dropdown ${!isAdmin ? "employee-profile-dropdown" : ""}`}>{isAdmin && <div className="admin-profile-summary"><strong>{currentUser?.name || "Administrator"}</strong><span>{getAdminCredentials().username || currentUser?.email || "Admin"}</span><small>WorkTrack Solutions</small></div>}{!isAdmin && <div className="employee-profile-summary"><strong>{currentUser?.name || "Employee"}</strong><span>{currentUser?.employeeId || "No employee ID"}</span><small>WorkTrack Solutions</small></div>}{isAdmin && <button onClick={() => { setSection("Change Username"); setAdminCurrentUsername(""); setAdminNewUsername(""); setProfileMenuOpen(false); setMessage(""); }}>Change Username</button>}{isAdmin && <button onClick={() => { setSection("Admin Change Password"); setAdminCurrentPassword(""); setAdminNewPassword(""); setAdminConfirmPassword(""); setProfileMenuOpen(false); setMessage(""); }}>Change Password</button>}{!isAdmin && <button onClick={() => { setSection("My Profile"); setProfileMenuOpen(false); setMessage(""); }}>My Profile</button>}{!isAdmin && <button onClick={() => { setSection("Change Password"); setPasswordPanelOpen(true); setProfileMenuOpen(false); setMessage(""); }}>Change Password</button>}<button onClick={() => { setProfileMenuOpen(false); logout(); }}>Log out</button></div>}</div>
          </div>
        </header>
        <div className="page-content">
          <div className="body-page-title"><p className="breadcrumb">WORKTRACK SOLUTION / {section.toUpperCase()}</p><h2>{section}</h2></div>
          {attendanceReminderOpen && page === "employee" && !isWeekend(new Date()) && (
            <div className="attendance-reminder-backdrop" role="presentation">
              <section className="attendance-reminder-card" role="dialog" aria-modal="true" aria-labelledby="attendance-reminder-title">
                <div className="attendance-reminder-icon"><CalendarCheck2 size={30} /></div>
                <h3 id="attendance-reminder-title">Attendance</h3>
                <p>Mark your attendance for today.</p>
                <button type="button" className="primary-small" onClick={() => { setAttendanceReminderOpen(false); setSection("Attendance"); }}>Click here</button>
                <button type="button" className="attendance-reminder-dismiss" onClick={() => setAttendanceReminderOpen(false)}>Remind me later</button>
              </section>
            </div>
          )}
          {message && (
            <div className="success-message" role="status">
              <CheckCircle2 size={17} /> {message}
              <button onClick={() => setMessage("")}>×</button>
            </div>
          )}
          {section === "Dashboard" && (
            <>
              <section className="welcome-panel">
                <div>
                  <span>YOUR WORKSPACE OVERVIEW</span>
                  <h1>Hello, {currentUser?.name || "Sharon Samson M J"}!</h1>
                  <p>{isAdmin ? "Here's what's happening across your team." : "Keep track of your work and make today productive."}</p>
                </div>
                <BriefcaseBusiness size={58} />
              </section>
              {isAdmin ? (
                <section className="stats-grid admin-dashboard-stats">
                  <StatCard icon={<ClipboardList />} label="Task Assigned" value={tasks.filter((task) => !["completed", "approved"].includes(String(task.status || "").trim().toLowerCase())).length} color="purple" />
                  <button type="button" className="dashboard-stat-button" onClick={() => { setLeaveTabTarget("Pending"); setSection("Leave Requests"); }} aria-label="View pending leave requests">
                    <StatCard icon={<CalendarDays />} label="Pending Leaves" value={leaves.filter((leave) => String(leave.status || "Pending").toLowerCase() === "pending").length} color="orange" />
                  </button>
                  <button type="button" className="dashboard-stat-button" onClick={() => { setAdminTaskTab("Deadline"); setSection("Tasks"); }} aria-label="View task deadlines">
                    <StatCard icon={<CalendarClock />} label="Task Deadlines" value={dashboardTaskDeadlines} color="blue" />
                  </button>
                  <button type="button" className="dashboard-stat-button" onClick={() => { setAttendanceTabTarget("Attendance Not Marked"); setSection("Attendance"); }} aria-label="View employees with attendance not marked">
                    <StatCard icon={<Clock3 />} label="Attendance Not Marked" value={dashboardAttendanceNotMarked} color="orange" />
                  </button>
                </section>
              ) : (
                <section className="stats-grid employee-stats-grid">
                  <button type="button" className="dashboard-stat-button" onClick={() => { setSection("My Tasks"); setEmployeeTaskTab("Pending Tasks"); setMessage(""); }} aria-label="View pending, rejected, and deadline tasks"><StatCard icon={<ClipboardList />} label="Task Assigned" value={employeeOutstandingTaskCount} color="purple" /></button>
                  <StatCard icon={<CheckCircle2 />} label="Completed Tasks" value={completedTasks} color="green" />
                  <button type="button" className="dashboard-stat-button" onClick={() => { setSection("My Leaves"); setEmployeeLeaveTab("All"); setMessage(""); }} aria-label="View my leave requests"><StatCard icon={<CalendarDays />} label="My Leave Requests" value={myLeaveRequests.length} color="orange" /></button>
                  <button type="button" className="dashboard-stat-button" onClick={() => { setSection("My Tasks"); setEmployeeTaskTab("Deadline"); setMessage(""); }} aria-label="View task deadlines"><StatCard icon={<CalendarClock />} label="Task Deadline" value={employeeTaskDeadlineCount} color="blue" /></button>
                  <button type="button" className="dashboard-stat-button" onClick={() => { setSection("My Tasks"); setEmployeeTaskTab("Rejected Task"); setMessage(""); }} aria-label="View rejected tasks"><StatCard icon={<ClipboardList />} label="Rejected Tasks" value={employeeRejectedTaskCount} color="orange" /></button>
                </section>
              )}
              <section className="dashboard-two-column">
                <div className="dashboard-widget">
                  <div className="dashboard-widget-title announcements-title">Announcements</div>
                  <div className="dashboard-widget-content">
                    {isAdmin && (
                      <form className="announcement-compose" onSubmit={(e) => {
                        e.preventDefault();
                        const title = announcementTitle.trim();
                        const messageText = announcementMessage.trim();
                        if (!title || !messageText) return;
                        const existing = readStore("wt_notifications", []);
                        const announcement = { id: `ANN-${Date.now()}`, kind: "announcement", title, message: messageText, attachmentName: announcementAttachment?.name || "", attachmentData: announcementAttachment?.data || "", createdAt: new Date().toISOString() };
                        const next = [announcement, ...existing];
                        saveStore("wt_notifications", next);
                        setNotificationItems(next);
                        setAnnouncementTitle("");
                        setAnnouncementMessage("");
                        setAnnouncementAttachment(null);
                        setMessage("Announcement published.");
                      }}>
                        <input value={announcementTitle} onChange={(e) => setAnnouncementTitle(e.target.value)} placeholder="Announcement title" aria-label="Announcement title" required />
                        <textarea value={announcementMessage} onChange={(e) => setAnnouncementMessage(e.target.value)} placeholder="Write an announcement for employees..." aria-label="Announcement message" rows={2} required />
                        <label className="announcement-attachment-input">Attach image or file<input type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) { setAnnouncementAttachment(null); return; }
                          const reader = new FileReader();
                          reader.onload = () => setAnnouncementAttachment({ name: file.name, data: String(reader.result || "") });
                          reader.readAsDataURL(file);
                        }} /></label>
                        {announcementAttachment?.name && <small className="announcement-attachment-selected">Selected: {announcementAttachment.name}</small>}
                        <button className="primary-small" type="submit">Publish announcement</button>
                      </form>
                    )}
                    {readStore("wt_notifications", []).filter((item) => (item.kind === "announcement" || String(item.id || "").startsWith("ANN-")) && (item.title || item.message || item.text) && (!item.employeeId || item.employeeId === currentUser?.employeeId)).length ? (
                      readStore("wt_notifications", []).filter((item) => (item.kind === "announcement" || String(item.id || "").startsWith("ANN-")) && (item.title || item.message || item.text) && (!item.employeeId || item.employeeId === currentUser?.employeeId)).map((item, index) => (
                        <div className="announcement-item" key={item.id || index}>
                          {isAdmin && <button type="button" className="announcement-delete-button" title="Delete announcement" aria-label={`Delete announcement ${item.title || "announcement"}`} onClick={() => {
                            const next = readStore("wt_notifications", []).filter((notice) => notice.id !== item.id);
                            saveStore("wt_notifications", next);
                            setNotificationItems(next);
                            setMessage("Announcement deleted.");
                          }}>Delete</button>}
                          <div className="announcement-card-layout">
                            {item.attachmentData && <div className="announcement-card-media">{String(item.attachmentData).startsWith("data:image/") ? <a className="announcement-attachment-link" href={item.attachmentData} target="_blank" rel="noreferrer"><img className="announcement-attachment-image" src={item.attachmentData} alt={item.attachmentName || "Announcement attachment"} /></a> : <a className="announcement-attachment-link" href={item.attachmentData} download={item.attachmentName || "announcement-attachment"}><Paperclip size={15} /> {item.attachmentName || "View attachment"}</a>}</div>}
                            <div className="announcement-card-copy"><strong>{item.title || "Announcement from Admin"}</strong><p>{item.message || item.text}</p></div>
                          </div>
                        </div>
                      ))
                    ) : null}
                  </div>
                </div>
                <div className="dashboard-widget">
                  <div className="dashboard-widget-title recent-title">Recently Visited</div>
                  <div className="dashboard-widget-content recent-items">
                    {readStore("wt_recentlyVisited", []).filter((item) => item && item !== "Dashboard").length ? (
                      readStore("wt_recentlyVisited", []).filter((item) => item && item !== "Dashboard").slice(0, 5).map((item) => (
                        <button type="button" key={item} onClick={() => setSection(item)}>{item}<span>↗</span></button>
                      ))
                    ) : <p className="dashboard-empty">No recently visited apps.</p>}
                  </div>
                </div>
              </section>
              <section className={`dashboard-info-grid ${isAdmin ? "admin-dashboard-info-grid" : ""}`}>
                {!isAdmin && <div className="dashboard-info-card">
                  <div className="dashboard-info-icon attendance-icon"><CalendarCheck2 size={24} /></div>
                  <span>Attendance</span>
                  <strong>{employeeAttendanceLabel}</strong>
                  <small>{todayAttendanceRecord?.checkIn ? `Check-in: ${todayAttendanceRecord.checkIn}` : employeeAttendanceLabel === "Attendance Not Marked" ? "Not yet check-in" : employeeAttendanceLabel === "Attendance not started yet" ? `Batch starts at ${formatMinuteRange(employeeBatchWindow[0], employeeBatchWindow[1]).split(" - ")[0]}` : employeeAttendanceLabel === "Holiday" ? "Weekly holiday" : "Not yet check-in"}</small>
                </div>}
                <button type="button" className="dashboard-info-card actionable-card" onClick={() => setSection("Actionable")}>
                  <div className="dashboard-info-icon actionable-icon"><ClipboardCheck size={24} /></div>
                  <span>Actionable</span>
                  <strong>{isAdmin ? tasks.filter((task) => task.actionable && task.status !== "Approved" && task.status !== "Completed").length : myTasks.filter((task) => task.actionable && task.status !== "Approved" && task.status !== "Completed").length}</strong>
                  <small>{isAdmin ? "Overdue employee task record(s)" : "Your overdue task record(s)"}</small>
                </button>
                {isAdmin ? <button type="button" className="dashboard-info-card rejected-tasks-card" onClick={() => setSection("Rejected Tasks")}>
                  <div className="dashboard-info-icon rejected-icon"><ClipboardList size={24} /></div>
                  <span>Rejected Tasks</span>
                  <strong>{tasks.filter((task) => String(task.status || "").toLowerCase() === "rejected").length}</strong>
                  <small>Click here to view</small>
                </button> : null}
                {!isAdmin && <div className="dashboard-info-card monthly-attendance-card">
                  <div className="dashboard-info-icon attendance-icon"><CalendarCheck2 size={24} /></div>
                  <span>Monthly Attendance</span>
                  <strong>{employeeMonthlyAttendanceDays} day(s) marked</strong>
                  <small>{dashboardNow.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</small>
                </div>}
                {isAdmin && <button type="button" className="dashboard-info-card ticket-requests-info-card" onClick={() => { setTicketRequestsInitialTab("Pending Tickets"); setSection("Ticket Requests"); setMessage(""); }}>
                  <div className="dashboard-info-icon ticket-requests-icon"><Headset size={24} /></div>
                  <span>Ticket Requests</span>
                  <strong>{dashboardPendingTickets}</strong>
                  <small>Pending ticket request(s) · Click here to view</small>
                </button>}
                <div className="dashboard-info-card">
                  <div className="dashboard-info-icon holidays-icon"><PartyPopper size={24} /></div>
                  <span>Upcoming Holidays</span>
                  <strong>{upcomingHoliday ? upcomingHoliday.name : "No upcoming holidays"}</strong>
                  <small>{upcomingHoliday ? `${formatDate(upcomingHoliday.date)}${daysUntilUpcomingHoliday === 0 ? " · Today" : ` · In ${daysUntilUpcomingHoliday} day(s)`}` : "No upcoming holiday dates are available."}</small>
                </div>
              </section>
            </>
          )}
          {section === "Ticket Requests" && isAdmin && <AdminTicketRequests initialTab={ticketRequestsInitialTab} />}
          {section === "Approvals" && isAdmin && (
            <section className="panel">
              <div className="panel-heading approvals-heading">
                <div><h3>Employee Account Requests</h3></div>
                <div className="approvals-heading-tools">
                  <div className="approvals-search-wrap">
                    <input
                      value={approvalSearch}
                      onChange={(event) => setApprovalSearch(event.target.value)}
                      placeholder="Search"
                      aria-label="Search employee account requests"
                    />
                  </div>
                  <span className="count-chip">{employees.filter((employee) => employee.status === (approvalTab === "Pending" ? "Pending Approval" : "Rejected")).length} {approvalTab === "Pending" ? "pending" : "rejected"}</span>
                </div>
              </div>
              <div className="approval-tabs" role="tablist" aria-label="Signup request status">
                <button type="button" role="tab" aria-selected={approvalTab === "Pending"} className={approvalTab === "Pending" ? "active" : ""} onClick={() => { setApprovalTab("Pending"); setApprovalSearch(""); }}>Pending ({pendingEmployeeApprovalCount})</button>
                <button type="button" role="tab" aria-selected={approvalTab === "Rejected"} className={approvalTab === "Rejected" ? "active" : ""} onClick={() => { setApprovalTab("Rejected"); setApprovalSearch(""); }}>Rejected ({rejectedEmployeeApprovalCount})</button>
              </div>
              <ApprovalTable
                rejected={approvalTab === "Rejected"}
                employees={employees.filter((employee) => {
                  if (employee.status !== (approvalTab === "Pending" ? "Pending Approval" : "Rejected")) return false;
                  const query = approvalSearch.trim().toLowerCase();
                  if (!query) return true;
                  return [employee.name, employee.dob, employee.email, employee.mobile, employee.role, employee.joiningCode]
                    .some((value) => String(value ?? "").toLowerCase().includes(query));
                })}
                onApprove={approveEmployee}
                onReject={rejectEmployee}
                onDelete={deleteRejectedEmployee}
              />
            </section>
          )}
          {section === "ChatBox" && isAdmin && (
            <AdminChatCenter employees={employees.filter((employee) => employee.employeeId)} initialEmployeeId={chatTargetEmployeeId} onInitialEmployeeOpened={() => setChatTargetEmployeeId("")} />
          )}
          {section === "Employees" && isAdmin && (
            <section className="panel">
              <div className="panel-heading">
                <div><h3>Employee Directory</h3></div>
                <span className="count-chip">{employees.filter((employee) => employee.employeeId).length} employees</span>
              </div>
              <SearchBar value={search} onChange={setSearch} placeholder="Search" />
              <EmployeeTable employees={filteredEmployees.filter((employee) => employee.employeeId)} onToggle={toggleEmployee} onDelete={(employeeId) => updateEmployees(employees.filter((employee) => employee.employeeId !== employeeId))} onOpenChat={(employee) => { setChatTargetEmployeeId(employee.employeeId); setSection("ChatBox"); setMessage(""); setMobileMenu(false); }} />
            </section>
          )}
          {section === "Rejected Tasks" && isAdmin && (
            <section className="panel">
              <div className="panel-heading">
                <div><h3>Rejected Tasks</h3></div>
                <span className="count-chip">{tasks.filter((task) => String(task.status || "").toLowerCase() === "rejected").length} rejected</span>
              </div>
              <TaskTable tasks={tasks.filter((task) => String(task.status || "").toLowerCase() === "rejected")} employees={employees} admin onUpdate={updateTask} emptyText="No rejected tasks found." />
            </section>
          )}
          {section === "Tasks" && isAdmin && (
            <section className="panel">
              <div className="panel-heading">
                <div><h3>Task Management</h3></div>
                <button className="primary-small" onClick={() => { setShowTaskForm(!showTaskForm); if (!showTaskForm) { setTaskEmployeeSearch(""); setTaskForm((previous) => ({ ...previous, employeeId: "" })); } }}><Plus size={17} /> Assign task</button>
              </div>
              {showTaskForm && (
                <form className="form-panel" onSubmit={addTask}>
                  <h4>Create a new task</h4>
                  <div className="form-grid">
                    <div className="field"><label>Task title</label><input value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} required /></div>
                    <div className="field">
                      <label>Assign employee</label>
                      <input
                        type="text"
                        list="task-employee-options"
                        placeholder="Search Employee"
                        value={taskEmployeeSearch}
                        onChange={(e) => {
                          const value = e.target.value;
                          const activeEmployees = employees.filter((employee) => employee.status === "Active" && employee.employeeId);
                          const selectedEmployee = activeEmployees.find((employee) => `${employee.name} (${employee.employeeId})`.toLowerCase() === value.trim().toLowerCase());
                          setTaskEmployeeSearch(value);
                          setTaskForm({ ...taskForm, employeeId: selectedEmployee ? selectedEmployee.employeeId : "" });
                        }}
                        required
                        aria-label="Search employee by name or employee ID"
                      />
                      <datalist id="task-employee-options">
                        {employees.filter((employee) => employee.status === "Active" && employee.employeeId).map((employee) => (
                          <option key={employee.employeeId} value={`${employee.name} (${employee.employeeId})`} />
                        ))}
                      </datalist>
                    </div>
                    <div className="field"><label>Deadline</label><input type="date" min={new Date().toISOString().slice(0, 10)} value={taskForm.deadline} onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })} required /></div>
                    <div className="field"><label>Description</label><input value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} /></div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="secondary-btn" onClick={() => setShowTaskForm(false)}>Cancel</button>
                    <button type="submit" className="primary-small">Assign task</button>
                  </div>
                </form>
              )}
              <div className="admin-task-tools">
                <div className="approval-tabs" role="tablist" aria-label="Task category">
                  {['All', 'Completed', 'Deadline'].map((tab) => <button type="button" role="tab" aria-selected={adminTaskTab === tab} className={adminTaskTab === tab ? "active" : ""} key={tab} onClick={() => setAdminTaskTab(tab)}>{tab}{tab === 'Completed' ? ` (${completedTaskCount})` : tab === 'Deadline' ? ` (${deadlineTaskCount})` : ''}</button>)}
                </div>
                <SearchBar value={adminTaskSearch} onChange={setAdminTaskSearch} placeholder="Search" />
              </div>
              <TaskTable
                tasks={tasks.filter((task) => {
                  const employee = employees.find((item) => item.employeeId === task.employeeId);
                  const query = adminTaskSearch.trim().toLowerCase();
                  const matchesSearch = !query || [employee?.name, task.employeeName, task.employeeId].some((value) => String(value || "").toLowerCase().includes(query));
                  const completed = isTaskSubmittedOnTime(task);
                  const overdue = isTaskLateOrOverdue(task);
                  const matchesTab = adminTaskTab === "All" || (adminTaskTab === "Completed" ? completed : overdue);
                  return matchesSearch && matchesTab;
                })}
                employees={employees} admin onUpdate={updateTask}
                emptyText={adminTaskTab === "Completed" ? "No tasks completed before the deadline." : adminTaskTab === "Deadline" ? "No overdue tasks found." : "No tasks found."}
              />
            </section>
          )}
          {section === "My Tasks" && !isAdmin && (
            <section className="panel employee-my-tasks-panel">
              <div className="panel-heading"><div><h3>My Tasks</h3></div><SearchBar value={employeeTaskSearch} onChange={setEmployeeTaskSearch} placeholder="Search" /></div>
              <div className="approval-tabs employee-task-tabs" role="tablist" aria-label="My task status">
                {["All", "Pending Tasks", "Rejected Task", "Deadline"].map((tab) => <button type="button" role="tab" aria-selected={employeeTaskTab === tab} className={employeeTaskTab === tab ? "active" : ""} key={tab} onClick={() => setEmployeeTaskTab(tab)}>{tab}{tab === "Pending Tasks" ? ` (${employeePendingTasks.length})` : tab === "Rejected Task" ? ` (${myTasks.filter((task) => String(task.status || "").toLowerCase() === "rejected").length})` : tab === "Deadline" ? ` (${employeeTaskDeadlineCount})` : ""}</button>)}
              </div>
              <TaskTable tasks={myTasks.filter((task) => {
                const status = String(task.status || "pending").trim().toLowerCase();
                const late = isTaskLateOrOverdue(task);
                const matchesTab = employeeTaskTab === "All" || (employeeTaskTab === "Pending Tasks" ? !["submitted", "approved", "completed", "rejected"].includes(status) && !late : employeeTaskTab === "Rejected Task" ? status === "rejected" : late && status !== "rejected");
                const query = employeeTaskSearch.trim().toLowerCase();
                const searchable = `${task.title || ""} ${task.description || ""} ${task.deadline || ""} ${task.status || ""} ${task.employeeId || ""}`.toLowerCase();
                return matchesTab && (!query || searchable.includes(query));
              })} onUpdate={updateTask} emptyText={employeeTaskTab === "Pending Tasks" ? "No pending tasks right now." : employeeTaskTab === "Rejected Task" ? "No rejected tasks." : employeeTaskTab === "Deadline" ? "No deadline tasks." : "No tasks assigned yet."} />
            </section>
          )}
          {section === "Actionable" && (
            <section className="panel">
              <div className="panel-heading"><div><h3>Actionable tasks</h3><p>{isAdmin ? "Employees who missed their assigned task deadline." : "Tasks that passed their deadline without submission."}</p></div></div>
              <TaskTable tasks={(isAdmin ? tasks : myTasks).filter((task) => task.actionable && task.status !== "Approved" && task.status !== "Completed")} employees={employees} admin={isAdmin} onUpdate={updateTask} emptyText={isAdmin ? "No overdue employee tasks are actionable." : "No overdue tasks. You are up to date."} />
            </section>
          )}
          {section === "Time-Sheet" && !isAdmin && (
            <section className="panel timesheet-panel">
              <div className="timesheet-toolbar">
                <div className="timesheet-current"><strong>Current Week</strong><span>{formatTimesheetWeekRange(new Date())}</span><small>Week {getWeekIndex(new Date()) + 1} of {new Date().toLocaleString("en-IN", { month: "long" })} {new Date().getFullYear()}</small></div>
                <div className="timesheet-week-picker"><label htmlFor="timesheet-week-select">View week</label><select id="timesheet-week-select" value={getLocalDateKey(getSundayWeekStart(timesheetAnchorDate))} onChange={(event) => { const nextDate = event.target.value; if (!nextDate) return; setTimesheetSelectedDate(nextDate); const nextAnchor = new Date(`${nextDate}T12:00:00`); const nextStartKey = getLocalDateKey(getSundayWeekStart(nextAnchor)); const nextLegacyKey = `${nextAnchor.getFullYear()}-${nextAnchor.getMonth()}-${getWeekIndex(nextAnchor)}`; const record = timesheets.find(item => item.employeeId === currentUser?.employeeId && (item.weekStartDate === nextStartKey || item.periodKey === nextLegacyKey)); setTimesheetRows(record?.rows?.length ? record.rows : [{ activity: "", shift: "", dayTypes: Array(7).fill(""), hours: Array(7).fill(""), remarks: "", fileName: "" }]); setMessage(""); }}>{getTimesheetWeekOptions(new Date()).map((week) => <option key={week.value} value={week.value}>{week.label}</option>)}</select><label htmlFor="timesheet-year-select" className="timesheet-year-label">Year</label><select id="timesheet-year-select" value={timesheetYear} onChange={(event) => { const yearStart = getSundayWeekStart(new Date(Number(event.target.value), 0, 1)); const nextDate = getLocalDateKey(yearStart); setTimesheetSelectedDate(nextDate); const nextAnchor = new Date(`${nextDate}T12:00:00`); const nextStartKey = getLocalDateKey(getSundayWeekStart(nextAnchor)); const nextLegacyKey = `${nextAnchor.getFullYear()}-${nextAnchor.getMonth()}-${getWeekIndex(nextAnchor)}`; const record = timesheets.find(item => item.employeeId === currentUser?.employeeId && (item.weekStartDate === nextStartKey || item.periodKey === nextLegacyKey)); setTimesheetRows(record?.rows?.length ? record.rows : [{ activity: "", shift: "", dayTypes: Array(7).fill(""), hours: Array(7).fill(""), remarks: "", fileName: "" }]); setMessage(""); }}>{Array.from({ length: 7 }, (_, index) => new Date().getFullYear() - 3 + index).map((year) => <option key={year} value={year}>{year}</option>)}</select></div>
                <div className="timesheet-legend">
                  <span><i className="day-work" />Work Day</span><span><i className="day-off" />Weekly Off</span><span><i className="day-full-leave" />Full-Day Leave</span><span><i className="day-holiday" />Holiday</span><span><i className="day-half-leave" />Half-Day Leave</span>
                </div>
              </div>
              {(() => {
                const start = getSundayWeekStart(timesheetAnchorDate);
                const weekStartKey = getLocalDateKey(start);
                const legacyKey = `${timesheetYear}-${timesheetMonth}-${timesheetWeek}`;
                const saved = timesheets.find(item => item.employeeId === currentUser?.employeeId && (item.weekStartDate === weekStartKey || item.periodKey === legacyKey));
                const currentWeekKey = getLocalDateKey(getSundayWeekStart(new Date()));
                const isCurrentWeek = weekStartKey === currentWeekKey;
                const isFutureWeek = weekStartKey > currentWeekKey;
                const canEditWeek = isCurrentWeek && saved?.status !== "Approved" && saved?.status !== "Pending";
                const days = Array.from({length:7}, (_, i) => { const d=new Date(start); d.setDate(start.getDate()+i); return d; });
                const updateRow = (index, changes) => setTimesheetRows(prev => prev.map((r,i) => i===index ? {...r,...changes} : r));
                const updateDayValue = (index, field, dayIndex, value) => setTimesheetRows(prev => prev.map((row, rowIndex) => {
                  if (rowIndex !== index) return row;
                  const values = [...(row[field] || Array(7).fill(""))];
                  values[dayIndex] = value;
                  return { ...row, [field]: values };
                }));
                const handleDayFile = (index, dayIndex, file) => {
                  if (!file) {
                    updateDayValue(index, "fileNameByDay", dayIndex, "");
                    updateDayValue(index, "fileDataByDay", dayIndex, "");
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => updateDayValue(index, "fileDataByDay", dayIndex, String(reader.result || ""));
                  reader.readAsDataURL(file);
                  updateDayValue(index, "fileNameByDay", dayIndex, file.name);
                };
                const defaultDayType = (date) => (date.getDay() === 0 || date.getDay() === 6) ? "Holiday" : "Work Day";
                return <>
                  <div className="timesheet-meta">
                    <span><b>Employee:</b> {currentUser?.employeeId || "Not assigned"} : {currentUser?.name || currentUser?.fullName || "Employee"}</span>
                    <span><b>Approver:</b> Admin</span>
                    <span><b>Status:</b> {isFutureWeek && !["Pending", "Approved", "Rejected"].includes(saved?.status) ? "Upcoming Timesheet" : saved?.status || (isCurrentWeek ? "Pending with User" : "No Timesheet Submitted")}</span>
                  </div>
                  <form onSubmit={submitTimesheet} id="timesheet-grid" className={!canEditWeek ? "timesheet-readonly" : ""}>
                    <div className="timesheet-grid-scroll"><table className="timesheet-grid">
                      <thead><tr><th>Batch / Shift</th>{days.map(d=><th key={d.toISOString()}>{d.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}<small>{d.toLocaleDateString("en-IN",{weekday:"long"})}</small></th>)}<th>Actions</th></tr></thead>
                      <tbody>{timesheetRows.map((row,index)=><tr key={index}>
                        <td className="timesheet-activity-cell"><div className="timesheet-batch-value"><strong>BATCH</strong><span>{currentUser?.attendanceBatch || "General Batch"}</span></div></td>
                        {days.map((d,i)=>{ const type=(row.dayTypes || [])[i] || defaultDayType(d); const colors={"Work Day":"day-work-bg","Weekly Off":"day-off-bg","Full-Day Leave":"day-full-leave-bg","Holiday":"day-holiday-bg","Half-Day Leave":"day-half-leave-bg"}; const uploadedName=(row.fileNameByDay || [])[i] || (i===0 ? row.fileName : "") || ""; const uploadedData=(row.fileDataByDay || [])[i] || (i===0 ? row.fileData : "") || ""; return <td key={d.toISOString()} className={`timesheet-day-cell ${colors[type]}`}><label>{d.toLocaleDateString("en-IN",{weekday:"short",day:"2-digit",month:"short"})}</label><textarea aria-label={`Daily activity ${d.toDateString()}`} value={(row.activityByDay || [])[i] ?? (i===0 ? row.activity || "" : "")} disabled={!canEditWeek} onChange={e=>updateDayValue(index,"activityByDay",i,e.target.value)} placeholder="Enter daily activity" rows={3}/><select aria-label={`Day type ${d.toDateString()}`} value={(row.dayTypes || [])[i] || ""} disabled={!canEditWeek} onChange={e=>{const dayTypes=[...(row.dayTypes || Array(7).fill(""))];dayTypes[i]=e.target.value;updateRow(index,{dayTypes});}}><option value="">{defaultDayType(d)}</option><option>Work Day</option><option>Weekly Off</option><option>Full-Day Leave</option><option>Holiday</option><option>Half-Day Leave</option></select><input type="number" min="0" max="24" step="0.5" aria-label={`Hours worked ${d.toDateString()}`} value={(row.hours || [])[i] ?? ""} disabled={!canEditWeek} onChange={e=>{const hours=[...(row.hours || Array(7).fill(""))];hours[i]=e.target.value;updateRow(index,{hours});}} placeholder="Hours"/><textarea aria-label={`Remarks ${d.toDateString()}`} value={(row.remarksByDay || [])[i] ?? (i===0 ? row.remarks || "" : "")} disabled={!canEditWeek} onChange={e=>updateDayValue(index,"remarksByDay",i,e.target.value)} placeholder="Remarks" rows={2}/><label className="timesheet-day-upload"><span>Upload file</span><input type="file" aria-label={`Upload attachment ${d.toDateString()}`} disabled={!canEditWeek} onChange={e=>handleDayFile(index,i,e.target.files?.[0])}/></label>{uploadedName && (uploadedData ? <a className="timesheet-uploaded-file" href={uploadedData} target="_blank" rel="noreferrer">View {uploadedName}</a> : <small>{uploadedName}</small>)}{type==="Half-Day Leave" && <small className="timesheet-day-note">Half-day leave</small>}</td>;})}
                        <td><button type="button" disabled={!canEditWeek} className="table-action" title="Reset row" onClick={()=>updateRow(index,{activity:"",activityByDay:Array(7).fill(""),shift:"",dayTypes:Array(7).fill(""),hours:Array(7).fill(""),remarks:"",remarksByDay:Array(7).fill(""),fileName:"",fileData:"",fileNameByDay:Array(7).fill(""),fileDataByDay:Array(7).fill("")})}>↻</button><button type="button" disabled={!canEditWeek} className="table-action danger" title="Delete row" onClick={()=>setTimesheetRows(prev=>prev.length>1?prev.filter((_,i)=>i!==index):[{activity:"",activityByDay:Array(7).fill(""),shift:"",dayTypes:Array(7).fill(""),hours:Array(7).fill(""),remarks:"",remarksByDay:Array(7).fill(""),fileName:"",fileData:"",fileNameByDay:Array(7).fill(""),fileDataByDay:Array(7).fill("")}])}>⌫</button></td>
                      </tr>)}</tbody>
                    </table></div>
                    {canEditWeek ? <div className="timesheet-footer"><button type="button" className="secondary-btn" onClick={()=>setTimesheetRows(prev=>[...prev,...Array.from({length:5},()=>({activity:"",shift:"",dayTypes:Array(7).fill(""),hours:Array(7).fill(""),remarks:"",fileName:""}))])}>Add 5 New rows</button><div className="form-actions"><button type="button" className="secondary-btn" onClick={()=>saveTimesheetDraft()}>Save</button><button type="submit" className="primary-small">Submit</button></div></div> : <div className="timesheet-locked-message">{saved ? `This week’s timesheet is ${saved.status.toLowerCase()} and is available for viewing only.` : isFutureWeek ? "You are viewing an upcoming timesheet. You cannot fill, save, or submit the timesheet for this week." : "You were not filled the timesheet on this week. No records found."}</div>}{isFutureWeek && canEditWeek && <div className="timesheet-locked-message">You are viewing an upcoming timesheet. You cannot fill, save, or submit the timesheet for this week.</div>}
                  </form>
                  <div className="timesheet-history"><h3>My submitted timesheets</h3><TimesheetTable timesheets={timesheets.filter(item=>item.employeeId===currentUser?.employeeId)} employees={employees} onDelete={deleteTimesheet} /></div>
                </>;
              })()}
            </section>
          )}
          {section === "Time-Sheet Approvals" && isAdmin && (
            <section className="panel timesheet-panel">
              <div className="panel-heading"><div><h3>Timesheet Approvals</h3></div><span className="count-chip">{pendingTimesheetCount} pending</span></div>
              <div className="approval-tabs timesheet-approval-tabs" role="tablist" aria-label="Timesheet approval status">
                <button type="button" role="tab" aria-selected={adminTimesheetTab === "All"} className={adminTimesheetTab === "All" ? "active" : ""} onClick={() => setAdminTimesheetTab("All")}>All</button>
                <button type="button" role="tab" aria-selected={adminTimesheetTab === "Pending"} className={adminTimesheetTab === "Pending" ? "active" : ""} onClick={() => setAdminTimesheetTab("Pending")}>Pending ({pendingTimesheetCount})</button>
              </div>
              <div className="admin-timesheet-search"><SearchBar value={adminTimesheetSearch} onChange={setAdminTimesheetSearch} placeholder="Search" /></div>
              <TimesheetTable timesheets={timesheets.filter((item) => {
                if (adminTimesheetTab === "Pending" && String(item.status || "").toLowerCase() !== "pending") return false;
                const query = adminTimesheetSearch.trim().toLowerCase();
                return !query || [item.employeeName, item.employeeId].some((value) => String(value || "").toLowerCase().includes(query));
              })} employees={employees} admin onStatus={updateTimesheetStatus} />
            </section>
          )}
          {section === "Attendance" && (
            <section className="panel">
              <div className="panel-heading attendance-heading">
                <div className="attendance-heading-copy">
                  <h3>{isAdmin ? "Attendance" : "My attendance"}</h3>
                  {!isAdmin && <p className="attendance-window-note">Your registered batch is applied automatically, Click to mark attendance on working days!</p>}
                </div>
                {isAdmin && <div className="attendance-top-search"><SearchBar value={attendanceSearch} onChange={setAttendanceSearch} placeholder="Search" /></div>}
                {!isAdmin && <div className="attendance-controls">
                  <div className="attendance-actions">
                    <button className="primary-small" onClick={checkIn} disabled={isWeekend(new Date()) || Boolean((currentUser?.attendanceRecords || []).some((record) => record.date === getLocalDateKey(new Date()) && record.checkIn))}><Clock3 size={16} /> Mark attendance</button>
                  </div>
                </div>}
              </div>
              <AttendanceTable
                employees={isAdmin ? employees.filter((employee) => employee.employeeId) : employees.filter((employee) => employee.employeeId === currentUser?.employeeId)}
                isAdmin={isAdmin}
                month={attendanceMonth}
                year={attendanceYear}
                day={attendanceDay}
                onDayChange={setAttendanceDay}
                onMonthChange={(value) => { setAttendanceMonth(value); setAttendanceDay((day) => Math.min(day, new Date(attendanceYear, value + 1, 0).getDate())); }}
                onYearChange={(value) => { setAttendanceYear(value); setAttendanceDay((day) => Math.min(day, new Date(value, attendanceMonth + 1, 0).getDate())); }}
                searchValue={attendanceSearch}
                defaultStatusTab={attendanceTabTarget}
              />
            </section>
          )}
          {section === "Leave Requests" && isAdmin && (
            <section className="panel leaves-page"><div className="leaves-page-heading"><h3>Leave Requests</h3></div><LeaveTable leaves={leaves} admin onStatus={updateLeaveStatus} defaultTab={leaveTabTarget} /></section>
          )}
          {section === "My Leaves" && !isAdmin && (
            <section className="panel leaves-page">
              <div className="leaves-page-heading"><div className="leave-page-tabs" role="tablist" aria-label="Leave pages"><button type="button" className="leave-page-tab active" role="tab" aria-selected="true" onClick={() => setSection("My Leaves")}>My Leaves</button><button type="button" className="leave-page-tab" role="tab" aria-selected="false" onClick={() => setSection("Common Holidays")}>Common Holidays</button></div><button type="button" className="leave-apply-button" onClick={() => { setShowCommonLeaveForm(false); setLeaveForm({ leaveType: "", reason: "", startDate: "", endDate: "", remarks: "", attachmentName: "", attachmentData: "", requestCategory: "" }); setShowLeaveForm(true); }}>Apply Leave</button></div>
              <div className="approval-tabs employee-leave-tabs" role="tablist" aria-label="My leave status">{["All", "Approved", "Pending", "Rejected"].map((tab) => <button type="button" role="tab" aria-selected={employeeLeaveTab === tab} className={employeeLeaveTab === tab ? "active" : ""} key={tab} onClick={() => setEmployeeLeaveTab(tab)}>{tab}{tab === "All" ? ` (${myLeaveRecords.length})` : ` (${myLeaveRecords.filter((leave) => { const status = String(leave.status || "Pending").trim().toLowerCase(); return tab === "Pending" ? ["pending", "pending for approval", "pending approval"].includes(status) : status === tab.toLowerCase(); }).length})`}</button>)}</div>
              <div className="my-leaves-layout">
                <div className="my-leaves-records">
                  <div className="leave-filter-row">
                    <label><span>From Date</span><input type="date" value={leaveFromFilter} onChange={(e) => setLeaveFromFilter(e.target.value)} /></label>
                    <label><span>To Date</span><input type="date" value={leaveToFilter} onChange={(e) => setLeaveToFilter(e.target.value)} /></label>
                    <input aria-label="Search leave records" placeholder="Search" value={leaveSearch} onChange={(e) => setLeaveSearch(e.target.value)} />
                  </div>
                  <LeaveTable leaves={myLeaveRecords.filter((leave) => {
                    const status = String(leave.status || "Pending").trim().toLowerCase();
                    if (employeeLeaveTab !== "All" && !(employeeLeaveTab === "Pending" ? ["pending", "pending for approval", "pending approval"].includes(status) : status === employeeLeaveTab.toLowerCase())) return false;
                    const start = leave.startDate || leave.date || "";
                    const query = leaveSearch.trim().toLowerCase();
                    const matchesFrom = !leaveFromFilter || (leave.endDate || start) >= leaveFromFilter;
                    const matchesTo = !leaveToFilter || start <= leaveToFilter;
                    const haystack = `${leave.docNo || leave.id} ${leave.requestNumber || leave.requestType || ""} ${leave.leaveType || ""} ${leave.status || ""} ${leave.reason || ""}`.toLowerCase();
                    return matchesFrom && matchesTo && (!query || haystack.includes(query));
                  })} />
                </div>
              </div>
              {showLeaveForm && <div className="leave-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setShowLeaveForm(false); setShowCommonLeaveForm(false); } }}>
                <section className="leave-modal" role="dialog" aria-modal="true" aria-labelledby="apply-leave-title">
                  <header className="leave-modal-header"><h3 id="apply-leave-title">{showCommonLeaveForm ? "Apply Common Holiday" : "Apply Leave"}</h3><button type="button" aria-label="Close" onClick={() => { setShowLeaveForm(false); setShowCommonLeaveForm(false); }}>×</button></header>
                  <form onSubmit={submitLeave}>
                    <div className="leave-modal-body">
                      <div className="leave-employee-summary"><div><span>Employee</span><strong>{currentUser?.employeeId} : {currentUser?.name}</strong></div><div><span>Company</span><strong>{"WorkTrack Solutions"}</strong></div></div>
                      <div className="leave-form-layout">
                        <div className="leave-form-fields">
                          {showCommonLeaveForm ? <label className="leave-field"><span>Common Leave Type <b>*</b></span><select value={leaveForm.leaveType} onChange={(e) => { const holiday = getCommonHolidays(commonHolidaysYear).find((item) => item.name === e.target.value); setLeaveForm({ ...leaveForm, leaveType: e.target.value, startDate: holiday?.date || "", endDate: holiday?.date || "", reason: holiday ? `Common holiday: ${holiday.name}` : "" }); }} required><option value="">Select Common Holiday</option>{getCommonHolidays(commonHolidaysYear).map((holiday) => <option key={holiday.name} value={holiday.name}>{holiday.name} — {formatDate(holiday.date)}</option>)}</select></label> : <label className="leave-field"><span>Leave Type <b>*</b></span><select value={leaveForm.leaveType} onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })} required><option value="">Select Leave Type</option><optgroup label="Primary Paid Leaves"><option>Earned Leave</option><option>Casual Leave</option><option>Sick Leave</option></optgroup><optgroup label="Parental and Family Leave"><option>Maternity Leave</option><option>Paternity Leave</option><option>Marriage Leave</option></optgroup><optgroup label="Special and Unpaid Leaves"><option>Compensatory Off (Comp-Off)</option><option>Sabbatical Leave</option><option>Loss of Pay</option></optgroup></select></label>}
                          <label className="leave-field"><span>Start Date <b>*</b></span><input type="date" value={leaveForm.startDate} readOnly={showCommonLeaveForm} onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value, endDate: e.target.value && leaveForm.endDate && leaveForm.endDate < e.target.value ? e.target.value : leaveForm.endDate })} required /></label>
                          <label className="leave-field"><span>End Date <b>*</b></span><input type="date" min={leaveForm.startDate || undefined} value={leaveForm.endDate} readOnly={showCommonLeaveForm} onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })} required /></label>
                          {!showCommonLeaveForm && <label className="leave-field"><span>Reason <b>*</b></span><textarea rows="2" placeholder="Enter reason for leave" value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} required /> </label>}
                          <label className="leave-field"><span>Remarks</span><textarea rows="2" placeholder="Enter remarks (optional)" value={leaveForm.remarks} onChange={(e) => setLeaveForm({ ...leaveForm, remarks: e.target.value })} /></label>
                        </div>
                        <aside className="leave-attachment-panel"><strong>Attachment</strong><label className="leave-upload-box"><input type="file" accept="image/*,.pdf,.doc,.docx" onChange={(e) => handleLeaveAttachment(e.target.files?.[0])} /><span><Plus size={18}/> Browse files</span></label>{leaveForm.attachmentName && <div className="leave-uploaded-file"><span>{leaveForm.attachmentName}</span><button type="button" onClick={() => setLeaveForm({ ...leaveForm, attachmentName: "", attachmentData: "" })} aria-label="Remove attachment">×</button></div>}<p>Optional supporting document or image.</p></aside>
                      </div>
                      {leaveForm.startDate && leaveForm.endDate && leaveForm.endDate >= leaveForm.startDate && <p className="leave-days-preview">Leave duration: {Math.floor((new Date(`${leaveForm.endDate}T00:00:00`) - new Date(`${leaveForm.startDate}T00:00:00`)) / 86400000) + 1} day(s)</p>}
                    </div>
                    <footer className="leave-modal-footer"><button type="button" className="secondary-btn" onClick={() => { setShowLeaveForm(false); setShowCommonLeaveForm(false); }}>Cancel</button><button type="submit" className="leave-apply-button">Submit</button></footer>
                  </form>
                </section>
              </div>}
            </section>
          )}
          {section === "Common Holidays" && !isAdmin && (
            <section className="panel leaves-page common-holidays-page">
              <div className="leaves-page-heading"><div className="leave-page-tabs" role="tablist" aria-label="Leave pages"><button type="button" className="leave-page-tab" role="tab" aria-selected="false" onClick={() => setSection("My Leaves")}>My Leaves</button><button type="button" className="leave-page-tab active" role="tab" aria-selected="true" onClick={() => setSection("Common Holidays")}>Common Holidays</button></div><button type="button" className="leave-apply-button" onClick={() => { setShowCommonLeaveForm(true); setLeaveForm({ leaveType: "", reason: "", startDate: "", endDate: "", remarks: "", attachmentName: "", attachmentData: "", requestCategory: "Common Holiday" }); setShowLeaveForm(true); }}>Common Leave</button></div>
              <div className="common-holidays-page-content">
                <aside className="common-holidays-panel common-holidays-panel-standalone">
                  <div className="common-holidays-heading"><div><h3>Common Holidays</h3></div><select aria-label="Common holidays year" value={commonHolidaysYear} onChange={(e) => setCommonHolidaysYear(Number(e.target.value))}>{Array.from({ length: 7 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => <option key={year} value={year}>{year}</option>)}</select></div>
                  <div className="common-holidays-list">{getCommonHolidays(commonHolidaysYear).map((holiday) => <div className="common-holiday-row" key={`${holiday.name}-${holiday.date}`}><div><strong>{holiday.name}</strong><span>{new Date(`${holiday.date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "long" })}</span></div><time>{formatDate(holiday.date)}</time></div>)}</div>
                </aside>
              </div>
              {showLeaveForm && <div className="leave-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setShowLeaveForm(false); setShowCommonLeaveForm(false); } }}>
                <section className="leave-modal" role="dialog" aria-modal="true" aria-labelledby="apply-common-leave-title">
                  <header className="leave-modal-header"><h3 id="apply-common-leave-title">{showCommonLeaveForm ? "Common Leave" : "Apply Leave"}</h3><button type="button" aria-label="Close" onClick={() => { setShowLeaveForm(false); setShowCommonLeaveForm(false); }}>×</button></header>
                  <form onSubmit={submitLeave}>
                    <div className="leave-modal-body">
                      <div className="leave-employee-summary"><div><span>Employee</span><strong>{currentUser?.employeeId} : {currentUser?.name}</strong></div><div><span>Company</span><strong>{"WorkTrack Solutions"}</strong></div></div>
                      {showCommonLeaveForm ? (
                        <div className="common-holiday-form-fields">
                          <label className="leave-field"><span>Common Holiday <b>*</b></span><select value={leaveForm.leaveType} onChange={(e) => { const holiday = getCommonHolidays(commonHolidaysYear).find((item) => item.name === e.target.value); setLeaveForm({ ...leaveForm, leaveType: e.target.value, startDate: holiday?.date || "", endDate: holiday?.date || "", reason: holiday ? `Common holiday: ${holiday.name}` : "" }); }} required><option value="">Select Common Holiday</option>{getCommonHolidays(commonHolidaysYear).map((holiday) => <option key={holiday.name} value={holiday.name}>{holiday.name} — {formatDate(holiday.date)}</option>)}</select></label>
                          <label className="leave-field"><span>Remarks</span><textarea rows="2" placeholder="Enter remarks (optional)" value={leaveForm.remarks} onChange={(e) => setLeaveForm({ ...leaveForm, remarks: e.target.value })} /></label>
                        </div>
                      ) : (
                        <div className="leave-form-layout"><div className="leave-form-fields">
                          <label className="leave-field"><span>Leave Type <b>*</b></span><select value={leaveForm.leaveType} onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })} required><option value="">Select Leave Type</option><optgroup label="Primary Paid Leaves"><option>Earned Leave</option><option>Casual Leave</option><option>Sick Leave</option></optgroup><optgroup label="Parental and Family Leave"><option>Maternity Leave</option><option>Paternity Leave</option><option>Marriage Leave</option></optgroup><optgroup label="Special and Unpaid Leaves"><option>Compensatory Off (Comp-Off)</option><option>Sabbatical Leave</option><option>Loss of Pay</option></optgroup></select></label>
                          <label className="leave-field"><span>Start Date <b>*</b></span><input type="date" value={leaveForm.startDate} onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value, endDate: e.target.value && leaveForm.endDate && leaveForm.endDate < e.target.value ? e.target.value : leaveForm.endDate })} required /></label>
                          <label className="leave-field"><span>End Date <b>*</b></span><input type="date" min={leaveForm.startDate || undefined} value={leaveForm.endDate} onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })} required /></label>
                          <label className="leave-field"><span>Reason <b>*</b></span><textarea rows="2" placeholder="Enter reason for leave" value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} required /></label>
                          <label className="leave-field"><span>Remarks</span><textarea rows="2" placeholder="Enter remarks (optional)" value={leaveForm.remarks} onChange={(e) => setLeaveForm({ ...leaveForm, remarks: e.target.value })} /></label>
                        </div><aside className="leave-attachment-panel"><strong>Attachment</strong><label className="leave-upload-box"><input type="file" accept="image/*,.pdf,.doc,.docx" onChange={(e) => handleLeaveAttachment(e.target.files?.[0])} /><span><Plus size={18}/> Browse files</span></label>{leaveForm.attachmentName && <div className="leave-uploaded-file"><span>{leaveForm.attachmentName}</span><button type="button" onClick={() => setLeaveForm({ ...leaveForm, attachmentName: "", attachmentData: "" })} aria-label="Remove attachment">×</button></div>}<p>Optional supporting document or image.</p></aside></div>
                      )}
                      {!showCommonLeaveForm && leaveForm.startDate && leaveForm.endDate && leaveForm.endDate >= leaveForm.startDate && <p className="leave-days-preview">Leave duration: {Math.floor((new Date(`${leaveForm.endDate}T00:00:00`) - new Date(`${leaveForm.startDate}T00:00:00`)) / 86400000) + 1} day(s)</p>}
                    </div><footer className="leave-modal-footer"><button type="button" className="secondary-btn" onClick={() => { setShowLeaveForm(false); setShowCommonLeaveForm(false); }}>Cancel</button><button type="submit" className="leave-apply-button">Submit</button></footer>
                  </form>
                </section>
              </div>}
            </section>
          )}
          {section === "Change Username" && isAdmin && (
            <section className="panel profile-panel admin-security-panel">
              <h3>Change Username</h3>
              <p className="muted password-intro">Confirm your current username, then choose a new admin login username.</p>
              <form className="form-panel password-form" onSubmit={saveAdminUsername}>
                <div className="password-grid">
                  <div>
                    <div className="field"><label>Current username</label><div className="password-input"><input type={showAdminCurrentUsername ? "text" : "password"} value={adminCurrentUsername} onChange={(e) => setAdminCurrentUsername(e.target.value)} autoComplete="username" required/><button type="button" aria-label="Show or hide current username" onClick={() => setShowAdminCurrentUsername((v) => !v)}>{showAdminCurrentUsername ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></div>
                    <div className="field"><label>New username</label><div className="password-input"><input type={showAdminNewUsername ? "text" : "password"} value={adminNewUsername} onChange={(e) => setAdminNewUsername(e.target.value)} autoComplete="username" minLength={4} required/><button type="button" aria-label="Show or hide new username" onClick={() => setShowAdminNewUsername((v) => !v)}>{showAdminNewUsername ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></div>
                    <button className="primary-small" type="submit">Change username</button>
                  </div>
                  <aside className="password-tips"><strong>Username tips</strong><p>• Use at least 4 characters</p><p>• Avoid spaces at the beginning or end</p><p>• Choose a username you can remember</p><p>• Use the new username at your next login</p></aside>
                </div>
              </form>
            </section>
          )}
          {section === "Admin Change Password" && isAdmin && (
            <section className="panel profile-panel admin-security-panel">
              <h3>Change Password</h3>
              <p className="muted password-intro">Verify your current admin password before setting a new one.</p>
              <form className="form-panel password-form" onSubmit={saveAdminPassword}>
                <div className="password-grid">
                  <div>
                    <div className="field"><label>Current password</label><div className="password-input"><input type={showAdminCurrentPassword ? "text" : "password"} value={adminCurrentPassword} onChange={(e) => setAdminCurrentPassword(e.target.value)} autoComplete="current-password" required/><button type="button" aria-label="Show or hide current password" onClick={() => setShowAdminCurrentPassword((v) => !v)}>{showAdminCurrentPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></div>
                    <div className="field"><label>New password</label><div className="password-input"><input type={showAdminNewPassword ? "text" : "password"} value={adminNewPassword} onChange={(e) => setAdminNewPassword(e.target.value)} autoComplete="new-password" minLength={6} required/><button type="button" aria-label="Show or hide new password" onClick={() => setShowAdminNewPassword((v) => !v)}>{showAdminNewPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div><small className={`strength strength-${adminPasswordStrength(adminNewPassword).toLowerCase()}`}>Password strength: {adminNewPassword ? adminPasswordStrength(adminNewPassword) : "—"}</small></div>
                    <div className="field"><label>Again new password</label><div className="password-input"><input type={showAdminConfirmPassword ? "text" : "password"} value={adminConfirmPassword} onChange={(e) => setAdminConfirmPassword(e.target.value)} autoComplete="new-password" required/><button type="button" aria-label="Show or hide confirmation password" onClick={() => setShowAdminConfirmPassword((v) => !v)}>{showAdminConfirmPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></div>
                    <button className="primary-small" type="submit">Change password</button>
                  </div>
                  <aside className="password-tips"><strong>Password tips</strong><p>• At least 8 characters is recommended</p><p>• Mix uppercase and lowercase letters</p><p>• Include numbers and symbols</p><p>• Avoid names and common passwords</p></aside>
                </div>
              </form>
            </section>
          )}
          {section === "Change Password" && !isAdmin && (
            <section className="panel profile-panel">
              <h3>Change Password</h3>
              <p className="muted password-intro">Use your current password to set a new one.</p>
              <form className="form-panel password-form" onSubmit={saveNewPassword}>
                <div className="password-grid">
                  <div>
                    <div className="field"><label>Current password</label><div className="password-input"><input type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required/><button type="button" aria-label="Show or hide current password" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>{showCurrentPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></div>
                    <div className="field"><label>New password</label><div className="password-input"><input type={showNewPassword ? "text" : "password"} value={changePassword} onChange={(e) => setChangePassword(e.target.value)} minLength={6} required/><button type="button" aria-label="Show or hide new password" onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div><small className={`strength strength-${passwordStrength(changePassword).toLowerCase()}`}>Password strength: {changePassword ? passwordStrength(changePassword) : "—"}</small></div>
                    <div className="field"><label>Re-enter new password</label><div className="password-input"><input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/><button type="button" aria-label="Show or hide confirmation password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></div>
                    <button className="primary-small" type="submit">Update password</button>
                  </div>
                  <aside className="password-tips"><strong>Password tips</strong><p>• At least 6 characters</p><p>• Mix uppercase and lowercase letters</p><p>• Include numbers and symbols</p><p>• Avoid using your name</p></aside>
                </div>
              </form>
            </section>
          )}
          {section === "My Info" && !isAdmin && (
            <EmployeeMyInfo employee={currentUser} employeeKey={currentUser?.employeeId || currentUser?.email || "employee"} />
          )}
          {section === "Support Hub" && !isAdmin && (
            <EmployeeSupportHub employee={currentUser} />
          )}
          {section === "My Profile" && !isAdmin && (
            <section className="panel profile-panel">
              <h3>My Profile</h3>
              <div className="profile-hero">
                <div className="profile-photo-wrap">{profilePhoto ? <img className="profile-photo" src={profilePhoto} alt="Employee profile"/> : <div className="profile-avatar">{(currentUser?.name || "S").charAt(0).toUpperCase()}</div>}</div>
                <div><h2>{currentUser?.name}</h2><p>{currentUser?.employeeId}</p><span className="status-pill">{currentUser?.status}</span><div className="profile-photo-actions"><label className="secondary-btn">Add / Change photo<input type="file" accept="image/*" hidden onChange={handlePhoto}/></label>{profilePhoto && <button className="table-action danger" type="button" onClick={() => setProfilePhoto("")}>Remove photo</button>}</div></div>
              </div>
              <h3 className="profile-subheading">My Information</h3>
              <div className="profile-grid">
                <ProfileField label="Full name" value={currentUser?.name}/><ProfileField label="Company name" value={"WorkTrack Solutions"}/>
                <ProfileField label="Company email" value={currentUser?.email}/><ProfileField label="Mobile number" value={currentUser?.mobile}/>
                <ProfileField label="Date of joining" value={formatDate(currentUser?.approvedAt || currentUser?.createdAt?.slice(0,10))}/><ProfileField label="Reporting manager" value={currentUser?.reportingManager || reportingManager}/>
                <ProfileField label="Employee ID" value={currentUser?.employeeId}/><ProfileField label="Position" value={currentUser?.role}/>
                <ProfileField label="Attendance batch" value={currentUser?.attendanceBatch || "General Batch"}/>
              </div>
              <form className="form-panel profile-edit-form" onSubmit={updateProfile}><h4>Update Profile</h4><div className="form-grid"><div className="field"><label>Full name</label><input value={profileName} onChange={(e) => setProfileName(e.target.value)} required/></div><div className="field"><label>Mobile number</label><input value={profileMobile} onChange={(e) => setProfileMobile(e.target.value.replace(/\D/g, "").slice(0,10))} inputMode="numeric" maxLength={10} required/></div></div><button className="primary-small" type="submit">Save profile</button></form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
const makeTicketCommentId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
function AttachmentViewerButton({ data, name = "Attachment" }) {
  const [open, setOpen] = useState(false);
  if (!data) return <span>—</span>;
  const fileName = String(name || "Attachment");
  const source = String(data || "");
  const isImage = source.startsWith("data:image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(fileName);
  const isPdf = source.startsWith("data:application/pdf") || /\.pdf$/i.test(fileName);
  const isText = source.startsWith("data:text/") || /\.(txt|csv|json|html|htm|xml)$/i.test(fileName);
  return <>
    <button type="button" className="support-attachment-view" onClick={() => setOpen(true)}>View {fileName}</button>
    {open && <div className="attachment-viewer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="attachment-viewer-modal" role="dialog" aria-modal="true" aria-label={`View ${fileName}`}>
        <header className="attachment-viewer-header"><div><h3>{fileName}</h3><p>Attachment preview</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Close attachment preview">×</button></header>
        <div className="attachment-viewer-body">
          {isImage ? <img src={source} alt={fileName} /> : isPdf || isText ? <iframe src={source} title={fileName} /> : <div className="attachment-viewer-fallback"><Paperclip size={30}/><strong>{fileName}</strong><p>This file type cannot be previewed directly in the browser. Open or download it to view its contents.</p><a href={source} target="_blank" rel="noreferrer" className="primary-small">Open file</a></div>}
        </div>
        <footer className="attachment-viewer-footer"><a href={source} download={fileName} className="secondary-btn">Download</a><button type="button" className="primary-small" onClick={() => setOpen(false)}>Close</button></footer>
      </section>
    </div>}
  </>;
}
function AdminTicketRequests({ initialTab = "Home" }) {
  const [tickets, setTickets] = useState(() => sortRecordsNewestFirst(readStore("wt_support_tickets", [])));
  const [activeTab, setActiveTab] = useState(initialTab);
  const [search, setSearch] = useState("");
  const [openedTicketId, setOpenedTicketId] = useState(null);
  const [draftStatus, setDraftStatus] = useState("Opened");
  const [adminReply, setAdminReply] = useState("");
  const [commentsTicketId, setCommentsTicketId] = useState(null);
  const [message, setMessage] = useState("");
  const tabs = ["Home", "Pending Tickets", "Opened Tickets", "In Progress", "On Hold", "Resolved"];
  const statusOf = (ticket) => String(ticket.status || "Pending for Approval").trim().toLowerCase();
  const isPending = (ticket) => ["pending", "pending for approval", "pending approval"].includes(statusOf(ticket));
  const isOpened = (ticket) => ["open", "opened"].includes(statusOf(ticket));
  const isProgress = (ticket) => statusOf(ticket) === "in progress";
  const isHold = (ticket) => statusOf(ticket) === "on hold";
  const isResolved = (ticket) => statusOf(ticket) === "resolved";
  const isClosed = (ticket) => statusOf(ticket) === "closed";
  const ticketMatchesTab = (ticket, tab) => tab === "Home" || (tab === "Pending Tickets" ? isPending(ticket) : tab === "Opened Tickets" ? isOpened(ticket) : tab === "In Progress" ? isProgress(ticket) : tab === "On Hold" ? isHold(ticket) : tab === "Resolved" ? isResolved(ticket) : false);
  const hasUnreadCommentsForTab = (tab) => tickets.some((ticket) => ticketMatchesTab(ticket, tab) && (ticket.replies || []).some((reply) => reply.from !== "Admin" && !reply.readByAdmin));
  const markAdminCommentsRead = (ticketId) => {
    persist(tickets.map((item) => item.id === ticketId ? { ...item, replies: (item.replies || []).map((reply) => ({ ...reply, readByAdmin: reply.from === "Admin" ? reply.readByAdmin : true })) } : item));
    const notifications = readStore("wt_notifications", []).map((item) => item.audience === "admin" && item.kind === "ticket-comment" && item.recordId === ticketId ? { ...item, isNew: false } : item);
    saveStore("wt_notifications", notifications);
  };
  const persist = (next) => { const ordered = sortRecordsNewestFirst(next); setTickets(ordered); saveStore("wt_support_tickets", ordered); window.dispatchEvent(new Event("wt_support_tickets_updated")); };
  const filtered = tickets.filter((ticket) => {
    const query = search.trim().toLowerCase();
    const matches = !query || [ticket.ticketNumber, ticket.id, ticket.employeeId, ticket.employeeName, ticket.subCategory, ticket.impact, ticket.priority, ticket.status]
      .some((value) => String(value ?? "").toLowerCase().includes(query));
    if (!matches) return false;
    if (activeTab === "Pending Tickets") return isPending(ticket);
    if (activeTab === "Opened Tickets") return isOpened(ticket);
    if (activeTab === "In Progress") return isProgress(ticket);
    if (activeTab === "On Hold") return isHold(ticket);
    if (activeTab === "Resolved") return isResolved(ticket);
    return true;
  });
  const openTicket = (ticket) => {
    setOpenedTicketId(ticket.id);
    setDraftStatus(ticket.status || "Opened");
    setAdminReply("");
    setMessage("");
  };
  const movePendingToOpened = (ticket) => {
    const next = tickets.map((item) => item.id === ticket.id ? { ...item, status: "Opened", stage: "Opened", openedAt: new Date().toISOString(), updatedAt: new Date().toISOString() } : item);
    persist(next);
    setOpenedTicketId(null);
    setMessage(`Ticket ${ticket.ticketNumber || ticket.id} moved to Opened Tickets.`);
  };
  const updateStatus = (ticket, forcedStatus = draftStatus) => {
    if (isClosed(ticket)) return;
    const nextStatus = forcedStatus;
    const next = tickets.map((item) => item.id === ticket.id ? { ...item, status: nextStatus, stage: nextStatus, updatedAt: new Date().toISOString(), ...(nextStatus === "Resolved" ? { resolvedAt: new Date().toISOString() } : {}) } : item);
    persist(next);
    setOpenedTicketId(null);
    setMessage(`Ticket ${ticket.ticketNumber || ticket.id} updated to ${nextStatus}.`);
  };
  const closeTicket = (ticket) => {
    const next = tickets.map((item) => item.id === ticket.id ? { ...item, status: "Closed", stage: "Closed", closedAt: new Date().toISOString(), updatedAt: new Date().toISOString() } : item);
    persist(next);
    setOpenedTicketId(null);
    setMessage(`Ticket ${ticket.ticketNumber || ticket.id} closed.`);
  };
  const submitAdminReply = (ticket) => {
    if (!adminReply.trim() || isClosed(ticket)) return;
    const reply = { id: makeTicketCommentId("admin-reply"), from: "Admin", message: adminReply.trim(), createdAt: new Date().toISOString(), readByAdmin: true, readByEmployee: false };
    persist(tickets.map((item) => item.id === ticket.id ? { ...item, replies: [...(item.replies || []), reply], updatedAt: new Date().toISOString() } : item));
    const existingNotifications = readStore("wt_notifications", []);
    const commentNotification = { id: `TICKET-COMMENT-ADMIN-${ticket.id}-${reply.id}`, audience: "employee", employeeId: ticket.employeeId, kind: "ticket-comment", recordId: ticket.id, title: "New admin ticket comment", message: `Admin commented on ticket ${ticket.ticketNumber || ticket.id} (${ticket.subject || "Support ticket"}).`, isNew: true, createdAt: reply.createdAt };
    saveStore("wt_notifications", [commentNotification, ...existingNotifications]);
    setAdminReply("");
    setMessage("Reply sent to employee.");
  };
  const selectedTicket = tickets.find((ticket) => ticket.id === openedTicketId);
  const detailStatusOptions = ["Opened", "In Progress", "On Hold", "Resolved"];
  return (
    <section className="panel ticket-requests-admin">
      <div className="panel-heading ticket-admin-heading"><div><h3>Ticket Requests</h3></div><div className="ticket-admin-search"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" aria-label="Search by Ticket ID, Employee ID, Employee Name, Sub Category, Impact, Priority, or Status" /></div></div>
      <div className="ticket-admin-tabs" role="tablist" aria-label="Ticket status">
        {tabs.map((tab) => <button type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "active" : ""} key={tab} onClick={() => { setActiveTab(tab); setOpenedTicketId(null); setMessage(""); }}>{tab !== "Home" ? `${tab} (${tickets.filter((ticket) => ticketMatchesTab(ticket, tab)).length})` : tab}{hasUnreadCommentsForTab(tab) && <span className="ticket-tab-notification-dot" title="Unread ticket comments" aria-label="Unread ticket comments" />}</button>)}
      </div>
      <div className="ticket-admin-toolbar"><strong>{activeTab}</strong></div>
      {message && <p className="ticket-admin-message">{message}</p>}
      <div className="table-wrap ticket-admin-table-wrap"><table className={`ticket-admin-records-table ${activeTab === "Pending Tickets" ? "ticket-admin-pending-table" : "ticket-admin-wide-table"}`}><thead><tr>{activeTab === "Pending Tickets" ? <><th>Ticket ID</th><th>Employee Name</th><th>Employee ID</th><th>Action</th></> : <><th>Ticket ID</th><th>Employee Name</th><th>Employee ID</th><th>Subject</th><th>Sub Category</th><th>Description</th><th>Impact</th><th>Priority</th><th>Status</th>{activeTab !== "Home" && <th>Action</th>}</>}</tr></thead><tbody>
        {filtered.map((ticket) => <tr key={ticket.id}>
          <td>{ticket.ticketNumber || ticket.id}</td><td>{ticket.employeeName || "—"}</td><td>{ticket.employeeId || "—"}</td>
          {activeTab === "Pending Tickets" ? <td><div className="ticket-row-actions"><button type="button" className="ticket-open-button" onClick={() => openTicket(ticket)}>Open</button><button type="button" className="ticket-open-button" onClick={() => { setCommentsTicketId(ticket.id); markAdminCommentsRead(ticket.id); }}>Comments{(ticket.replies || []).some((reply) => reply.from !== "Admin" && !reply.readByAdmin) && <span className="ticket-comment-dot" />}</button></div></td> :
            <><td>{ticket.subject || "—"}</td><td>{ticket.subCategory || "—"}</td><td>{ticket.description || "—"}</td><td>{ticket.impact === "Low" || !ticket.impact ? "Single" : ticket.impact}</td><td>{ticket.priority || "Low"}</td><td>{isClosed(ticket) ? "Ticket Closed" : (ticket.status || "Pending for Approval")}</td>{activeTab !== "Home" && <td>{activeTab === "Resolved" ? <div className="ticket-row-actions"><button type="button" className="ticket-open-button" onClick={() => { setAdminReply(""); setCommentsTicketId(ticket.id); markAdminCommentsRead(ticket.id); }}>Comments{(ticket.replies || []).some((reply) => reply.from !== "Admin" && !reply.readByAdmin) && <span className="ticket-comment-dot" />}</button><details className="ticket-action-menu"><summary aria-label="Ticket actions" title="Ticket actions">⋮</summary><div className="ticket-action-menu-options"><button type="button" onClick={() => updateStatus(ticket,"In Progress")}>Change to In Progress</button><button type="button" onClick={() => closeTicket(ticket)}>Ticket Close</button></div></details></div> : <button type="button" className="ticket-open-button" onClick={() => openTicket(ticket)}>Open</button>}</td>}</>}
        </tr>)}
        {!filtered.length && <tr><td colSpan={activeTab === "Pending Tickets" ? 4 : activeTab === "Home" ? 9 : 10} className="empty-state">No ticket records found.</td></tr>}
      </tbody></table></div>
      {selectedTicket && <div className="ticket-detail-panel">
        <div className="ticket-detail-heading"><h4>Ticket Details — {selectedTicket.ticketNumber || selectedTicket.id}</h4><button type="button" onClick={() => setOpenedTicketId(null)} aria-label="Close ticket details">×</button></div>
        <div className="ticket-detail-grid">
          <p><strong>Employee Name</strong><span>{selectedTicket.employeeName || "—"}</span></p><p><strong>Employee ID</strong><span>{selectedTicket.employeeId || "—"}</span></p>
          <p><strong>Employee Email</strong><span>{selectedTicket.employeeEmail || "—"}</span></p><p><strong>Subject</strong><span>{selectedTicket.subject || "—"}</span></p>
          <p><strong>Sub Category</strong><span>{selectedTicket.subCategory || "—"}</span></p><p><strong>Priority</strong><span>{selectedTicket.priority || "Low"}</span></p>
          <p><strong>Impact</strong><span>{selectedTicket.impact === "Low" || !selectedTicket.impact ? "Single" : selectedTicket.impact}</span></p><p><strong>Current Status</strong><span>{selectedTicket.status || "Pending for Approval"}</span></p>
          <p className="ticket-detail-description"><strong>Description</strong><span>{selectedTicket.description || "—"}</span></p>
          <p><strong>Attachment</strong><span><AttachmentViewerButton data={selectedTicket.attachmentData} name={selectedTicket.attachmentName || "attachment"} /></span></p>
          <p><strong>Created On</strong><span>{selectedTicket.createdAt ? new Date(selectedTicket.createdAt).toLocaleString("en-IN") : "—"}</span></p>
        </div>
        <button type="button" className="ticket-open-button" onClick={() => { setCommentsTicketId(selectedTicket.id); markAdminCommentsRead(selectedTicket.id); }}>Comments{(selectedTicket.replies || []).some((reply) => reply.from !== "Admin" && !reply.readByAdmin) && <span className="ticket-comment-dot" />}</button>
        {isPending(selectedTicket) ? <div className="ticket-status-update"><button type="button" className="ticket-cancel-button" onClick={() => setOpenedTicketId(null)}>Cancel</button><button type="button" onClick={() => movePendingToOpened(selectedTicket)}>Close</button></div> :
          detailStatusOptions.length > 0 ? <div className="ticket-status-update"><label htmlFor="ticket-status-select">Status:</label><select id="ticket-status-select" value={draftStatus} onChange={(event) => setDraftStatus(event.target.value)}>{detailStatusOptions.map((status) => <option key={status}>{status}</option>)}</select><button type="button" className="ticket-cancel-button" onClick={() => setOpenedTicketId(null)}>Cancel</button><button type="button" onClick={() => updateStatus(selectedTicket)}>Update</button></div> : null}
      </div>}
      {commentsTicketId && (() => { const ticket = tickets.find((item) => item.id === commentsTicketId); if (!ticket) return null; return <div className="ticket-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setCommentsTicketId(null); }}><section className="ticket-comments-modal" role="dialog" aria-modal="true" aria-label="Ticket comments"><header><div><h3>Comments</h3><p>{ticket.ticketNumber || ticket.id} · {ticket.subject || "Support ticket"}</p></div><button type="button" aria-label="Close comments" onClick={() => setCommentsTicketId(null)}>×</button></header><div className="ticket-modal-thread">{(ticket.replies || []).map((reply) => <article key={reply.id}><strong>{reply.from === "Admin" ? "Comment from admin" : "Comment from employee"}</strong><p>{reply.message}</p><small>{reply.createdAt ? new Date(reply.createdAt).toLocaleString("en-IN") : ""}</small></article>)}{!(ticket.replies || []).length && <p className="muted">No comments yet.</p>}</div><label className="ticket-modal-input">Comments<textarea value={adminReply} onChange={(e) => setAdminReply(e.target.value)} placeholder="Type your comments..." rows={3} disabled={isClosed(ticket)} /></label><footer>{isClosed(ticket) && <span>This ticket is closed. Comments are disabled.</span>}<button type="button" className="ticket-cancel-button" onClick={() => setCommentsTicketId(null)}>Cancel</button><button type="button" className="ticket-open-button" onClick={() => { submitAdminReply(ticket); }} disabled={!adminReply.trim() || isClosed(ticket)}>Send</button></footer></section></div>; })()}
    </section>
  );
}
function EmployeeSupportHub({ employee }) {
  const [activeView, setActiveView] = useState("Home");
  const [tickets, setTickets] = useState(() => sortRecordsNewestFirst(readStore("wt_support_tickets", [])));
  const [adminChatMessages, setAdminChatMessages] = useState(() => readStore(`wt_employee_admin_chat_${String(employee?.employeeId || employee?.email || "employee").replace(/[^a-zA-Z0-9_-]/g, "_")}`, []));
  const [adminChatDraft, setAdminChatDraft] = useState("");
  const [adminChatAttachment, setAdminChatAttachment] = useState(null);
  const [ticketId, setTicketId] = useState("");
  const [subject, setSubject] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [priority, setPriority] = useState("Low");
  const [impact, setImpact] = useState("Single");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [message, setMessage] = useState("");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [commentsTicketId, setCommentsTicketId] = useState(null);
  const previousTicketStatuses = useRef(new Map(tickets.map((item) => [item.id, String(item.status || "").trim().toLowerCase()])));
  const employeeChatStorageKey = `wt_employee_admin_chat_${String(employee?.employeeId || employee?.email || "employee").replace(/[^a-zA-Z0-9_-]/g, "_")}`;
  useEffect(() => {
    const syncChat = () => setAdminChatMessages(readStore(employeeChatStorageKey, []));
    window.addEventListener("storage", syncChat);
    window.addEventListener("wt_employee_chat_updated", syncChat);
    return () => {
      window.removeEventListener("storage", syncChat);
      window.removeEventListener("wt_employee_chat_updated", syncChat);
    };
  }, [employeeChatStorageKey]);
  const sendAdminChatMessage = (event) => {
    event.preventDefault();
    const message = adminChatDraft.trim();
    if (!message && !adminChatAttachment) return;
    const next = [...readStore(employeeChatStorageKey, []), {
      id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      from: "Employee",
      senderName: employee?.name || "Employee",
      senderId: employee?.employeeId || "—",
      message,
      attachmentName: adminChatAttachment?.name || "",
      attachmentData: adminChatAttachment?.data || "",
      attachmentType: adminChatAttachment?.type || "",
      createdAt: new Date().toISOString(),
      readByEmployee: true,
      readByAdmin: false
    }];
    saveStore(employeeChatStorageKey, next);
    setAdminChatMessages(next);
    setAdminChatDraft("");
    setAdminChatAttachment(null);
    window.dispatchEvent(new Event("wt_employee_chat_updated"));
    const notices = readStore("wt_notifications", []);
    saveStore("wt_notifications", [{
      id: `employee-chat-employee-${employee?.employeeId}-${Date.now()}`,
      audience: "admin",
      kind: "employee-chat",
      employeeId: employee?.employeeId,
      title: "New employee chat message",
      message: `${employee?.name || "Employee"} (${employee?.employeeId || "No ID"}) sent a chat message.`,
      isNew: true,
      createdAt: new Date().toISOString()
    }, ...notices]);
  };
  useEffect(() => {
    const syncTickets = () => {
      const latest = readStore("wt_support_tickets", []);
      const newlyClosed = latest.some((item) => (!item.employeeId || item.employeeId === employee?.employeeId) && String(item.status || "").trim().toLowerCase() === "closed" && previousTicketStatuses.current.get(item.id) !== "closed");
      setTickets(sortRecordsNewestFirst(latest));
      if (commentsTicketId && latest.some((item) => item.id === commentsTicketId && String(item.status || "").trim().toLowerCase() === "closed")) {
        setCommentsTicketId(null);
        setActiveView("Home");
      } else if (newlyClosed && activeView !== "Home") {
        setActiveView("Home");
      }
      previousTicketStatuses.current = new Map(latest.map((item) => [item.id, String(item.status || "").trim().toLowerCase()]));
    };
    window.addEventListener("storage", syncTickets);
    window.addEventListener("wt_support_tickets_updated", syncTickets);
    return () => {
      window.removeEventListener("storage", syncTickets);
      window.removeEventListener("wt_support_tickets_updated", syncTickets);
    };
  }, [activeView, commentsTicketId, employee?.employeeId]);
  const persist = (next) => {
    setTickets(sortRecordsNewestFirst(next));
    saveStore("wt_support_tickets", sortRecordsNewestFirst(next));
    window.dispatchEvent(new Event("wt_support_tickets_updated"));
  };
  const openCreate = () => {
    setActiveView("Create Ticket");
    const existingTickets = readStore("wt_support_tickets", []);
    const nextNumber = existingTickets.reduce((max, item) => {
      const match = String(item.ticketNumber || item.id || "").match(/TIS(\d+)/i);
      return match ? Math.max(max, Number(match[1])) : max;
    }, 0) + 1;
    setTicketId(`#TIS${String(nextNumber).padStart(3, "0")}`);
    setSubject("");
    setSubCategory("");
    setPriority("Low");
    setImpact("Single");
    setDescription("");
    setAttachment(null);
    setMessage("");
  };
  const submitTicket = (event) => {
    event.preventDefault();
    if (!subject.trim() || !subCategory.trim() || !description.trim()) {
      setMessage("Please enter the subject, sub category, and description.");
      return;
    }
    const ticket = {
      id: ticketId,
      ticketNumber: ticketId,
      employeeId: employee?.employeeId || "",
      employeeName: employee?.name || "",
      employeeEmail: employee?.email || "",
      subject: subject.trim(),
      description: description.trim(),
      subCategory: subCategory.trim(),
      priority,
      impact,
      attachmentName: attachment?.name || "",
      attachmentData: attachment?.data || "",
      attachmentType: attachment?.type || "",
      status: "Pending for Approval",
      stage: "Pending",
      pendingWith: "Admin",
      createdAt: new Date().toISOString(),
    };
    persist([ticket, ...tickets]);
    const existingNotifications = readStore("wt_notifications", []);
    saveStore("wt_notifications", [{ id: `admin-ticket-submit-${ticket.id}`, audience: "admin", kind: "ticket-submission", recordId: ticket.id, title: "New support ticket", message: `${ticket.employeeName} (${ticket.employeeId || "No ID"}) raised ticket ${ticket.ticketNumber}: ${ticket.subject}.`, isNew: true, createdAt: new Date().toISOString() }, ...existingNotifications]);
    setMessage("Ticket created successfully.");
    setActiveView("Home");
  };
  const submitEmployeeReply = (ticket) => {
    const replyText = String(replyDrafts[ticket.id] || "").trim();
    if (!replyText || !canCommentTicket(ticket)) return;
    const reply = { id: makeTicketCommentId("employee-reply"), from: employee?.name || "Employee", message: replyText, createdAt: new Date().toISOString(), readByEmployee: true, readByAdmin: false };
    const next = tickets.map((item) => item.id === ticket.id ? { ...item, replies: [...(item.replies || []), reply], updatedAt: new Date().toISOString() } : item);
    setTickets(sortRecordsNewestFirst(next));
    saveStore("wt_support_tickets", sortRecordsNewestFirst(next));
    window.dispatchEvent(new Event("wt_support_tickets_updated"));
    const existingNotifications = readStore("wt_notifications", []);
    const commentNotification = { id: `TICKET-COMMENT-EMPLOYEE-${ticket.id}-${reply.id}`, audience: "admin", kind: "ticket-comment", recordId: ticket.id, title: "New employee ticket comment", message: `${employee?.name || ticket.employeeName || "Employee"} (${employee?.employeeId || ticket.employeeId || "No ID"}) commented on ticket ${ticket.ticketNumber || ticket.id} (${ticket.subject || "Support ticket"}).`, isNew: true, createdAt: reply.createdAt };
    saveStore("wt_notifications", [commentNotification, ...existingNotifications]);
    setReplyDrafts((current) => ({ ...current, [ticket.id]: "" }));
    setMessage("Reply sent to admin.");
  };
  const filteredTickets = tickets.filter((ticket) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${ticket.id} ${ticket.subject || ""} ${ticket.subCategory} ${ticket.description} ${ticket.status}`.toLowerCase().includes(query);
    const matchesEmployee = !ticket.employeeId || ticket.employeeId === employee?.employeeId;
    return matchesSearch && matchesEmployee;
  });
  const homeTickets = tickets.filter((ticket) => {
    const query = search.trim().toLowerCase();
    const matchesEmployee = !ticket.employeeId || ticket.employeeId === employee?.employeeId;
    const matchesSearch = !query || `${ticket.id} ${ticket.subject || ""} ${ticket.subCategory} ${ticket.description} ${ticket.status}`.toLowerCase().includes(query);
    return matchesEmployee && matchesSearch;
  });
  const normalizedStatus = (ticket) => String(ticket.status || "Pending for Approval").trim().toLowerCase();
  const employeeTickets = tickets.filter((ticket) => !ticket.employeeId || ticket.employeeId === employee?.employeeId);
  const isClosedTicket = (ticket) => normalizedStatus(ticket) === "closed";
  const isResolvedTicket = (ticket) => normalizedStatus(ticket) === "resolved";
  const isPendingTicket = (ticket) => ["pending", "pending for approval", "pending approval"].includes(normalizedStatus(ticket));
  const isInProgressTicket = (ticket) => ["in progress", "in progress tickets"].includes(normalizedStatus(ticket));
  const isOnHoldTicket = (ticket) => ["on hold", "hold"].includes(normalizedStatus(ticket));
  const isOpenTicket = (ticket) => !isPendingTicket(ticket) && !isResolvedTicket(ticket) && !isInProgressTicket(ticket) && !isOnHoldTicket(ticket) && (["open", "opened"].includes(normalizedStatus(ticket)) || ["open", "opened"].includes(String(ticket.stage || "").trim().toLowerCase()));
  const canCommentTicket = (ticket) => !isClosedTicket(ticket) && (isPendingTicket(ticket) || isOpenTicket(ticket) || isInProgressTicket(ticket) || isOnHoldTicket(ticket) || isResolvedTicket(ticket));
  const employeeReportTickets = employeeTickets.filter((ticket) => !isClosedTicket(ticket) && (isOpenTicket(ticket) || isInProgressTicket(ticket) || isOnHoldTicket(ticket) || isResolvedTicket(ticket)));
  const openCount = employeeReportTickets.filter(isOpenTicket).length;
  const progressCount = employeeReportTickets.filter(isInProgressTicket).length;
  const holdCount = employeeReportTickets.filter(isOnHoldTicket).length;
  const resolvedCount = employeeReportTickets.filter(isResolvedTicket).length;
  return (
    <section className="panel employee-support-hub">
      <header className="support-hub-topnav">
        {["Home", "Create Ticket", "Pending for Approval", "Reports", "ChatBox"].map((view) => (
          <button key={view} type="button" className={activeView === view ? "support-hub-nav active" : "support-hub-nav"}
            onClick={() => {
              if (view === "Create Ticket") openCreate();
              else {
                setActiveView(view); setMessage("");
                if (view === "ChatBox") {
                  const read = readStore(employeeChatStorageKey, []).map((item) => item.from === "Admin" ? { ...item, readByEmployee: true } : item);
                  saveStore(employeeChatStorageKey, read);
                  setAdminChatMessages(read);
                  window.dispatchEvent(new Event("wt_employee_chat_updated"));
                }
              }
            }}>
            {view === "Pending for Approval" ? "Pending" : view}
            {view === "Pending for Approval" && employeeTickets.filter((ticket) => isPendingTicket(ticket)).length > 0 && <span className="support-tab-count" title="Pending ticket records" aria-label={`${employeeTickets.filter((ticket) => isPendingTicket(ticket)).length} pending ticket notifications`}>({employeeTickets.filter((ticket) => isPendingTicket(ticket)).length})</span>}
            {view === "Reports" && employeeReportTickets.length > 0 && <span className="support-tab-count" title="Report records available" aria-label={`${employeeReportTickets.length} report notifications`}>({employeeReportTickets.length})</span>}
            {view === "ChatBox" && adminChatMessages.filter((item) => item.from === "Admin" && !item.readByEmployee).length > 0 && <span className="support-tab-count" title="Unread admin chat messages" aria-label={`${adminChatMessages.filter((item) => item.from === "Admin" && !item.readByEmployee).length} unread admin chat messages`}>({adminChatMessages.filter((item) => item.from === "Admin" && !item.readByEmployee).length})</span>}
          </button>
        ))}
      </header>
      {activeView === "Home" && (
        <div className="support-hub-content">
          <h2>Home</h2>
          <div className="support-table-panel support-home-records">
            <div className="support-table-toolbar">
              <strong>Ticket Records</strong>
              <input className="support-home-search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tickets" aria-label="Search tickets" />
            </div>
            <div className="support-table-scroll"><table><thead><tr><th>S.No.</th><th>Ticket ID</th><th>Employee Name</th><th>Employee ID</th><th>Official Mail</th><th>Subject</th><th>Sub Category</th><th>Priority Level</th><th>Impact</th><th>Attachment</th><th>Status</th><th>Description</th><th>Created On</th><th>Comments</th></tr></thead>
              <tbody>
                {homeTickets.map((ticket, index) => <tr key={ticket.id}><td>{index + 1}</td><td>{ticket.ticketNumber || ticket.id}</td><td>{ticket.employeeName || employee?.name || "—"}</td><td>{ticket.employeeId || employee?.employeeId || "—"}</td><td>{ticket.employeeEmail || employee?.email || "—"}</td><td>{ticket.subject || "—"}</td><td>{ticket.subCategory}</td><td>{ticket.priority || "Low"}</td><td>{ticket.impact === "Low" || !ticket.impact ? "Single" : ticket.impact}</td><td><AttachmentViewerButton data={ticket.attachmentData} name={ticket.attachmentName || "attachment"} /></td><td>{String(ticket.status || "").trim().toLowerCase() === "closed" ? "Ticket Closed" : (/pending/i.test(String(ticket.status || "")) ? "Pending" : (ticket.status || "Pending"))}</td><td>{ticket.description || "—"}</td><td>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "—"}</td><td>{!canCommentTicket(ticket) ? <span className="muted">—</span> : <button type="button" className="ticket-open-button employee-comments-button" onClick={() => { setCommentsTicketId(ticket.id); const next=tickets.map((item) => item.id === ticket.id ? { ...item, replies:(item.replies || []).map((reply) => ({ ...reply, readByEmployee: reply.from === "Admin" ? true : reply.readByEmployee })) } : item); setTickets(sortRecordsNewestFirst(next)); saveStore("wt_support_tickets",sortRecordsNewestFirst(next)); const notifications=readStore("wt_notifications",[]).map((notice) => notice.audience === "employee" && notice.employeeId === employee?.employeeId && notice.kind === "ticket-comment" && notice.recordId === ticket.id ? { ...notice, isNew:false } : notice); saveStore("wt_notifications",notifications); }}>Comments{(ticket.replies || []).some((reply) => reply.from === "Admin" && !reply.readByEmployee) && <span className="ticket-comment-dot" />}</button>}</td></tr>)}
                {!homeTickets.length && <tr><td colSpan="14" className="support-no-records">No Ticket were found in the records</td></tr>}
              </tbody></table></div>
          </div>
          {message && <p className="support-hub-message">{message}</p>}
        </div>
      )}
      {activeView === "Create Ticket" && (
        <div className="support-hub-content">
          <h2>Create Ticket</h2>
          <form className="support-ticket-form" onSubmit={submitTicket}>
            <div className="support-ticket-form-grid">
              <label>Ticket ID<input value={ticketId} readOnly /></label>
              <label>Employee Name<input value={employee?.name || ""} readOnly /></label>
              <label>Employee ID<input value={employee?.employeeId || ""} readOnly /></label>
              <label>Official Mail<input value={employee?.email || ""} readOnly /></label>
              <label>Subject *<input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter ticket subject" required /></label>
              <label>Sub Category *<input value={subCategory} onChange={(e) => setSubCategory(e.target.value)} placeholder="Enter sub category" required /></label>
              <label>Priority Level<select value={priority} onChange={(e) => setPriority(e.target.value)}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label>
              <label>Impact<select value={impact} onChange={(e) => setImpact(e.target.value)}><option>Single</option><option>Team</option></select></label>
            </div>
            <label className="support-description-label">Description *<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your issue or request here..." rows={5} required /></label>
            <label className="support-attachment-label">Attachment (optional)<input type="file" onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) { setAttachment(null); return; }
              const reader = new FileReader();
              reader.onload = () => setAttachment({ name: file.name, type: file.type, data: String(reader.result || "") });
              reader.onerror = () => setMessage("Unable to read the attachment. Please try again.");
              reader.readAsDataURL(file);
            }} /></label>
            {attachment && <span className="support-attachment-name">Selected: {attachment.name}</span>}
            {message && <p className="support-hub-message">{message}</p>}
            <div className="support-form-actions"><button type="button" className="support-secondary-btn" onClick={() => setActiveView("Home")}>Cancel</button><button type="submit" className="support-primary-btn">Submit</button></div>
          </form>
        </div>
      )}
      {activeView === "Pending for Approval" && (
        <div className="support-hub-content"><h2>Pending</h2><div className="support-table-panel"><div className="support-table-scroll"><table><thead><tr><th>S.No.</th><th>Ticket ID</th><th>Employee Name</th><th>Employee ID</th><th>Official Mail</th><th>Subject</th><th>Sub Category</th><th>Priority Level</th><th>Impact</th><th>Attachment</th><th>Status</th><th>Description</th><th>Created On</th><th>Comments</th></tr></thead><tbody>
          {filteredTickets.filter((ticket) => isPendingTicket(ticket)).map((ticket, index) => <tr key={ticket.id}><td>{index + 1}</td><td>{ticket.ticketNumber || ticket.id}</td><td>{ticket.employeeName || employee?.name || "—"}</td><td>{ticket.employeeId || employee?.employeeId || "—"}</td><td>{ticket.employeeEmail || employee?.email || "—"}</td><td>{ticket.subject || "—"}</td><td>{ticket.subCategory || "—"}</td><td>{ticket.priority || "Low"}</td><td>{ticket.impact || "Single"}</td><td><AttachmentViewerButton data={ticket.attachmentData} name={ticket.attachmentName || "attachment"} /></td><td>Pending</td><td>{ticket.description || "—"}</td><td>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "—"}</td><td><button type="button" className="ticket-open-button employee-comments-button" onClick={() => { setCommentsTicketId(ticket.id); setReplyDrafts((current) => ({ ...current, [ticket.id]: current[ticket.id] || "" })); const next = tickets.map((item) => item.id === ticket.id ? { ...item, replies: (item.replies || []).map((reply) => ({ ...reply, readByEmployee: reply.from === "Admin" ? true : reply.readByEmployee })) } : item); setTickets(sortRecordsNewestFirst(next)); saveStore("wt_support_tickets", sortRecordsNewestFirst(next)); const notifications = readStore("wt_notifications", []).map((notice) => notice.audience === "employee" && notice.employeeId === employee?.employeeId && notice.kind === "ticket-comment" && notice.recordId === ticket.id ? { ...notice, isNew: false } : notice); saveStore("wt_notifications", notifications); }}>Comments{(ticket.replies || []).some((reply) => reply.from === "Admin" && !reply.readByEmployee) && <span className="ticket-comment-dot" />}</button></td></tr>)}
          {!filteredTickets.some((ticket) => isPendingTicket(ticket)) && <tr><td colSpan="14" className="support-no-records">No tickets pending for approval</td></tr>}
        </tbody></table></div></div></div>
      )}
      {activeView === "Reports" && (
        <div className="support-hub-content"><h2>Reports</h2><div className="support-report-grid">
          <div><span>Total Tickets</span><strong>{employeeReportTickets.length}</strong></div>
          <div><span>Open Tickets</span><strong>{openCount}</strong></div>
          <div><span>In Progress</span><strong>{progressCount}</strong></div>
          <div><span>On Hold</span><strong>{holdCount}</strong></div>
          <div><span>Resolved</span><strong>{resolvedCount}</strong></div>
        </div><div className="support-table-panel"><div className="support-table-scroll"><table><thead><tr><th>S.No.</th><th>Ticket ID</th><th>Employee Name</th><th>Employee ID</th><th>Official Mail</th><th>Subject</th><th>Sub Category</th><th>Priority Level</th><th>Impact</th><th>Attachment</th><th>Status</th><th>Description</th><th>Created On</th><th>Comments</th></tr></thead><tbody>
          {employeeReportTickets.map((ticket, index) => <tr key={ticket.id}><td>{index + 1}</td><td>{ticket.ticketNumber || ticket.id}</td><td>{ticket.employeeName || employee?.name || "—"}</td><td>{ticket.employeeId || employee?.employeeId || "—"}</td><td>{ticket.employeeEmail || employee?.email || "—"}</td><td>{ticket.subject || "—"}</td><td>{ticket.subCategory || "—"}</td><td>{ticket.priority || "Low"}</td><td>{ticket.impact || "Single"}</td><td><AttachmentViewerButton data={ticket.attachmentData} name={ticket.attachmentName || "attachment"} /></td><td>{isResolvedTicket(ticket) ? "Resolved" : (ticket.status || "Opened")}</td><td>{ticket.description || "—"}</td><td>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "—"}</td><td><button type="button" className="ticket-open-button employee-comments-button" onClick={() => { setCommentsTicketId(ticket.id); const next=tickets.map((item) => item.id === ticket.id ? { ...item, replies:(item.replies || []).map((reply) => ({ ...reply, readByEmployee: reply.from === "Admin" ? true : reply.readByEmployee })) } : item); setTickets(sortRecordsNewestFirst(next)); saveStore("wt_support_tickets",sortRecordsNewestFirst(next)); const notifications=readStore("wt_notifications",[]).map((notice) => notice.audience === "employee" && notice.employeeId === employee?.employeeId && notice.kind === "ticket-comment" && notice.recordId === ticket.id ? { ...notice, isNew:false } : notice); saveStore("wt_notifications",notifications); }}>Comments{(ticket.replies || []).some((reply) => reply.from === "Admin" && !reply.readByEmployee) && <span className="ticket-comment-dot" />}</button></td></tr>)}
          {!employeeReportTickets.length && <tr><td colSpan="14" className="support-no-records">No Record Found</td></tr>}
        </tbody></table></div></div></div>
      )}
      {activeView === "ChatBox" && (
        <div className="support-hub-content employee-chat-view">
          <h2>ChatBox (Admin)</h2>
          <div className="employee-chat-thread support-employee-chat-thread">
            {adminChatMessages.map((item) => <article key={item.id} className={item.from === "Admin" ? "admin-message" : "employee-message"}>
              <strong>{item.from === "Admin" ? "Admin" : `${item.senderName || employee?.name || "Employee"} (${item.senderId || employee?.employeeId || "—"})`}</strong>
              {item.message && <p>{item.message}</p>}
              {item.attachmentData && <a className="chat-attachment-link" href={item.attachmentData} target="_blank" rel="noreferrer">📎 {item.attachmentName || "Open attachment"}</a>}
              <small>{item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : ""}</small>
            </article>)}
            {!adminChatMessages.length && <p className="employee-chat-empty">No messages yet. Send a message to start the chat.</p>}
          </div>
          <form className="employee-chat-compose employee-chat-compose-with-attachment" onSubmit={sendAdminChatMessage}>
            <label className="chat-attachment-upload">Attachments · Upload files
              <input type="file" onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) { setAdminChatAttachment(null); return; }
                const reader = new FileReader();
                reader.onload = () => setAdminChatAttachment({ name: file.name, type: file.type, data: String(reader.result || "") });
                reader.readAsDataURL(file);
              }} />
            </label>
            {adminChatAttachment && <span className="chat-selected-attachment">Selected: {adminChatAttachment.name}</span>}
            <div className="chat-compose-row"><input value={adminChatDraft} onChange={(event) => setAdminChatDraft(event.target.value)} placeholder="Type Your Message..." aria-label="Type Your Message" />
            <button type="submit" aria-label="Send message" title="Send message" disabled={!adminChatDraft.trim() && !adminChatAttachment}><span aria-hidden="true">➤</span></button></div>
          </form>
        </div>
      )}
      {commentsTicketId && (() => { const ticket = tickets.find((item) => item.id === commentsTicketId); if (!ticket || !canCommentTicket(ticket)) return null; const closed = !canCommentTicket(ticket); return <div className="ticket-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setCommentsTicketId(null); }}><section className="ticket-comments-modal" role="dialog" aria-modal="true" aria-label="Ticket comments"><header><div><h3>Comments</h3><p>{ticket.ticketNumber || ticket.id} · {ticket.subject || "Support ticket"}</p></div><button type="button" aria-label="Close comments" onClick={() => setCommentsTicketId(null)}>×</button></header><div className="ticket-modal-thread">{(ticket.replies || []).map((reply) => <article key={reply.id}><strong>{reply.from === "Admin" ? "Comment from admin" : "Comment from employee"}</strong><p>{reply.message}</p><small>{reply.createdAt ? new Date(reply.createdAt).toLocaleString("en-IN") : ""}</small></article>)}{!(ticket.replies || []).length && <p className="muted">No comments yet.</p>}</div><label className="ticket-modal-input">Comments to admin<textarea value={replyDrafts[ticket.id] || ""} onChange={(e) => setReplyDrafts((current) => ({ ...current, [ticket.id]: e.target.value }))} placeholder="Type your comments..." rows={3} disabled={closed} /></label><footer>{closed && <span>This ticket is closed. Comments are disabled.</span>}<button type="button" className="ticket-cancel-button" onClick={() => setCommentsTicketId(null)}>Cancel</button><button type="button" className="ticket-open-button" onClick={() => submitEmployeeReply(ticket)} disabled={!(replyDrafts[ticket.id] || "").trim() || closed}>Send</button></footer></section></div>; })()}
    </section>
  );
}
const MY_INFO_TABS = [
  { id: "Bio Graphical", title: "Biographical Details", fields: [
    ["dateOfBirth", "Date of Birth", "date"], ["countryOfBirth", "Country of Birth"], ["placeOfBirth", "Place of Birth"]
  ]},
  { id: "Personal", title: "Personal Details", fields: [
    ["firstName", "First Name"], ["middleName", "Middle Name"], ["lastName", "Last Name"],
    ["maritalStatus", "Marital Status", "select", ["Single", "Married", "Divorced", "Widowed"]],
    ["maritalSince", "Since", "date"], ["nationality", "Nationality"]
  ]},
  { id: "Family", title: "Family Details", fields: [
    ["relation", "Relation", "select", ["Spouse", "Child", "Father", "Mother", "Sibling", "Other"]],
    ["familyFirstName", "First Name"], ["familyMiddleName", "Middle Name"], ["familyLastName", "Last Name"],
    ["familyDateOfBirth", "Date of Birth", "date"], ["familyBirthPlace", "Birth Place"],
    ["familyCountryOfBirth", "Country of Birth"], ["familyNationality", "Nationality"],
    ["familySex", "Sex", "select", ["Female", "Male", "Other"]]
  ]},
  { id: "Address", title: "Address Details", fields: [
    ["addressType", "Address Type", "select", ["Present", "Permanent", "Emergency"]], ["careOf", "C/O"],
    ["houseNumber", "House Number"], ["blockPocket", "Block/Pocket"], ["addressLine1", "1st Address Line"],
    ["addressLine2", "2nd Address Line"], ["city", "City"], ["country", "Country"], ["state", "State"],
    ["postalCode", "Postal Code"], ["district", "District"], ["telephone", "Telephone Number"]
  ]},
  { id: "Communication", title: "Communication Details", fields: [
    ["personalEmail", "E-Mail Address (Personal)", "email"], ["officialEmail", "E-Mail Address (Official)", "email"],
    ["mobileNumber", "Mobile Number", "tel"]
  ]},
  { id: "Identity Details", title: "Identity Details", fields: [
    ["countryOfId", "Country of ID"], ["idNumber", "ID Number"], ["identityType", "Identity Type"],
    ["issuingAuthority", "Issuing Authority"], ["dateOfIssue", "Date of Issue", "date"],
    ["dateOfExpiry", "Date of Expiry", "date"], ["placeOfIssue", "Place of Issue"]
  ]},
  { id: "Education", title: "Education Details", fields: [
    ["educationFrom", "From", "date"], ["educationTo", "To", "date"], ["educationTraining", "Education/Training"],
    ["institutionLocation", "Institution/Location"], ["educationCountry", "Country"], ["duration", "Duration"]
  ]},
  { id: "Blood Group", title: "Blood Group Details", fields: [
    ["bloodGroup", "Blood Group", "select", ["A Positive", "A Negative", "B Positive", "B Negative", "AB Positive", "AB Negative", "O Positive", "O Negative"]]
  ]},
  { id: "PAN", title: "Declaration of PAN No./GIR No.", fields: [
    ["panNumber", "PAN Number"], ["panPlaceOfIssue", "Place of Issue/Application"]
  ]},
];
const MULTI_INFO_TABS = ["Family", "Address", "Education"];
const makeInfoRow = (tabId) => ({ _rowId: `${tabId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` });
function EmployeeMyInfo({ employee, employeeKey }) {
  const storageKey = `wt_employee_my_info_${String(employeeKey || "employee").replace(/[^a-zA-Z0-9_-]/g, "_")}`;
  const [activeTab, setActiveTab] = useState("Bio Graphical");
  const [values, setValues] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
  });
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState({});
  const [uploads, setUploads] = useState({});
  const tab = MY_INFO_TABS.find((item) => item.id === activeTab) || MY_INFO_TABS[0];
  const setField = (name, value) => setValues((current) => ({ ...current, [name]: value }));
  const isEditing = Boolean(editing[activeTab]);
  const savedTabs = Array.isArray(values.__savedTabs) ? values.__savedTabs : [];
  const displayName = [values.firstName, values.middleName, values.lastName].filter(Boolean).join(" ") || employee?.name || "—";
  const company = "WorkTrack Solutions";
  const region = employee?.region || employee?.location || "—";
  const joiningDate = employee?.dateOfJoining || employee?.approvedAt || employee?.createdAt || "";
  const formattedJoiningDate = joiningDate ? new Date(joiningDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
  const multiRows = Array.isArray(values[`__rows_${activeTab}`]) ? values[`__rows_${activeTab}`] : [];
  const rowFields = (row, fieldName, value) => setValues((current) => ({
    ...current,
    [`__rows_${activeTab}`]: (Array.isArray(current[`__rows_${activeTab}`]) ? current[`__rows_${activeTab}`] : []).map((item) => item._rowId === row._rowId ? { ...item, [fieldName]: value } : item)
  }));
  const addRow = () => setValues((current) => ({ ...current, [`__rows_${activeTab}`]: [...(Array.isArray(current[`__rows_${activeTab}`]) ? current[`__rows_${activeTab}`] : []), makeInfoRow(activeTab)] }));
  const removeRow = (rowId) => setValues((current) => ({ ...current, [`__rows_${activeTab}`]: (current[`__rows_${activeTab}`] || []).filter((row) => row._rowId !== rowId) }));
  const hasSavedContent = (source, tabId) => {
    if (MULTI_INFO_TABS.includes(tabId)) {
      const rows = Array.isArray(source[`__rows_${tabId}`]) ? source[`__rows_${tabId}`] : [];
      return rows.some((row) => Object.entries(row || {}).some(([key, value]) => key !== "_rowId" && String(value ?? "").trim() !== ""));
    }
    const fields = MY_INFO_TABS.find((item) => item.id === tabId)?.fields || [];
    return fields.some(([name]) => String(source[name] ?? "").trim() !== "") || (tabId === "PAN" && Boolean(source.panConfirmed));
  };
  const save = (event) => {
    event.preventDefault();
    try {
      const hasContent = hasSavedContent(values, activeTab);
      const nextSavedTabs = hasContent
        ? [...new Set([...savedTabs, activeTab])]
        : savedTabs.filter((item) => item !== activeTab);
      const nextValues = { ...values, __savedTabs: nextSavedTabs };
      localStorage.setItem(storageKey, JSON.stringify(nextValues));
      setValues(nextValues);
      setEditing((current) => ({ ...current, [activeTab]: false }));
      setMessage(hasContent ? "Record Updated" : "No Records Updated");
    } catch {
      setMessage("Could not save information. Please try again.");
    }
  };
  const beginEdit = () => {
    if (MULTI_INFO_TABS.includes(activeTab) && !(Array.isArray(values[`__rows_${activeTab}`]) && values[`__rows_${activeTab}`].length)) {
      setValues((current) => ({ ...current, [`__rows_${activeTab}`]: [makeInfoRow(activeTab)] }));
    }
    setEditing((current) => ({ ...current, [activeTab]: true })); setMessage("");
  };
  const cancelEdit = () => {
    try { setValues(JSON.parse(localStorage.getItem(storageKey) || "{}")); } catch { setValues({}); }
    setEditing((current) => ({ ...current, [activeTab]: false }));
    setMessage("");
  };
  const readOnly = !isEditing;
  const hideStatus = activeTab === "Personal" || activeTab === "Blood Group" || activeTab === "PAN";
  const renderField = ([name, label, type = "text", options], row = null) => {
    const value = row ? (row[name] || "") : (values[name] || "");
    const change = (next) => row ? rowFields(row, name, next) : setField(name, next);
    return <label className="employee-my-info-field" key={name}>
      <span>{label}{["dateOfBirth", "firstName", "lastName", "personalEmail", "mobileNumber"].includes(name) ? <b> *</b> : null}</span>
      {type === "select" ? <select disabled={readOnly} value={value} onChange={(event) => change(event.target.value)} required={isEditing && name === "bloodGroup"}>
        <option value="">Select {label}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select> : <input disabled={readOnly} type={type} value={value} onChange={(event) => change(event.target.value)} required={isEditing && !row && ["dateOfBirth", "firstName", "lastName", "personalEmail", "mobileNumber"].includes(name)} />}
    </label>;
  };
  const renderInlineField = ([name, label, type = "text", options], row = null) => {
    const value = row ? (row[name] || "") : (values[name] || "");
    const change = (next) => row ? rowFields(row, name, next) : setField(name, next);
    return type === "select"
      ? <select className="employee-my-info-table-input" disabled={readOnly} value={value} onChange={(event) => change(event.target.value)}>
          <option value="">Select {label}</option>{(options || []).map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      : <input className="employee-my-info-table-input" disabled={readOnly} type={type} value={value} onChange={(event) => change(event.target.value)} />;
  };
  return (
    <section className={`panel employee-my-info-panel ${["Blood Group", "PAN"].includes(activeTab) ? "employee-my-info-plain-tab" : ""}`}>
      <nav className="employee-my-info-tabs" role="tablist" aria-label="My information sections">
        {MY_INFO_TABS.map((item) => <button key={item.id} type="button" role="tab" aria-selected={activeTab === item.id}
          className={activeTab === item.id ? "employee-my-info-tab active" : "employee-my-info-tab"}
          onClick={() => { setActiveTab(item.id); setMessage(""); }}>{item.id}</button>)}
      </nav>
      {activeTab === "Personal" && <div className="employee-my-info-employee-details">
        <div className="employee-my-info-section-title"><strong>Employee Details</strong></div>
        <div className="employee-my-info-employee-grid">
          <div><strong>Employee ID</strong><span>{employee?.employeeId || "Auto-generated"}</span></div>
          <div><strong>Employee Name</strong><span>{displayName}</span></div>
          <div><strong>Company</strong><span>{company}</span></div>
          <div><strong>Region</strong><span>{region}</span></div>
          <div><strong>Date of Joining</strong><span>{formattedJoiningDate}</span></div>
        </div>
      </div>}
      <form className={`employee-my-info-form ${["Bio Graphical", "Family", "Address", "Communication", "Identity Details", "Education"].includes(activeTab) ? "employee-my-info-form-boxed" : ""}`} onSubmit={save}>
        <div className="employee-my-info-section-title"><strong>{tab.title}</strong>
          {activeTab === "Family" && isEditing && <button type="button" className="employee-my-info-add-row" onClick={addRow}><Plus size={15}/> Add New</button>}
          {activeTab === "Address" && isEditing && <button type="button" className="employee-my-info-add-row" onClick={addRow}><Plus size={15}/> Add New</button>}
          {activeTab === "Education" && isEditing && <button type="button" className="employee-my-info-add-row" onClick={addRow}><Plus size={15}/> Add New</button>}
        </div>
        {!["Personal", "Blood Group", "PAN"].includes(activeTab) && (
          <div className="employee-my-info-data-table-wrap">
            <table className={`employee-my-info-data-table ${isEditing ? "is-editing" : ""}`}>
              <thead><tr>
                {MULTI_INFO_TABS.includes(activeTab) && <th>Action</th>}
                {activeTab === "Bio Graphical" && <th>Employee ID</th>}
                {tab.fields.map((field) => <th key={field[0]}>{field[1]}</th>)}
                {activeTab === "Education" && <th>Attachment</th>}
                <th>Status</th>
              </tr></thead>
              <tbody>
                {MULTI_INFO_TABS.includes(activeTab) ? (
                  (isEditing ? multiRows : multiRows.filter((row) => Object.entries(row || {}).some(([key, value]) => key !== "_rowId" && String(value ?? "").trim() !== ""))).map((row) => (
                    <tr key={row._rowId}>
                      <td>{isEditing ? <button type="button" className="employee-my-info-remove-row table-row-action" onClick={() => removeRow(row._rowId)}><Trash2 size={14}/> Remove</button> : "—"}</td>
                      {tab.fields.map(([name, label, type = "text", options]) => <td key={name}>{isEditing ? renderInlineField([name, label, type, options], row) : (row[name] || "—")}</td>)}
                      {activeTab === "Education" && <td>{isEditing ? <input className="employee-my-info-table-input" type="file" onChange={(event) => { const file = event.target.files?.[0]; if (file) setUploads((current) => ({ ...current, [row._rowId]: file.name })); }} /> : (uploads[row._rowId] || "—")}</td>}
                      <td><span className="employee-my-info-message" role="status">{message || (hasSavedContent(values, activeTab) ? "Record Updated" : "No Records Updated")}</span></td>
                    </tr>
                  ))
                ) : (
                  hasSavedContent(values, activeTab) || isEditing ? <tr>
                    {activeTab === "Bio Graphical" && <td>{employee?.employeeId || "Auto-generated"}</td>}
                    {tab.fields.map(([name, label, type = "text", options]) => <td key={name}>{isEditing ? renderInlineField([name, label, type, options]) : (values[name] || "—")}</td>)}
                    <td><span className="employee-my-info-message" role="status">{message || (hasSavedContent(values, activeTab) ? "Record Updated" : "No Records Updated")}</span></td>
                   </tr> : <tr><td colSpan={(activeTab === "Bio Graphical" ? tab.fields.length + 2 : tab.fields.length + 1)} className="employee-my-info-table-empty">No Records Updated</td></tr>
                )}
                {MULTI_INFO_TABS.includes(activeTab) && !(isEditing ? multiRows.length : multiRows.some((row) => Object.entries(row || {}).some(([key, value]) => key !== "_rowId" && String(value ?? "").trim() !== ""))) && <tr><td colSpan={tab.fields.length + (activeTab === "Education" ? 3 : 2)} className="employee-my-info-table-empty">No Records Updated</td></tr>}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "Personal" && <div className="employee-my-info-fields">{tab.fields.map((field) => renderField(field))}</div>}
        {activeTab === "Blood Group" && <div className="employee-my-info-fields">{tab.fields.map((field) => renderField(field))}</div>}
        {activeTab === "PAN" && <><div className="employee-my-info-fields">{tab.fields.map((field) => renderField(field))}</div><label className="employee-my-info-confirm"><input disabled={readOnly} type="checkbox" checked={Boolean(values.panConfirmed)} onChange={(event) => setField("panConfirmed", event.target.checked)} /> I confirm that the information entered above is correct.</label></>}
        {!hideStatus && <div className="employee-my-info-actions">
          {isEditing ? <><button type="button" className="secondary-btn employee-my-info-edit-button" onClick={cancelEdit}>Cancel</button><button type="submit" className="primary-small">{activeTab === "Personal" ? "Submit" : "Save"}</button></> : <button type="button" className="secondary-btn employee-my-info-edit-button" onClick={beginEdit}><Pencil size={15}/> Edit</button>}
        </div>}
        {hideStatus && <div className="employee-my-info-actions employee-my-info-no-status">
          {isEditing ? <><button type="button" className="secondary-btn employee-my-info-edit-button" onClick={cancelEdit}>Cancel</button><button type="submit" className="primary-small">{activeTab === "Personal" ? "Submit" : "Save"}</button></> : <button type="button" className="secondary-btn employee-my-info-edit-button" onClick={beginEdit}><Pencil size={15}/> Edit</button>}
        </div>}
      </form>
    </section>
  );
}
function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function isWeekend(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}
function getWeekStartKey(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const offset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - offset);
  return getLocalDateKey(start);
}
function formatMinuteRange(start, end) {
  const format = (minutes) => {
    const hour24 = Math.floor(minutes / 60) % 24;
    const minute = minutes % 60;
    const suffix = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 || 12;
    return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
  };
  return `${format(start)}–${format(end)}`;
}
function getWeekIndex(date) { const first = new Date(date.getFullYear(), date.getMonth(), 1); return Math.max(0, Math.floor((date.getDate() - 1 + first.getDay()) / 7)); }
function getSundayWeekStart(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  start.setDate(start.getDate() - start.getDay());
  start.setHours(12, 0, 0, 0);
  return start;
}
function getTimesheetWeekOptions(referenceDate = new Date()) {
  const currentStart = getSundayWeekStart(referenceDate);
  return Array.from({ length: 53 }, (_, index) => {
    const start = new Date(currentStart);
    start.setDate(start.getDate() + (12 - index) * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const format = (value) => value.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    return { value: getLocalDateKey(start), label: `${format(start)} - ${format(end)}` };
  });
}
function formatTimesheetWeekRange(date) {
  const start = getSundayWeekStart(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const format = (value) => value.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `${format(start)} – ${format(end)}`;
}
function getWeekRange(year, month, weekIndex) {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay() + weekIndex * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return `${start.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} – ${end.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`;
}
function TimesheetTable({ timesheets, admin = false, onStatus, onDelete }) {
  const [viewTimesheet, setViewTimesheet] = useState(null);
  if (!timesheets.length) return <EmptyState text={admin ? "No timesheets submitted yet." : "No submitted timesheets yet."} />;
  const getTimesheetDays = (item) => {
    const start = item.weekStartDate
      ? new Date(`${item.weekStartDate}T12:00:00`)
      : getSundayWeekStart(new Date(item.year, item.month, 1 - new Date(item.year, item.month, 1).getDay() + (item.week || 0) * 7));
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  };
  return <>
    <div className="table-wrap"><table className="submitted-timesheet-table"><thead><tr><th>Employee Name / ID</th><th>Period</th><th>Batch</th><th>Status</th>{admin ? <th>Action</th> : <th className="timesheet-delete-heading">Actions</th>}</tr></thead><tbody>
      {timesheets.map((item) => <tr key={item.id}><td><strong>{item.employeeName || "Employee"}</strong><span className="cell-subtitle">{item.employeeId || "—"}</span></td><td>{getWeekRange(item.year, item.month, item.week)}<span className="cell-subtitle">Submitted for Week {item.week + 1}</span></td><td>{item.batch || item.rows?.find((row) => row.shift)?.shift || "General Batch"}</td><td><span className={`status-pill ${String(item.status || "Pending").toLowerCase()}`}>{item.status || "Pending"}</span></td>{admin ? <td><div className="inline-actions timesheet-row-actions"><button type="button" className="table-action" onClick={() => setViewTimesheet(item)}>View</button>{item.status === "Pending" && <><button type="button" className="table-action" onClick={() => onStatus(item.id, "Approved")}>Approve</button><button type="button" className="table-action danger" onClick={() => onStatus(item.id, "Rejected")}>Reject</button></>}</div></td> : <td className="timesheet-delete-cell"><div className="timesheet-row-actions"><button type="button" className="table-action" onClick={() => setViewTimesheet(item)}>View</button><button type="button" className="timesheet-delete-button" title="Delete submitted timesheet" aria-label={`Delete timesheet for ${getWeekRange(item.year, item.month, item.week)}`} onClick={() => { if (window.confirm("Delete this submitted timesheet? This action cannot be undone.")) onDelete?.(item.id); }}><Trash2 size={17} /></button></div></td>}</tr>)}
    </tbody></table></div>
    {viewTimesheet && <div className="timesheet-view-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setViewTimesheet(null); }}>
      <section className="timesheet-view-modal" role="dialog" aria-modal="true" aria-labelledby="timesheet-view-title">
        <div className="timesheet-view-heading"><div><h2 id="timesheet-view-title">Timesheet Details</h2><p>{viewTimesheet.employeeName ? `${viewTimesheet.employeeName} (${viewTimesheet.employeeId || "No ID"}) · ` : ""}{getWeekRange(viewTimesheet.year, viewTimesheet.month, viewTimesheet.week)}</p></div><button type="button" className="timesheet-view-close" onClick={() => setViewTimesheet(null)} aria-label="Close timesheet details">×</button></div>
        <div className="timesheet-view-meta"><span><strong>Batch:</strong> {viewTimesheet.batch || viewTimesheet.rows?.find((row) => row.shift)?.shift || "General Batch"}</span><span><strong>Approver:</strong> Admin</span><span><strong>Status:</strong> {viewTimesheet.status || "Pending"}</span></div>
        <div className="timesheet-view-content"><table className="timesheet-view-table"><thead><tr><th>Date</th><th>Day Type</th><th>Daily Activity</th><th>Hours</th><th>Remarks</th><th>Attachment</th></tr></thead><tbody>
          {(viewTimesheet.rows || []).flatMap((row, rowIndex) => getTimesheetDays(viewTimesheet).map((date, dayIndex) => { const name=(row.fileNameByDay || [])[dayIndex] || (dayIndex===0 ? row.fileName : "") || ""; const data=(row.fileDataByDay || [])[dayIndex] || (dayIndex===0 ? row.fileData : "") || ""; return <tr key={`${rowIndex}-${dayIndex}`}><td>{date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}<span className="cell-subtitle">{date.toLocaleDateString("en-IN", { weekday: "long" })}</span></td><td>{row.dayTypes?.[dayIndex] || ((date.getDay() === 0 || date.getDay() === 6) ? "Holiday" : "Work Day")}</td><td>{row.activityByDay?.[dayIndex] || (dayIndex===0 ? row.activity : "") || "—"}</td><td>{row.hours?.[dayIndex] || "—"}</td><td>{row.remarksByDay?.[dayIndex] || (dayIndex===0 ? row.remarks : "") || "—"}</td><td>{name ? (data ? <a className="timesheet-view-file" href={data} target="_blank" rel="noreferrer"><Paperclip size={14} /> View {name}</a> : <span className="timesheet-view-file"><Paperclip size={14} /> {name}</span>) : "—"}</td></tr>; }))}
        </tbody></table></div>
        <div className="timesheet-view-footer"><span>View-only · Editing is disabled</span><button type="button" className="primary-small" onClick={() => setViewTimesheet(null)}>Close</button></div>
      </section>
    </div>}
  </>;
}
function AuthMessagePage({ icon, title, message, onBack }) {
  return (
    <div className="auth-page">
      <section className="auth-area">
        <div className="auth-card approval-wait-card">
          {icon}
          <h2>{title}</h2>
          <p>{message}</p>
          <button type="button" className="secondary-btn" onClick={onBack}>Back to Login</button>
        </div>
      </section>
    </div>
  );
}
function StatCard({ icon, label, value, color }) {
  return <div className="stat-card"><div className={"stat-icon " + color}>{icon}</div><p>{label}</p><h3>{value ?? 0}</h3></div>;
}
function SearchBar({ value, onChange, placeholder = "Search name, email, ID or mobile..." }) {
  return <div className="search-wrap"><Search size={18} /><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} /></div>;
}
function ApprovalTable({ employees, onApprove, onReject, rejected = false, onDelete }) {
  if (!employees.length) return <EmptyState text={rejected ? "No rejected employee requests." : "No pending employee requests."} />;
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Employee</th><th>Email</th><th>Mobile</th><th>Position</th><th>Joining code</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.email}>
              <td><strong>{String(employee.name || "").toLowerCase().replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())}</strong><span className="cell-subtitle">DOB: {employee.dob}</span></td>
              <td>{employee.email}</td><td>{employee.mobile}</td><td>{employee.role}</td>
              <td><strong>{employee.joiningCode}</strong></td>
              <td><span className={`status-pill ${rejected ? "rejected" : "pending"}`}>{employee.status}</span></td>
              <td>{rejected ? <details className="approval-row-menu"><summary aria-label={`Actions for ${employee.name}`} title="More actions">⋮</summary><div className="approval-row-menu-items"><button type="button" onClick={() => onApprove(employee.email, true)}>Approve</button><button type="button" className="danger" onClick={() => { if (window.confirm("Delete this rejected signup request?")) onDelete(employee.email); }}>Delete</button></div></details> : <div className="inline-actions"><button className="table-action" onClick={() => onApprove(employee.email)}>Approve</button><button className="table-action danger" onClick={() => onReject(employee.email)}>Reject</button></div>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function EmployeeTable({ employees, onToggle, onDelete, onOpenChat }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [employeeInfoTab, setEmployeeInfoTab] = useState("Employee Details");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [chatEmployee, setChatEmployee] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatDraft, setChatDraft] = useState("");
  const titleCase = (value) => String(value || "").toLowerCase().replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
  const todayKey = getLocalDateKey(new Date());
  const showEmployeeInfo = (employee) => {
    const storageKey = `wt_employee_my_info_${String(employee.employeeId || employee.email || "employee").replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    const info = (() => {
      try {
        return JSON.parse(localStorage.getItem(storageKey) || "{}");
      } catch {
        return {};
      }
    })();
    setEmployeeInfo(info);
    setEmployeeInfoTab("Employee Details");
    setSelectedEmployee(employee);
    setOpenMenuId(null);
  };
  const employeeChatKey = (employee) => `wt_employee_admin_chat_${String(employee?.employeeId || employee?.email || "employee").replace(/[^a-zA-Z0-9_-]/g, "_")}`;
  const openEmployeeChat = (employee) => {
    setChatEmployee(employee);
    setChatDraft("");
    const messages = readStore(employeeChatKey(employee), []);
    const markedRead = messages.map((item) => item.from === "Employee" ? item : { ...item, readByAdmin: true });
    saveStore(employeeChatKey(employee), markedRead);
    setChatMessages(markedRead);
    setOpenMenuId(null);
  };
  void openEmployeeChat;
  useEffect(() => {
    if (!chatEmployee) return undefined;
    const syncChat = () => setChatMessages(readStore(employeeChatKey(chatEmployee), []));
    window.addEventListener("storage", syncChat);
    window.addEventListener("wt_employee_chat_updated", syncChat);
    return () => {
      window.removeEventListener("storage", syncChat);
      window.removeEventListener("wt_employee_chat_updated", syncChat);
    };
  }, [chatEmployee]);
  const sendEmployeeChat = (event) => {
    event.preventDefault();
    const message = chatDraft.trim();
    if (!message || !chatEmployee) return;
    const next = [...readStore(employeeChatKey(chatEmployee), []), {
      id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      from: "Admin",
      senderName: "Administrator",
      senderId: "Admin",
      message,
      createdAt: new Date().toISOString(),
      readByAdmin: true,
      readByEmployee: false
    }];
    saveStore(employeeChatKey(chatEmployee), next);
    setChatMessages(next);
    setChatDraft("");
    window.dispatchEvent(new Event("wt_employee_chat_updated"));
    const notices = readStore("wt_notifications", []);
    saveStore("wt_notifications", [{
      id: `employee-chat-admin-${chatEmployee.employeeId}-${Date.now()}`,
      audience: "employee",
      employeeId: chatEmployee.employeeId,
      kind: "admin-chat",
      title: "New admin chat message",
      message: `Administrator sent you a message.`,
      isNew: true,
      createdAt: new Date().toISOString()
    }, ...notices]);
  };
  if (!employees.length) return <EmptyState text="No employees found." />;
  return (
    <>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Employee</th><th>Employee ID</th><th>Employee Attendance</th><th>Position</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {employees.map((employee) => {
              const markedToday = (employee.attendanceRecords || []).some((record) => record.date === todayKey && (record.checkIn || record.status === "Present"));
              return <tr key={employee.employeeId}>
                <td><div className="table-person"><div className="avatar small-avatar">{titleCase(employee.name).charAt(0)}</div><div><strong>{titleCase(employee.name)}</strong><span>{employee.email}</span></div></div></td>
                <td>{employee.employeeId}</td>
                <td><span className={`employee-attendance-status ${markedToday ? "marked" : "not-marked"}`}>{markedToday ? "Attendance Marked" : "Attendance Not Marked"}</span></td>
                <td>{employee.role || "—"}</td>
                <td><span className={"status-pill " + (employee.status === "Blocked" ? "blocked" : "")}>{employee.status}</span></td>
                <td className="employee-directory-actions">
                  <button type="button" className="employee-directory-menu-trigger" aria-label={`Actions for ${employee.name}`} title="More actions" onClick={() => setOpenMenuId(openMenuId === employee.employeeId ? null : employee.employeeId)}>⋮</button>
                  {openMenuId === employee.employeeId && <div className="employee-directory-menu"><button type="button" onClick={() => showEmployeeInfo(employee)}>Employee Info</button><button type="button" onClick={() => { onOpenChat?.(employee); setOpenMenuId(null); }}>ChatBox</button><button type="button" onClick={() => { onToggle(employee.employeeId); setOpenMenuId(null); }}>{employee.status === "Blocked" ? "Unblock" : "Block"}</button><button type="button" className="danger" onClick={() => { if (window.confirm(`Delete employee ${titleCase(employee.name)} (${employee.employeeId})? This cannot be undone.`)) { onDelete(employee.employeeId); setOpenMenuId(null); if (chatEmployee?.employeeId === employee.employeeId) setChatEmployee(null); } }}>Delete</button></div>}
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      {selectedEmployee && <div className="employee-info-modal-backdrop" role="presentation" onClick={() => setSelectedEmployee(null)}>
        <section className="employee-info-modal" role="dialog" aria-modal="true" aria-label={`${titleCase(selectedEmployee.name)} employee information`} onClick={(event) => event.stopPropagation()}>
          <div className="employee-info-modal-heading"><div><h2>Employee Info</h2><p>{titleCase(selectedEmployee.name)} · {selectedEmployee.employeeId}</p></div><button type="button" onClick={() => setSelectedEmployee(null)} aria-label="Close employee information">×</button></div>
          <nav className="employee-info-tabs" role="tablist" aria-label="Employee information sections">
            <button type="button" role="tab" aria-selected={employeeInfoTab === "Employee Details"} className={employeeInfoTab === "Employee Details" ? "active" : ""} onClick={() => setEmployeeInfoTab("Employee Details")}>Employee Details</button>
            {MY_INFO_TABS.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={employeeInfoTab === tab.id} className={employeeInfoTab === tab.id ? "active" : ""} onClick={() => setEmployeeInfoTab(tab.id)}>{tab.id}</button>)}
          </nav>
          <div className="employee-info-modal-body">
            {employeeInfoTab === "Employee Details" ? <section className="employee-info-detail-section"><h3>Employee Details</h3><div className="employee-info-table-wrap"><table className="employee-info-table"><thead><tr><th>Employee Name</th><th>Employee ID</th><th>Official Email</th><th>Mobile</th><th>Position</th><th>Batch</th><th>Date of Joining</th><th>Date of Birth</th><th>Company</th></tr></thead><tbody><tr><td>{titleCase(selectedEmployee.name) || "—"}</td><td>{selectedEmployee.employeeId || "—"}</td><td>{selectedEmployee.email || "—"}</td><td>{selectedEmployee.mobile || "—"}</td><td>{selectedEmployee.role || "—"}</td><td>{selectedEmployee.attendanceBatch || "General Batch"}</td><td>{formatDate(selectedEmployee.approvedAt || selectedEmployee.createdAt?.slice(0,10))}</td><td>{selectedEmployee.dob || "—"}</td><td>{"WorkTrack Solutions"}</td></tr></tbody></table></div></section> : (() => {
              const tab = MY_INFO_TABS.find((item) => item.id === employeeInfoTab);
              if (!tab) return null;
              const multi = ["Family", "Address", "Education"].includes(tab.id);
              const rawRows = Array.isArray(employeeInfo?.[`__rows_${tab.id}`]) ? employeeInfo[`__rows_${tab.id}`] : [];
              const rows = multi ? rawRows.filter((row) => Object.entries(row || {}).some(([key, value]) => key !== "_rowId" && String(value ?? "").trim() !== "")) : [];
              const hasData = multi ? rows.length > 0 : tab.fields.some(([name]) => String(employeeInfo?.[name] ?? "").trim() !== "") || (tab.id === "PAN" && Boolean(employeeInfo?.panConfirmed));
              const columns = tab.fields.map(([name, label]) => ({ name, label }));
              if (tab.id === "PAN" && employeeInfo?.panConfirmed) columns.push({ name: "panConfirmed", label: "Confirmation" });
              return <section className="employee-info-detail-section" key={tab.id}><h3>{tab.title}</h3><div className="employee-info-table-wrap"><table className="employee-info-table"><thead><tr>{columns.map((column) => <th key={column.name}>{column.label}</th>)}</tr></thead><tbody>{hasData ? (multi ? rows : [employeeInfo || {}]).map((row, index) => <tr key={row._rowId || index}>{columns.map((column) => <td key={column.name}>{column.name === "panConfirmed" ? (row.panConfirmed ? "Confirmed" : "—") : (row[column.name] || "—")}</td>)}</tr>) : <tr><td colSpan={columns.length || 1} className="employee-info-empty-cell">No Records Updated</td></tr>}</tbody></table></div></section>;
            })()}
          </div>
          <div className="employee-info-modal-footer"><button type="button" className="primary-small" onClick={() => setSelectedEmployee(null)}>Close</button></div>
        </section>
      </div>}
      {chatEmployee && <div className="employee-chat-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setChatEmployee(null); }}>
        <section className="employee-chat-modal" role="dialog" aria-modal="true" aria-label={`Chat with ${titleCase(chatEmployee.name)}`} onMouseDown={(event) => event.stopPropagation()}>
          <header className="employee-chat-header">
            <div><h2>Employee ChatBox</h2><p>{titleCase(chatEmployee.name)} · {chatEmployee.employeeId || "No ID"} · {chatEmployee.role || "Employee"}</p></div>
            <button type="button" aria-label="Close chat" onClick={() => setChatEmployee(null)}>×</button>
          </header>
          <div className="employee-chat-profile-grid">
            <span><strong>Employee Name</strong>{titleCase(chatEmployee.name) || "—"}</span>
            <span><strong>Employee ID</strong>{chatEmployee.employeeId || "—"}</span>
            <span><strong>Position</strong>{chatEmployee.role || "—"}</span>
            <span><strong>Official Mail</strong>{chatEmployee.email || "—"}</span>
            <span><strong>Batch</strong>{chatEmployee.attendanceBatch || "General Batch"}</span>
            <span><strong>Date of Joining</strong>{formatDate(chatEmployee.approvedAt || chatEmployee.createdAt?.slice(0,10))}</span>
          </div>
          <div className="employee-chat-title"><strong>ChatBox (Admin)</strong><span>{chatEmployee.employeeId || ""}</span></div>
          <div className="employee-chat-thread">
            {chatMessages.map((item) => <article key={item.id} className={item.from === "Admin" ? "admin-message" : "employee-message"}>
              <strong>{item.from === "Admin" ? "Admin" : `${item.senderName || chatEmployee.name} (${item.senderId || chatEmployee.employeeId})`}</strong>
              <p>{item.message}</p><small>{item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : ""}</small>
            </article>)}
            {!chatMessages.length && <p className="employee-chat-empty">No messages yet. Start a conversation.</p>}
          </div>
          <form className="employee-chat-compose" onSubmit={sendEmployeeChat}>
            <input value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} placeholder="Type your Message..." aria-label="Type your Message" />
            <button type="submit" aria-label="Send message" title="Send message" disabled={!chatDraft.trim()}><span aria-hidden="true">➤</span></button>
          </form>
          <footer className="employee-chat-footer"><button type="button" className="primary-small" onClick={() => setChatEmployee(null)}>Close</button></footer>
        </section>
      </div>}
    </>
  );
}
function AdminChatCenter({ employees, initialEmployeeId = "", onInitialEmployeeOpened }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const chatKey = (employee) => `wt_employee_admin_chat_${String(employee?.employeeId || employee?.email || "employee").replace(/[^a-zA-Z0-9_-]/g, "_")}`;
  const unreadCount = (employee) => readStore(chatKey(employee), []).filter((item) => item.from === "Employee" && !item.readByAdmin).length;
  const openChat = (employee) => {
    const current = readStore(chatKey(employee), []);
    const read = current.map((item) => item.from === "Employee" ? { ...item, readByAdmin: true } : item);
    saveStore(chatKey(employee), read);
    setSelectedEmployee(employee);
    setMessages(read);
    setDraft("");
    setAttachment(null);
    window.dispatchEvent(new Event("wt_employee_chat_updated"));
  };
  useEffect(() => {
    if (!initialEmployeeId) return undefined;
    const timer = window.setTimeout(() => {
      const employee = employees.find((item) => item.employeeId === initialEmployeeId);
      if (employee) {
        const key = `wt_employee_admin_chat_${String(employee.employeeId || employee.email || "employee").replace(/[^a-zA-Z0-9_-]/g, "_")}`;
        const current = readStore(key, []);
        const read = current.map((item) => item.from === "Employee" ? { ...item, readByAdmin: true } : item);
        saveStore(key, read);
        setSelectedEmployee(employee);
        setMessages(read);
        setDraft("");
        setAttachment(null);
        window.dispatchEvent(new Event("wt_employee_chat_updated"));
      }
      onInitialEmployeeOpened?.();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialEmployeeId, employees, onInitialEmployeeOpened]);
  useEffect(() => {
    if (!selectedEmployee) return undefined;
    const sync = () => {
      const latest = readStore(chatKey(selectedEmployee), []);
      setMessages(latest);
    };
    window.addEventListener("storage", sync);
    window.addEventListener("wt_employee_chat_updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("wt_employee_chat_updated", sync);
    };
  }, [selectedEmployee]);
  const send = (event) => {
    event.preventDefault();
    const message = draft.trim();
    if ((!message && !attachment) || !selectedEmployee) return;
    const key = chatKey(selectedEmployee);
    const next = [...readStore(key, []), {
      id: `chat-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      from: "Admin", senderName: "Administrator", senderId: "Admin",
      message, attachmentName: attachment?.name || "", attachmentData: attachment?.data || "", attachmentType: attachment?.type || "",
      createdAt: new Date().toISOString(), readByAdmin: true, readByEmployee: false
    }];
    saveStore(key, next);
    setMessages(next);
    setDraft("");
    setAttachment(null);
    window.dispatchEvent(new Event("wt_employee_chat_updated"));
    const notices = readStore("wt_notifications", []);
    saveStore("wt_notifications", [{
      id: `employee-chat-admin-${selectedEmployee.employeeId}-${Date.now()}`,
      audience: "employee", employeeId: selectedEmployee.employeeId, kind: "admin-chat",
      title: "New admin chat message", message: "Administrator sent you a message.",
      isNew: true, createdAt: new Date().toISOString()
    }, ...notices]);
  };
  const filteredEmployees = employees.filter((employee) => {
    const query = employeeSearch.trim().toLowerCase();
    if (!query) return true;
    return [employee.name, employee.employeeId]
      .some((value) => String(value || "").toLowerCase().includes(query));
  });
  return (
    <section className="admin-chat-center">
      <div className="panel-heading admin-chat-center-heading">
        <div><h3>Employee ChatBox</h3></div>
        <input className="admin-chat-search admin-chat-top-search" value={employeeSearch} onChange={(event) => setEmployeeSearch(event.target.value)} placeholder="Search" aria-label="Search employee name or ID" />
      </div>
      <div className="admin-chat-center-grid">
        <aside className="admin-chat-employee-list">
          <h4>Employees</h4>
          {filteredEmployees.map((employee) => (
            <button type="button" key={employee.employeeId} className={`admin-chat-employee ${selectedEmployee?.employeeId === employee.employeeId ? "active" : ""}`} onClick={() => openChat(employee)}>
              <span className="avatar small-avatar">{String(employee.name || "E").charAt(0).toUpperCase()}</span>
              <span className="admin-chat-employee-copy"><strong>{employee.name}</strong><small>{employee.employeeId}</small></span>
              {unreadCount(employee) > 0 && <span className="nav-notification-dot" title="Unread employee message" />}
            </button>
          ))}
          {!filteredEmployees.length && <p className="muted">No employees found.</p>}
        </aside>
        <section className="admin-chat-conversation">
          {selectedEmployee ? <>
            <header className="admin-chat-conversation-header">
              <div className="avatar">{String(selectedEmployee.name || "E").charAt(0).toUpperCase()}</div>
              <div><h4>{selectedEmployee.name}</h4><p>{selectedEmployee.employeeId}</p></div>
            </header>
            <div className="employee-chat-thread admin-chat-center-thread">
              {messages.map((item) => <article key={item.id} className={item.from === "Admin" ? "admin-message" : "employee-message"}>
                <strong>{item.from === "Admin" ? "Admin" : `${item.senderName || selectedEmployee.name} (${item.senderId || selectedEmployee.employeeId})`}</strong>
                {item.message && <p>{item.message}</p>}
                {item.attachmentData && <a className="chat-attachment-link" href={item.attachmentData} target="_blank" rel="noreferrer">📎 {item.attachmentName || "Open attachment"}</a>}
                <small>{item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : ""}</small>
              </article>)}
              {!messages.length && <p className="employee-chat-empty">No messages yet. Start the conversation.</p>}
            </div>
            <form className="employee-chat-compose employee-chat-compose-with-attachment" onSubmit={send}>
              <label className="chat-attachment-upload">Attachments · Upload files
                <input type="file" onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) { setAttachment(null); return; }
                  const reader = new FileReader();
                  reader.onload = () => setAttachment({ name: file.name, type: file.type, data: String(reader.result || "") });
                  reader.readAsDataURL(file);
                }} />
              </label>
              {attachment && <span className="chat-selected-attachment">Selected: {attachment.name}</span>}
              <div className="chat-compose-row"><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type your Message..." aria-label="Type your Message" />
              <button type="submit" aria-label="Send message" title="Send message" disabled={!draft.trim() && !attachment}><span aria-hidden="true">➤</span></button></div>
            </form>
          </> : <div className="admin-chat-select-empty"><MessageCircle size={36}/><h4>Select an employee</h4></div>}
        </section>
      </div>
    </section>
  );
}
function TaskTable({ tasks, employees = [], admin = false, onUpdate, emptyText }) {
  const [drafts, setDrafts] = useState({});
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const [reassignTarget, setReassignTarget] = useState(null);
  const [reassignDeadline, setReassignDeadline] = useState("");
  if (!tasks.length) return <EmptyState text={emptyText || (admin ? "No tasks available yet." : "No task is assigned from administrator.")} />;
  const getEmployee = (id) => employees.find((employee) => employee.employeeId === id);
  const getDraft = (task) => drafts[task.id] || {
    progress: Number(task.progress || 0),
    workNote: task.workNote || "",
    attachmentName: task.attachmentName || "",
    attachmentData: task.attachmentData || "",
  };
  const changeDraft = (task, changes) => setDrafts((previous) => ({
    ...previous,
    [task.id]: { ...getDraft(task), ...changes },
  }));
  const saveTaskDraft = (task) => {
    const draft = getDraft(task);
    onUpdate(task.id, {
      progress: Math.max(0, Math.min(100, Number(draft.progress) || 0)),
      workNote: draft.workNote,
      attachmentName: draft.attachmentName,
      attachmentData: draft.attachmentData,
      savedAt: new Date().toISOString(),
      actionable: task.actionable || false,
    });
    setDrafts((previous) => { const next = { ...previous }; delete next[task.id]; return next; });
  };
  const submitTask = (task) => {
    const draft = getDraft(task);
    if (Number(draft.progress) < 100) {
      window.alert("Please set progress to 100% before submitting the task.");
      return;
    }
    if (!draft.attachmentName || !draft.attachmentData) {
      window.alert("Please upload a task file or image before submitting.");
      return;
    }
    const submittedNow = new Date();
    const submittedAt = submittedNow.toISOString();
    const submissionDate = `${submittedNow.getFullYear()}-${String(submittedNow.getMonth() + 1).padStart(2, "0")}-${String(submittedNow.getDate()).padStart(2, "0")}`;
    const deadlinePassed = Boolean(task.deadline && submissionDate > task.deadline);
    onUpdate(task.id, {
      progress: 100,
      workNote: draft.workNote,
      attachmentName: draft.attachmentName,
      attachmentData: draft.attachmentData,
      status: "Submitted",
      submittedAt,
      lastSubmittedDate: submissionDate,
      actionable: deadlinePassed,
      actionableSince: deadlinePassed ? (task.actionableSince || submittedAt) : null,
      adminNotified: deadlinePassed ? (task.adminNotified || false) : false,
      rejectedAt: null,
      approvedAt: null,
      reviewNote: deadlinePassed ? `Submitted after deadline on ${submissionDate}. This task is recorded in Actionable.` : "",
    });
    setDrafts((previous) => { const next = { ...previous }; delete next[task.id]; return next; });
  };
  const approveTask = (task) => {
    if (!window.confirm(`Approve the submitted task “${task.title}”?`)) return;
    const now = new Date().toISOString();
    onUpdate(task.id, { status: "Approved", approvedAt: now, actionable: false, reviewNote: "Approved by administrator" });
    const notifications = readStore("wt_notifications", []);
    const notificationId = `TASK-COMPLETED-${task.id}-${now.slice(0, 10)}`;
    if (!notifications.some((item) => item.id === notificationId)) saveStore("wt_notifications", [{ id: notificationId, kind: "task", employeeId: task.employeeId, taskId: task.id, title: "Task completed", message: `Your task “${task.title}” was approved by the administrator and marked Completed.`, createdAt: now, isNew: true }, ...notifications]);
  };
  const reassignTask = (task) => {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    setReassignTarget(task);
    setReassignDeadline(task.deadline && task.deadline >= today ? task.deadline : today);
  };
  const confirmReassignTask = () => {
    if (!reassignTarget) return;
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const normalizedDeadline = String(reassignDeadline || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDeadline) || Number.isNaN(new Date(`${normalizedDeadline}T00:00:00`).getTime())) {
      window.alert("Please choose a valid new deadline.");
      return;
    }
    if (normalizedDeadline < today) {
      window.alert("The new deadline must be today or a future date.");
      return;
    }
    onUpdate(reassignTarget.id, {
      originalDeadline: reassignTarget.originalDeadline || reassignTarget.deadline || null,
      reassignedDeadline: normalizedDeadline,
      deadline: normalizedDeadline,
      status: "Pending",
      submittedAt: null,
      lastSubmittedDate: null,
      approvedAt: null,
      rejectedAt: null,
      actionable: false,
      actionableSince: null,
      adminNotified: false,
      reviewNote: `Reassigned with new deadline ${normalizedDeadline}. Please update and resubmit.`,
    });
    setReassignTarget(null);
    setReassignDeadline("");
  };
  const rejectTask = (task) => {
    const now = new Date();
    const submittedDate = task.lastSubmittedDate || (task.submittedAt ? task.submittedAt.slice(0, 10) : "");
    const submittedLate = Boolean(task.deadline && submittedDate && submittedDate > task.deadline);
    const mustBeActionable = submittedLate || Boolean(task.actionable);
    const note = mustBeActionable
      ? "Rejected after the deadline. This task is recorded in Actionable. Re-assign with a new deadline to allow resubmission."
      : "Rejected by administrator. Please update the task and resubmit before the deadline.";
    onUpdate(task.id, {
      status: "Rejected",
      rejectedAt: now.toISOString(),
      reviewNote: note,
      actionable: mustBeActionable,
      actionableSince: mustBeActionable ? (task.actionableSince || now.toISOString()) : null,
      adminNotified: mustBeActionable ? true : (task.adminNotified || false),
      submittedAt: task.submittedAt || null,
    });
    const taskNotifications = readStore("wt_notifications", []);
    const rejectionNotificationId = `TASK-REJECTED-${task.id}-${now.toISOString().slice(0, 10)}`;
    if (!taskNotifications.some((item) => item.id === rejectionNotificationId)) {
      saveStore("wt_notifications", [{ id: rejectionNotificationId, kind: "task", employeeId: task.employeeId, taskId: task.id, title: "Task rejected", message: `Your task “${task.title}” was rejected by the administrator. ${note}`, createdAt: now.toISOString(), isNew: true }, ...taskNotifications]);
    }
    if (mustBeActionable) {
      const alerts = readStore("wt_notifications", []);
      const alertId = `TASK-REJECTED-LATE-${task.id}`;
      if (!alerts.some((item) => item.id === alertId)) {
        saveStore("wt_notifications", [{
          id: alertId,
          title: "Task rejected after deadline",
          message: `${getEmployee(task.employeeId)?.name || task.employeeId}’s task “${task.title}” was rejected after its deadline (${task.deadline}) and is in Actionable records.`,
          taskId: task.id,
          createdAt: now.toISOString(),
        }, ...alerts]);
      }
    }
  };
  return (
    <div className="table-wrap task-table-wrap">
      <table className="task-table">
        <thead><tr><th>Task</th>{admin && <><th>Assigned to</th><th>Employee ID</th></>}<th>Deadline</th><th>Status</th><th>Progress</th>{admin && <><th>Attachment</th><th>Review</th></>}{!admin && <><th>Work update / Attachment</th><th>Actions</th></>}</tr></thead>
        <tbody>
          {tasks.map((task) => {
            const nowLocal = new Date();
            const todayKey = `${nowLocal.getFullYear()}-${String(nowLocal.getMonth() + 1).padStart(2, "0")}-${String(nowLocal.getDate()).padStart(2, "0")}`;
            const submissionDate = task.lastSubmittedDate || (task.submittedAt ? task.submittedAt.slice(0, 10) : "");
            const submittedLate = Boolean(task.deadline && submissionDate && submissionDate > task.deadline);
            const overdue = submittedLate || Boolean(task.deadline && task.deadline < todayKey && ((!task.submittedAt && task.status !== "Completed" && task.status !== "Approved") || task.status === "Rejected"));
            const deadlinePassedForSubmission = Boolean(task.deadline && task.deadline < todayKey && task.submittedAt);
            const canReassignRejectedTask = task.status === "Rejected" && (
              Boolean(task.actionable) || overdue || submittedLate || Boolean(task.deadline && task.deadline < todayKey)
            );
            const canEdit = !task.submittedAt || task.status === "Rejected";
            const draft = getDraft(task);
            return (
              <tr key={task.id} className={(task.status === "Completed" || (!admin && task.status === "Approved")) ? "completed-row" : overdue ? "overdue-row" : ""}>
                <td><strong>{task.title}</strong>{task.description && <span className="cell-subtitle">{task.description}</span>}{overdue && <span className="overdue-text">Deadline missed</span>}{submittedLate && <span className="overdue-text">Submitted after deadline: {formatDate(submissionDate)}</span>}{!admin && task.reviewNote && <span className="cell-subtitle">Admin note: {task.reviewNote}</span>}</td>
                {admin && <><td>{getEmployee(task.employeeId)?.name || task.employeeName || task.employeeId}</td><td>{task.employeeId || "—"}</td></>}
                <td>{task.reassignedDeadline ? <><span>{task.deadline || task.reassignedDeadline}</span><span className="cell-subtitle">Another deadline</span></> : (task.deadline || "—")}</td>
                <td><span className={"task-status " + String((!admin && task.status === "Approved") ? "Completed" : (task.status || "Pending")).toLowerCase().replaceAll(" ", "-")}>{(!admin && task.status === "Approved") ? "Completed" : (task.status || "Pending")}</span></td>
                <td><div className="progress-cell"><div className="progress-track"><div style={{ width: `${Math.max(0, Math.min(100, Number(task.progress || 0)))}%` }} /></div><span>{Number(task.progress || 0)}%</span></div></td>
                {admin && <>
                  <td className="task-attachment-cell">{task.attachmentData ? <><button type="button" className="task-attachment-link task-attachment-view-button" onClick={() => setPreviewAttachment({ name: task.attachmentName || "Task attachment", data: task.attachmentData, title: task.title })}>View file</button><a className="task-attachment-download" href={task.attachmentData} download={task.attachmentName || "task-attachment"}>Download</a><span className="cell-subtitle">{task.attachmentName}</span>{String(task.attachmentData).startsWith("data:image/") && <button type="button" className="task-attachment-preview-button" onClick={() => setPreviewAttachment({ name: task.attachmentName || "Task image", data: task.attachmentData, title: task.title })}><img className="task-attachment-preview" src={task.attachmentData} alt={`Attachment for ${task.title}`} /></button>}</> : <span className="cell-subtitle">No attachment</span>}</td>
                  <td className="task-review-cell">{task.status === "Submitted" ? <><button type="button" className="primary-small task-approve-btn" onClick={() => approveTask(task)}>Approve</button><button type="button" className="secondary-btn task-reject-btn" onClick={() => rejectTask(task)}>Reject</button>{(deadlinePassedForSubmission || task.actionable || submittedLate) && <button type="button" className="secondary-btn task-reassign-btn" onClick={() => reassignTask(task)}>Re-assign</button>}</> : canReassignRejectedTask ? <><span className="cell-subtitle">Rejected</span><button type="button" className="secondary-btn task-reassign-btn" onClick={() => reassignTask(task)}>Re-assign</button></> : <span className="cell-subtitle">{task.status === "Approved" ? "Reviewed and approved" : task.status === "Rejected" ? "Rejected" : "Waiting for submission"}</span>}</td>
                </>}
                {!admin && <>
                  <td className="task-update-cell">
                    <label className="task-progress-label">Progress: {Number(draft.progress || 0)}%</label>
                    <input aria-label={`Progress for ${task.title}`} className="task-progress-input" type="range" min="0" max="100" step="5" value={Number(draft.progress || 0)} disabled={!canEdit} onChange={(e) => changeDraft(task, { progress: Number(e.target.value) })} />
                    <textarea aria-label={`Work update for ${task.title}`} value={draft.workNote} disabled={!canEdit} onChange={(e) => changeDraft(task, { workNote: e.target.value })} placeholder="Describe work completed" rows={2} />
                    <label className="task-file-input">Upload file / image<input type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip" disabled={!canEdit} onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => changeDraft(task, { attachmentName: file.name, attachmentData: String(reader.result || "") });
                      reader.readAsDataURL(file);
                    }} /></label>
                    {draft.attachmentName && <span className="cell-subtitle">Selected: {draft.attachmentName}</span>}
                  </td>
                  <td className="task-actions-cell">
                    {canEdit ? <><button type="button" className="secondary-btn task-save-btn" onClick={() => saveTaskDraft(task)}>Save</button><button type="button" className="primary-small task-submit-btn" onClick={() => submitTask(task)}>Submit</button>{submissionDate && <span className="task-submitted-note">Last submitted: {formatDate(submissionDate)}</span>}</> : <span className="task-submitted-note">{submittedLate ? <>Submitted after the deadline<span className="cell-subtitle">Submitted on: {formatDate(submissionDate)}</span></> : task.status === "Approved" ? <>{admin ? "Approved" : "Completed"}<span className="cell-subtitle">Submitted on: {formatDate(submissionDate)}</span></> : task.status === "Rejected" ? <>Rejected<span className="cell-subtitle">Submitted on: {formatDate(submissionDate)}</span></> : <>Submitted on: {formatDate(submissionDate)}</>}</span>}
                  </td>
                </>}
              </tr>
            );
          })}
        </tbody>
      </table>
      {admin && reassignTarget && <div className="task-attachment-modal-backdrop" role="presentation" onClick={() => setReassignTarget(null)}>
        <section className="task-attachment-modal task-reassign-modal" role="dialog" aria-modal="true" aria-label={`Re-assign task ${reassignTarget.title}`} onClick={(event) => event.stopPropagation()}>
          <div className="task-attachment-modal-header"><div><h3>Re-assign task</h3><p>{reassignTarget.title} · {getEmployee(reassignTarget.employeeId)?.name || reassignTarget.employeeId}</p></div><button type="button" className="task-attachment-modal-close" aria-label="Close re-assign form" onClick={() => setReassignTarget(null)}>×</button></div>
          <div className="task-reassign-modal-body">
            <p>This will keep the same task and employee. Change the deadline so the employee can update and submit the task again.</p>
            <label htmlFor="task-reassign-deadline">New deadline <span aria-hidden="true">*</span></label>
            <input id="task-reassign-deadline" type="date" min={(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; })()} value={reassignDeadline} onChange={(event) => setReassignDeadline(event.target.value)} required />
          </div>
          <div className="task-attachment-modal-footer"><button type="button" className="secondary-btn" onClick={() => setReassignTarget(null)}>Cancel</button><button type="button" className="primary-small" onClick={confirmReassignTask}>Re-assign task</button></div>
        </section>
      </div>}
      {admin && previewAttachment && <div className="task-attachment-modal-backdrop" role="presentation" onClick={() => setPreviewAttachment(null)}>
        <section className="task-attachment-modal" role="dialog" aria-modal="true" aria-label={`Attachment preview: ${previewAttachment.name}`} onClick={(event) => event.stopPropagation()}>
          <div className="task-attachment-modal-header"><div><h3>{previewAttachment.name}</h3><p>{previewAttachment.title}</p></div><button type="button" className="task-attachment-modal-close" aria-label="Close attachment preview" onClick={() => setPreviewAttachment(null)}>×</button></div>
          <div className="task-attachment-modal-body">
            {previewAttachment.data.startsWith("data:image/") ? (
              <img className="task-attachment-modal-image" src={previewAttachment.data} alt={previewAttachment.name} />
            ) : previewAttachment.data.startsWith("data:application/pdf") ? (
              <iframe className="task-attachment-modal-frame" src={previewAttachment.data} title={previewAttachment.name} />
            ) : /\.(txt|csv|html|htm|json)$/i.test(previewAttachment.name || "") ? (
              <iframe className="task-attachment-modal-frame" src={previewAttachment.data} title={previewAttachment.name} />
            ) : (
              <div className="task-attachment-file-fallback">
                <p><strong>{previewAttachment.name}</strong></p>
                <p>This file format cannot be displayed inside the browser preview. Download it to open the original file.</p>
                <a className="primary-small" href={previewAttachment.data} download={previewAttachment.name}>Download file</a>
              </div>
            )}
          </div>
          <div className="task-attachment-modal-footer"><a className="primary-small" href={previewAttachment.data} download={previewAttachment.name}>Download attachment</a><button type="button" className="secondary-btn" onClick={() => setPreviewAttachment(null)}>Close</button></div>
        </section>
      </div>}
    </div>
  );
}
function AttendanceTable({ employees, isAdmin = false, month, year, day, onDayChange, onMonthChange, onYearChange, searchValue = "", defaultStatusTab = "Attendance Marked" }) {
  const [attendanceStatusTab, setAttendanceStatusTab] = useState(defaultStatusTab);
  const [clockNow, setClockNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setClockNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const monthNames = Array.from({ length: 12 }, (_, index) => new Date(2000, index, 1).toLocaleDateString("en-US", { month: "long" }));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, index) => currentYear - 5 + index);
  if (isAdmin) {
    const selectedDate = getLocalDateKey(new Date(year, month, day, 12));
    const selectedDay = new Date(year, month, day, 12);
    const isSelectedWeekend = isWeekend(selectedDay);
    const batchWindows = {
      "Morning Batch": [5 * 60, 5 * 60 + 15],
      "General Batch": [9 * 60, 9 * 60 + 15],
      "Night Batch": [21 * 60, 21 * 60 + 15],
    };
    const todayKey = getLocalDateKey(clockNow);
    const currentMinute = clockNow.getHours() * 60 + clockNow.getMinutes();
    const beforeFirstBatchStart = selectedDate === todayKey && currentMinute < 5 * 60;
    const rows = employees
      .filter((employee) => {
        const registrationDate = employee.approvedAt || employee.dateOfJoining || employee.createdAt || "";
        if (!registrationDate) return true;
        const registrationDay = String(registrationDate).slice(0, 10);
        return registrationDay <= selectedDate;
      })
      .map((employee) => {
        const record = (employee.attendanceRecords || []).find((item) => item.date === selectedDate && item.checkIn);
        const batch = record?.batch || employee.attendanceBatch || "General Batch";
        const [start, end] = batchWindows[batch] || batchWindows["General Batch"];
        const batchTiming = formatMinuteRange(start, end);
        let status;
        if (isSelectedWeekend) {
          status = "Holiday";
        } else if (record) {
          status = "Attendance Marked";
        } else if (selectedDate > todayKey) {
          status = "Attendance Not Yet Started";
        } else if (selectedDate < todayKey) {
          status = "Attendance Not Marked";
        } else if (currentMinute < 5 * 60) {
          status = "Attendance Not Yet Started";
        } else if (currentMinute < start) {
          status = "Waiting For Batch";
        } else if (currentMinute <= end) {
          status = "Attendance Window Open";
        } else {
          status = "Attendance Not Marked";
        }
        return {
          key: `${employee.employeeId}-${selectedDate}`,
          employee,
          date: selectedDate,
          dayName: selectedDay.toLocaleDateString("en-US", { weekday: "long" }),
          batch,
          batchTiming,
          status,
          checkIn: record?.checkIn || "—",
        };
      })
      .filter((row) => {
        if (row.status === "Attendance Not Yet Started") return false;
        if (row.status === "Waiting For Batch") return false;
        if (row.status === "Attendance Window Open") return false;
        const tabMatch = attendanceStatusTab === "Attendance Marked"
          ? row.status === "Attendance Marked"
          : row.status === "Attendance Not Marked";
        const query = searchValue.trim().toLowerCase();
        const searchMatch = !query || [row.employee.name, row.employee.employeeId].some((value) => String(value || "").toLowerCase().includes(query));
        return tabMatch && searchMatch;
      });
    return (
      <div className="attendance-history admin-attendance-history">
        <div className="attendance-month-toolbar admin-attendance-toolbar">
          <strong><CalendarDays size={16} /> View Date</strong>
          <div className="attendance-month-selectors">
            <select aria-label="Attendance day" value={day} onChange={(event) => onDayChange(Number(event.target.value))}>
              {Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, index) => index + 1).map((item) => <option key={item} value={item}>{String(item).padStart(2, "0")}</option>)}
            </select>
            <select aria-label="Attendance month" value={month} onChange={(event) => onMonthChange(Number(event.target.value))}>
              {monthNames.map((name, index) => <option key={name} value={index}>{name}</option>)}
            </select>
            <select aria-label="Attendance year" value={year} onChange={(event) => onYearChange(Number(event.target.value))}>
              {years.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <div className="attendance-status-tabs" role="tablist" aria-label="Attendance status">
          <button type="button" className={attendanceStatusTab === "Attendance Marked" ? "active" : ""} onClick={() => setAttendanceStatusTab("Attendance Marked")}>Attendance Marked</button>
          <button type="button" className={attendanceStatusTab === "Attendance Not Marked" ? "active" : ""} onClick={() => setAttendanceStatusTab("Attendance Not Marked")}>Attendance Not Marked</button>
        </div>
        <div className="attendance-month-label">{formatDate(selectedDate)} · {selectedDay.toLocaleDateString("en-US", { weekday: "long" })}</div>
        {!rows.length ? <EmptyState text={
          isSelectedWeekend
            ? "Saturday and Sunday are weekly holidays."
            : selectedDate > todayKey || beforeFirstBatchStart
              ? "Attendance Not Yet Started."
              : attendanceStatusTab === "Attendance Not Marked" && Object.values(batchWindows).some(([start, end]) => currentMinute >= start && currentMinute <= end)
                ? "Attendance window is not closed yet."
                : `No employees found for ${attendanceStatusTab.toLowerCase()} on this date.`
        } /> : isSelectedWeekend ? <EmptyState text="Saturday and Sunday are weekly holidays." /> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Employee</th><th>Employee ID</th><th>Date</th><th>Day</th><th>Batch</th><th>Batch Timing</th><th>Attendance</th>{attendanceStatusTab === "Attendance Marked" && <th>Check-in</th>}</tr></thead>
              <tbody>{rows.map((row) => <tr key={row.key}>
                <td>{row.employee.name}</td><td>{row.employee.employeeId}</td><td>{formatDate(row.date)}</td><td>{row.dayName}</td><td>{row.batch}</td><td>{row.batchTiming}</td>
                <td><span className={`employee-attendance-status ${row.status === "Attendance Marked" ? "marked" : row.status === "Attendance Not Yet Started" ? "not-yet-started" : "not-marked"}`}>{row.status}</span></td>{attendanceStatusTab === "Attendance Marked" && <td>{row.checkIn}</td>}
              </tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  const rows = [];
  employees.forEach((employee) => {
    const records = employee.attendanceRecords || [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const joined = employee.createdAt ? new Date(employee.createdAt) : null;
    const monthEnd = new Date(year, month, daysInMonth, 12);
    if (joined && monthEnd < new Date(joined.getFullYear(), joined.getMonth(), joined.getDate(), 12)) return;
    const startDay = joined && joined.getFullYear() === year && joined.getMonth() === month ? joined.getDate() : 1;
    for (let dayNumber = startDay; dayNumber <= daysInMonth; dayNumber += 1) {
      const currentDay = new Date(year, month, dayNumber, 12);
      if (joined && currentDay < new Date(joined.getFullYear(), joined.getMonth(), joined.getDate(), 12)) continue;
      const date = getLocalDateKey(currentDay);
      const record = records.find((item) => item.date === date && item.checkIn);
      const weekend = isWeekend(currentDay);
      const batch = record?.batch || employee.attendanceBatch || "General Batch";
      const batchWindows = { "Morning Batch": [300, 315], "General Batch": [540, 555], "Night Batch": [1260, 1275] };
      const [batchStart, batchEnd] = batchWindows[batch] || batchWindows["General Batch"];
      const nowKey = getLocalDateKey(clockNow);
      const minuteNow = clockNow.getHours() * 60 + clockNow.getMinutes();
      const status = weekend
        ? "Holiday"
        : record
          ? "Attendance Marked"
          : date > nowKey || (date === nowKey && minuteNow < batchStart)
            ? "Attendance Not Yet Started"
            : date === nowKey && minuteNow <= batchEnd
              ? "Attendance can be marked now"
              : "Attendance Not Marked";
      rows.push({ key: `${employee.employeeId}-${date}`, employee, date, dayName: currentDay.toLocaleDateString("en-US", { weekday: "long" }), batch, status, checkIn: weekend ? "—" : (record?.checkIn || "—"), checkOut: weekend ? "—" : (record?.checkOut || "—"), weekStart: getWeekStartKey(currentDay) });
    }
  });
  rows.sort((a, b) => b.date.localeCompare(a.date) || (a.employee.name || "").localeCompare(b.employee.name || ""));
  if (!employees.length) return <EmptyState text="No attendance records yet." />;
  return (
    <div className="attendance-history">
      <div className="attendance-month-toolbar"><strong><CalendarDays size={16} /> Attendance month</strong><div className="attendance-month-selectors"><select aria-label="Attendance month" value={month} onChange={(event) => onMonthChange(Number(event.target.value))}>{monthNames.map((name, index) => <option key={name} value={index}>{name}</option>)}</select><select aria-label="Attendance year" value={year} onChange={(event) => onYearChange(Number(event.target.value))}>{Array.from({ length: Math.max(6, currentYear - 2019 + 1) }, (_, index) => currentYear - index).map((item) => <option key={item} value={item}>{item}</option>)}</select></div></div>
      <div className="attendance-month-label">{monthNames[month]} {year} · {rows.length} daily records</div>
      <div className="table-wrap"><table><thead><tr><th>Date</th><th>Day</th><th>Week starting</th><th>Batch</th><th>Attendance</th><th>Check-in</th></tr></thead><tbody>{rows.map((row) => <tr key={row.key} className={row.status === "Holiday" ? "attendance-holiday-row" : ""}><td>{formatDate(row.date)}</td><td>{row.dayName}</td><td>{formatDate(row.weekStart)}</td><td>{row.batch}</td><td><span className={`status-pill ${row.status.toLowerCase().replace(/\s+/g, "-")}`}>{row.status}</span></td><td>{row.checkIn}</td></tr>)}</tbody></table></div>
    </div>
  );
}
function LeaveTable({ leaves, admin = false, onStatus, defaultTab = "All" }) {
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const [adminLeaveTab, setAdminLeaveTab] = useState(defaultTab);
  const [allLeaveSearch, setAllLeaveSearch] = useState("");
  const [pendingLeaveSearch, setPendingLeaveSearch] = useState("");
  const activeSearch = adminLeaveTab === "Pending" ? pendingLeaveSearch : allLeaveSearch;
  const visibleLeaves = admin
    ? leaves.filter((leave) => {
        if (adminLeaveTab === "Pending" && String(leave.status || "Pending").toLowerCase() !== "pending") return false;
        const query = activeSearch.trim().toLowerCase();
        if (!query) return true;
        const searchable = [
          leave.employeeName,
          leave.employeeId,
          leave.requestType,
          leave.requestNumber,
          leave.docNo,
          leave.id,
        ].filter(Boolean).join(" ").toLowerCase();
        return searchable.includes(query);
      })
    : leaves;
  if (!visibleLeaves.length) return <>
    {admin && <div className="admin-leave-tools">
      <div className="leave-page-tabs" role="tablist" aria-label="Leave request filters">
        <button type="button" className={`leave-page-tab ${adminLeaveTab === "All" ? "active" : ""}`} role="tab" aria-selected={adminLeaveTab === "All"} onClick={() => setAdminLeaveTab("All")}>All</button>
        <button type="button" className={`leave-page-tab ${adminLeaveTab === "Pending" ? "active" : ""}`} role="tab" aria-selected={adminLeaveTab === "Pending"} onClick={() => setAdminLeaveTab("Pending")}>Pending ({leaves.filter((leave) => String(leave.status || "Pending").trim().toLowerCase() === "pending").length})</button>
      </div>
      <input className="admin-leave-search" aria-label={`Search ${adminLeaveTab.toLowerCase()} leave requests`} placeholder="Search" value={activeSearch} onChange={(e) => adminLeaveTab === "Pending" ? setPendingLeaveSearch(e.target.value) : setAllLeaveSearch(e.target.value)} />
    </div>}
    <div className="leave-empty-records">{admin && adminLeaveTab === "Pending" ? "No Pending Leave Requests Found" : "No Leave Records Found"}</div>
  </>;
  const inclusiveDays = (leave) => {
    if (Number(leave.days) > 0) return leave.days;
    const start = leave.startDate || leave.date;
    const end = leave.endDate || leave.date;
    if (!start || !end) return "—";
    return Math.max(1, Math.floor((new Date(`${end}T00:00:00`) - new Date(`${start}T00:00:00`)) / 86400000) + 1);
  };
  return (
    <>
      {admin && <div className="admin-leave-tools">
        <div className="leave-page-tabs" role="tablist" aria-label="Leave request filters">
          <button type="button" className={`leave-page-tab ${adminLeaveTab === "All" ? "active" : ""}`} role="tab" aria-selected={adminLeaveTab === "All"} onClick={() => setAdminLeaveTab("All")}>All</button>
          <button type="button" className={`leave-page-tab ${adminLeaveTab === "Pending" ? "active" : ""}`} role="tab" aria-selected={adminLeaveTab === "Pending"} onClick={() => setAdminLeaveTab("Pending")}>Pending ({leaves.filter((leave) => String(leave.status || "Pending").trim().toLowerCase() === "pending").length})</button>
        </div>
        <input className="admin-leave-search" aria-label={`Search ${adminLeaveTab.toLowerCase()} leave requests`} placeholder="Search" value={activeSearch} onChange={(e) => adminLeaveTab === "Pending" ? setPendingLeaveSearch(e.target.value) : setAllLeaveSearch(e.target.value)} />
      </div>}
      <div className="table-wrap leave-table-wrap">
        <table className={`leave-records-table ${admin ? "leave-records-admin" : "leave-records-employee"}`}>
          <thead><tr>{admin && <><th>Employee Name</th><th>Employee ID</th></>}<th>SNo.</th><th>Doc No.</th><th>Leave Type</th><th>Request Type</th><th>Leave Duration</th><th>Days</th><th>Status</th>{!admin && <th>Pending With</th>}<th>Created By</th><th>Reason</th><th>Remarks</th>{admin && <th>Attachment / Review</th>}</tr></thead>
          <tbody>{visibleLeaves.map((leave, index) => {
            const start = leave.startDate || leave.date;
            const end = leave.endDate || leave.date;
            const created = leave.createdBy || formatDate(leave.createdAt || leave.date);
            return <tr key={leave.id}>
              {admin && <><td className="leave-employee-name">{leave.employeeName || "—"}</td><td className="leave-employee-id">{leave.employeeId || "—"}</td></>}
              <td>{index + 1}</td><td>{leave.docNo || leave.id}</td><td>{leave.leaveType || "Leave"}</td><td>{leave.requestNumber || leave.requestType || index + 1}</td><td>{leave.duration || `${formatDate(start)} – ${formatDate(end)}`}</td><td>{inclusiveDays(leave)}</td>
              <td><span className={`leave-status-pill ${String(leave.status || "Pending").toLowerCase()}`}>{leave.status || "Pending"}</span></td>{!admin && <td>{leave.pendingWith || (leave.status === "Pending" ? "Admin" : "—")}</td>}<td>{created}</td><td className="leave-reason-cell">{leave.reason || "—"}</td><td className="leave-remarks-cell">{leave.remarks || "—"}</td>
              {admin && <td><div className="leave-admin-review">{leave.attachmentData ? <button type="button" className="leave-attachment-view" onClick={() => setPreviewAttachment(leave)}>{leave.attachmentName || "View attachment"}</button> : <span>—</span>}{leave.status === "Pending" ? <div className="inline-actions"><button type="button" className="table-action" onClick={() => onStatus(leave.id, "Approved")}>Approve</button><button type="button" className="table-action danger" onClick={() => onStatus(leave.id, "Rejected")}>Reject</button></div> : <span className="muted">Reviewed</span>}</div></td>}
            </tr>;
          })}</tbody>
        </table>
      </div>
      {admin && previewAttachment && <div className="task-attachment-modal-backdrop" role="presentation" onClick={() => setPreviewAttachment(null)}><section className="task-attachment-modal" role="dialog" aria-modal="true" aria-label={`Leave attachment preview: ${previewAttachment.attachmentName || "Attachment"}`} onClick={(event) => event.stopPropagation()}><div className="task-attachment-modal-header"><div><h3>{previewAttachment.attachmentName || "Leave attachment"}</h3><p>{previewAttachment.employeeName} · {previewAttachment.leaveType}</p></div><button type="button" className="task-attachment-modal-close" aria-label="Close attachment preview" onClick={() => setPreviewAttachment(null)}>×</button></div><div className="task-attachment-modal-body">{String(previewAttachment.attachmentData || "").startsWith("data:image/") ? <img className="task-attachment-modal-image" src={previewAttachment.attachmentData} alt={previewAttachment.attachmentName || "Leave attachment"} /> : String(previewAttachment.attachmentData || "").startsWith("data:application/pdf") ? <iframe className="task-attachment-modal-frame" src={previewAttachment.attachmentData} title={previewAttachment.attachmentName || "Leave PDF"} /> : <div className="task-attachment-file-fallback"><p><strong>{previewAttachment.attachmentName}</strong></p><p>This file type may need to be downloaded to view.</p><a className="primary-small" href={previewAttachment.attachmentData} download={previewAttachment.attachmentName || "leave-attachment"}>Download file</a></div>}</div><div className="task-attachment-modal-footer"><a className="primary-small" href={previewAttachment.attachmentData} download={previewAttachment.attachmentName || "leave-attachment"}>Download attachment</a><button type="button" className="secondary-btn" onClick={() => setPreviewAttachment(null)}>Close</button></div></section></div>}
    </>
  );
}
const COMMON_HOLIDAY_DATES = {
  2026: [
    ["New Year's Day", "2026-01-01"], ["Pongal", "2026-01-15"], ["Thiruvalluvar Day", "2026-01-16"], ["Uzhavar Thirunal", "2026-01-17"], ["Republic Day", "2026-01-26"], ["Tamil New Year / Dr. Ambedkar Jayanti", "2026-04-14"], ["May Day (Labor Day)", "2026-05-01"], ["Independence Day", "2026-08-15"], ["Krishna Jayanthi (Janmashtami)", "2026-09-04"], ["Vinayakar Chathurthi", "2026-09-14"], ["Gandhi Jayanti", "2026-10-02"], ["Ayutha Pooja", "2026-10-19"], ["Vijaya Dasami", "2026-10-20"], ["Deepavali (Diwali)", "2026-11-08"], ["Christmas", "2026-12-25"]
  ],
  2027: [
    ["New Year's Day", "2027-01-01"], ["Pongal", "2027-01-15"], ["Thiruvalluvar Day", "2027-01-16"], ["Uzhavar Thirunal", "2027-01-17"], ["Republic Day", "2027-01-26"], ["Tamil New Year / Dr. Ambedkar Jayanti", "2027-04-14"], ["May Day (Labor Day)", "2027-05-01"], ["Independence Day", "2027-08-15"], ["Krishna Jayanthi (Janmashtami)", "2027-08-25"], ["Vinayakar Chathurthi", "2027-09-04"], ["Gandhi Jayanti", "2027-10-02"], ["Ayutha Pooja", "2027-10-08"], ["Vijaya Dasami", "2027-10-09"], ["Deepavali (Diwali)", "2027-10-28"], ["Christmas", "2027-12-25"]
  ]
};
function getCommonHolidays(year) {
  const fixed = [
    ["New Year's Day", `${year}-01-01`], ["Pongal", `${year}-01-15`], ["Thiruvalluvar Day", `${year}-01-16`], ["Uzhavar Thirunal", `${year}-01-17`], ["Republic Day", `${year}-01-26`], ["Tamil New Year / Dr. Ambedkar Jayanti", `${year}-04-14`], ["May Day (Labor Day)", `${year}-05-01`], ["Independence Day", `${year}-08-15`], ["Gandhi Jayanti", `${year}-10-02`], ["Christmas", `${year}-12-25`]
  ];
  const dates = COMMON_HOLIDAY_DATES[year] || [...fixed, ["Krishna Jayanthi (Janmashtami)", `${year}-08-25`], ["Vinayakar Chathurthi", `${year}-09-10`], ["Ayutha Pooja", `${year}-10-20`], ["Vijaya Dasami", `${year}-10-21`], ["Deepavali (Diwali)", `${year}-11-01`]];
  return dates.map(([name, date]) => ({ name, date })).sort((a, b) => a.date.localeCompare(b.date));
}
function ProfileField({ label, value }) {
  return <div className="profile-field"><span>{label}</span><strong>{value || "—"}</strong></div>;
}
function EmptyState({ text }) {
  return <div className="empty-state"><ClipboardList size={32} /><p>{text}</p></div>;
}
