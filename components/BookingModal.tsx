"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  selectedDate: Date | null;
  selectedTime: string | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  date?: string;
  time?: string;
}

const timeSlots = {
  morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  afternoon: ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
  evening: ["17:00", "17:30", "18:00", "18:30"],
};

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { t, locale } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    selectedDate: null,
    selectedTime: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTimeSection, setActiveTimeSection] = useState<"morning" | "afternoon" | "evening">("morning");

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("booking.errors.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("booking.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("booking.errors.emailInvalid");
    }

    if (!formData.selectedDate) {
      newErrors.date = t("booking.errors.dateRequired");
    }

    if (!formData.selectedTime) {
      newErrors.time = t("booking.errors.timeRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Mock submission - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after 3 seconds and close
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        selectedDate: null,
        selectedTime: null,
      });
      onClose();
    }, 3000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDateSelect = (date: Date) => {
    setFormData((prev) => ({ ...prev, selectedDate: date }));
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: undefined }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, selectedTime: time }));
    if (errors.time) {
      setErrors((prev) => ({ ...prev, time: undefined }));
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!formData.selectedDate) return false;
    return (
      date.getDate() === formData.selectedDate.getDate() &&
      date.getMonth() === formData.selectedDate.getMonth() &&
      date.getFullYear() === formData.selectedDate.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const monthNames = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ro: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
  };

  const weekDays = {
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ro: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"],
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale === "ro" ? "ro-RO" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Overlay */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6"
                    >
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                      {t("booking.success.title")}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-center max-w-md">
                      {t("booking.success.message")}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4">
                      {t("booking.success.comingSoon")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {t("booking.title")}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {t("booking.subtitle")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col lg:flex-row">
                {/* Left Side - Calendar & Time Selection */}
                <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
                  {/* Calendar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {t("booking.selectDate")}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateMonth("prev")}
                          className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        </button>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 min-w-[100px] text-center">
                          {monthNames[locale][currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button
                          onClick={() => navigateMonth("next")}
                          className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        </button>
                      </div>
                    </div>

                    {errors.date && (
                      <p className="text-sm text-red-500 mb-3">{errors.date}</p>
                    )}

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {weekDays[locale].map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-zinc-400 dark:text-zinc-500 py-2"
                        >
                          {day}
                        </div>
                      ))}
                      {getDaysInMonth(currentMonth).map((date, index) => (
                        <div key={index} className="aspect-square">
                          {date && (
                            <button
                              onClick={() => !isPastDate(date) && handleDateSelect(date)}
                              disabled={isPastDate(date)}
                              className={`w-full h-full rounded-lg text-sm font-medium transition-all ${
                                isSelected(date)
                                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                                  : isToday(date)
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                  : isPastDate(date)
                                  ? "text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
                                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {formData.selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4" />
                        {t("booking.selectTime")}
                        {formData.selectedDate && (
                          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                            ({formatDate(formData.selectedDate)})
                          </span>
                        )}
                      </h3>

                      {errors.time && (
                        <p className="text-sm text-red-500 mb-3">{errors.time}</p>
                      )}

                      {/* Time Section Tabs */}
                      <div className="flex gap-2 mb-4">
                        {(["morning", "afternoon", "evening"] as const).map((section) => (
                          <button
                            key={section}
                            onClick={() => setActiveTimeSection(section)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              activeTimeSection === section
                                ? "bg-indigo-500 text-white"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            }`}
                          >
                            {t(`booking.timeSections.${section}`)}
                          </button>
                        ))}
                      </div>

                      {/* Time Slots Grid */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots[activeTimeSection].map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.selectedTime === time
                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {t("booking.fields.name")} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border ${
                          errors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500/20"
                        } text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all`}
                        placeholder={t("booking.placeholders.name")}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {t("booking.fields.email")} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border ${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500/20"
                        } text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all`}
                        placeholder={t("booking.placeholders.email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {t("booking.fields.phone")}
                        <span className="text-xs text-zinc-400 font-normal">({t("booking.optional")})</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500/20 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all"
                        placeholder={t("booking.placeholders.phone")}
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        {t("booking.fields.message")}
                        <span className="text-xs text-zinc-400 font-normal">({t("booking.optional")})</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500/20 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all resize-none"
                        placeholder={t("booking.placeholders.message")}
                      />
                    </div>

                    {/* Selected Date/Time Summary */}
                    {(formData.selectedDate || formData.selectedTime) && (
                      <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">
                        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                          {t("booking.summary.title")}
                        </p>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                          {formData.selectedDate && formatDate(formData.selectedDate)}
                          {formData.selectedDate && formData.selectedTime && " at "}
                          {formData.selectedTime}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("booking.submitting")}
                        </>
                      ) : (
                        t("booking.submit")
                      )}
                    </button>

                    <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
                      {t("booking.terms")}
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
