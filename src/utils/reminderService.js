/**
 * Utility functions for managing medication reminders
 */

/**
 * Calculate the next dose date based on medication frequency and settings
 * @param {Object} medication - Medication object with frequency settings
 * @returns {string} ISO string for the next dose date
 */
export const calculateNextDose = (medication) => {
  const now = new Date();
  let nextDose;
  
  // Parse time of day
  const [hours, minutes] = (medication.timeOfDay || '08:00').split(':').map(Number);
  
  if (medication.frequency === 'daily') {
    // If time is already past for today, set for tomorrow
    nextDose = new Date(now);
    nextDose.setHours(hours, minutes, 0, 0);
    
    if (nextDose < now) {
      nextDose.setDate(nextDose.getDate() + 1);
    }
  } else if (medication.frequency === 'weekly') {
    // Find the next occurrence of a selected day
    const currentDay = now.getDay();
    let daysUntilNext = 7;
    
    if (!medication.selectedDays || medication.selectedDays.length === 0) {
      // Default to current day if no days selected
      medication.selectedDays = [currentDay];
    }
    
    // Sort selected days for consistent processing
    const sortedDays = [...medication.selectedDays].sort((a, b) => a - b);
    
    // Find the next day that comes after the current day
    for (const day of sortedDays) {
      const diff = (day - currentDay + 7) % 7;
      if (diff < daysUntilNext && diff > 0) {
        daysUntilNext = diff;
      }
    }
    
    // If all selected days are before current day or same day but time has passed,
    // take the first selected day next week
    if (daysUntilNext === 7) {
      daysUntilNext = (sortedDays[0] - currentDay + 7) % 7;
      if (daysUntilNext === 0) {
        // Same day but check if time has passed
        const todayWithTime = new Date(now);
        todayWithTime.setHours(hours, minutes, 0, 0);
        
        if (todayWithTime > now) {
          daysUntilNext = 0; // Set for today
        } else {
          daysUntilNext = 7; // Set for next week
        }
      }
    }
    
    nextDose = new Date(now);
    nextDose.setDate(nextDose.getDate() + daysUntilNext);
    nextDose.setHours(hours, minutes, 0, 0);
  } else if (medication.frequency === 'monthly') {
    // If day of month is already past, set for next month
    const currentDate = now.getDate();
    const selectedDate = medication.selectedDays && medication.selectedDays[0] ? 
      medication.selectedDays[0] : currentDate;
    
    nextDose = new Date(now.getFullYear(), now.getMonth(), selectedDate);
    nextDose.setHours(hours, minutes, 0, 0);
    
    if (nextDose < now) {
      nextDose = new Date(now.getFullYear(), now.getMonth() + 1, selectedDate);
      nextDose.setHours(hours, minutes, 0, 0);
    }
  } else {
    // Default to tomorrow if frequency is not set
    nextDose = new Date(now);
    nextDose.setDate(nextDose.getDate() + 1);
    nextDose.setHours(hours, minutes, 0, 0);
  }
  
  return nextDose.toISOString();
};

/**
 * Find medications that are due within a specific time range
 * @param {Array} medications - List of medication objects
 * @param {number} minutesWindow - Time window in minutes to check
 * @returns {Array} - List of medications that are due
 */
export const getDueMedications = (medications, minutesWindow = 15) => {
  if (!medications || !Array.isArray(medications) || medications.length === 0) {
    return [];
  }
  
  const now = new Date();
  const dueTime = new Date(now.getTime() + minutesWindow * 60000);
  
  return medications.filter(med => {
    // Skip medications that are already completed
    if (med.status === 'completed') return false;
    
    const nextDoseTime = new Date(med.nextDose);
    return nextDoseTime >= now && nextDoseTime <= dueTime;
  });
};

/**
 * Check for medications that are overdue
 * @param {Array} medications - List of medication objects
 * @returns {Array} - Updated list of medications with overdue statuses
 */
export const checkOverdueMedications = (medications) => {
  if (!medications || !Array.isArray(medications) || medications.length === 0) {
    return [];
  }
  
  const now = new Date();
  
  return medications.map(med => {
    // Don't change completed medications
    if (med.status === 'completed') return med;
    
    const nextDoseTime = new Date(med.nextDose);
    
    // If next dose is in the past, mark as overdue
    if (nextDoseTime < now) {
      return {
        ...med,
        status: 'overdue'
      };
    }
    
    return med;
  });
};

/**
 * Update medication after it has been taken
 * @param {Object} medication - Medication object to update
 * @returns {Object} - Updated medication object with new next dose
 */
export const updateMedicationAfterTaken = (medication) => {
  // Mark current dose as completed
  const updatedMedication = {
    ...medication,
    status: 'completed',
    progress: 100
  };
  
  // Calculate the next dose based on frequency
  const nextDose = calculateNextDose(updatedMedication);
  
  // Set up for the next dose
  return {
    ...updatedMedication,
    nextDose,
    status: 'upcoming',
    progress: 0
  };
};

/**
 * Update medication after snoozing a reminder
 * @param {Object} medication - Medication object to snooze
 * @param {number} snoozeMinutes - Minutes to snooze (default: 60)
 * @returns {Object} - Updated medication with snoozed time
 */
export const snoozeMedication = (medication, snoozeMinutes = 60) => {
  const nextDose = new Date(Date.now() + snoozeMinutes * 60000).toISOString();
  
  return {
    ...medication,
    nextDose,
    status: 'upcoming'
  };
};

/**
 * Generate a notification message for a medication
 * @param {Object} medication - Medication object
 * @returns {string} - Notification message
 */
export const generateNotificationMessage = (medication) => {
  if (!medication) return '';
  
  return `Time to take your ${medication.name} (${medication.dosage}). ${medication.instructions}`;
};

/**
 * Update days left for all medications
 * @param {Array} medications - List of medication objects
 * @returns {Array} - Updated list with recalculated days left
 */
export const updateDaysLeft = (medications) => {
  if (!medications || !Array.isArray(medications) || medications.length === 0) {
    return [];
  }
  
  const today = new Date();
  
  return medications.map(med => {
    const nextDoseDate = new Date(med.nextDose);
    
    // Calculate days left
    const diffTime = Math.abs(nextDoseDate - today);
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      ...med,
      daysLeft
    };
  });
};

/**
 * Format the next dose time for display
 * @param {string} nextDoseISOString - ISO string of next dose date
 * @returns {string} - Formatted time string
 */
export const formatDoseTime = (nextDoseISOString) => {
  if (!nextDoseISOString) return '';
  
  const doseDate = new Date(nextDoseISOString);
  const today = new Date();
  
  // Check if dose is today
  if (doseDate.toDateString() === today.toDateString()) {
    return `Today at ${doseDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  }
  
  // Check if dose is tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  if (doseDate.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow at ${doseDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  }
  
  // Otherwise return full date
  return doseDate.toLocaleDateString([], { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};