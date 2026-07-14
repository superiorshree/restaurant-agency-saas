export const BUSINESS_MODULES = {
  restaurant: [
    "Bookings",
    "Tables",
    "Menu",
  ],

  salon: [
    "Appointments",
    "Staff",
    "Services",
  ],

  clinic: [
    "Appointments",
    "Doctors",
    "Patients",
  ],

  dentist: [
    "Appointments",
    "Patients",
    "Treatments",
  ],

  architect: [
    "Projects",
    "Clients",
    "Meetings",
  ],

  gym: [
    "Members",
    "Plans",
    "Attendance",
  ],

  hotel: [
    "Rooms",
    "Bookings",
    "Guests",
  ],

  cafe: [
    "Orders",
    "Bookings",
    "Menu",
  ],

  lawyer: [
    "Cases",
    "Clients",
    "Meetings",
  ],

  consultant: [
    "Clients",
    "Meetings",
    "Invoices",
  ],

  "real-estate": [
    "Properties",
    "Leads",
    "Visits",
  ],
} as const;