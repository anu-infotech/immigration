import countryList from "react-select-country-list";

export const qualificationFields = [
  {
    name: "qualification",
    label: "Qualification",
    required: true,
    type: "text",
  },
  {
    name: "courseStudied",
    label: "Course Studied",
    required: true,
    type: "text",
  },
  {
    name: "uniOrBoard",
    label: "University/Board",
    required: true,
    type: "text",
  },
  { name: "grade", label: "%age/Grade", required: true, type: "text" },
  {
    name: "startingYear",
    label: "Starting Year",
    required: true,
    type: "text",
  },
  {
    name: "startingMonth",
    label: "Starting Month",
    required: true,
    type: "text",
  },
  {
    name: "passingYear",
    label: "Passing Year",
    required: true,
    type: "text",
  },
  {
    name: "passingMonth",
    label: "Passing Month",
    required: true,
    type: "text",
  },
];

export const testTakenFields = [
  {
    name: "testName",
    label: "Test Name",
    required: true,
    type: "select",
    options: [
      { value: "ielts", label: "IELTS" },
      { value: "toefl", label: "TOEFL" },
      { value: "pte", label: "PTE" },
      { value: "gmat", label: "GMAT" },
      { value: "gre", label: "GRE" },
      { value: "sat", label: "SAT" },
      { value: "mockIelts", label: "Mock IELTS/PTE" },
      { value: "pteVoucher", label: "PTE Voucher" },
      { value: "pteBook", label: "PTE/IELTS Book" },
    ],
  },
  {
    name: "testScore",
    label: "Test Score",
    required: true,
    type: "text",
  },
  {
    name: "referenceNo",
    label: "Reference No",
    required: true,
    type: "text",
  },
  {
    name: "date",
    label: "Test Date",
    required: true,
    type: "date",
  },
];

export const workFields = [
  {
    name: "companyName",
    label: "Company Name ",
    required: true,
    type: "text",
  },
  {
    name: "city",
    label: "City",
    required: true,
    type: "text",
  },
  {
    name: "designation",
    label: "Designation",
    required: true,
    type: "text",
  },
  {
    name: "fromYear",
    label: "From Year",
    required: true,
    type: "text",
  },
  {
    name: "fromMonth",
    label: "fromMonth",
    required: true,
    type: "text",
  },
  {
    name: "toYear",
    label: "To Year",
    required: true,
    type: "text",
  },
  {
    name: "toMonth",
    label: "To month",
    required: true,
    type: "text",
  },
];

export const coursesAppliedFields = [
  {
    name: "country",
    label: "Country",
    required: true,
    type: "select",
    options: countryList().getData(),
  },

  {
    name: "university",
    label: "University",
    required: true,
    type: "select",
    options: [],
  },

  {
    name: "type",
    label: "UG/PG",
    required: true,
    type: "select",
    options: [
      { value: "ug", label: "UG" },
      { value: "pg", label: "PG" },
      { value: "eap", label: "EAP" },
    ],
  },

  {
    name: "course",
    label: "Course",
    required: true,
    type: "select",
    options: [],
  },

  {
    name: "intake",
    label: "Intake",
    required: true,
    type: "select",
    options: [
      { value: "January 2024", label: "January 2024 " },
      { value: "February 2024", label: "February 2024 " },
      { value: "March 2024", label: "March 2024 " },
      { value: "April 2024", label: "April 2024 " },
      { value: "May 2024", label: "May 2024 " },
      { value: "June 2024", label: "June 2024 " },
      { value: "July 2024", label: "July 2024 " },
      { value: "August 2024", label: "August 2024 " },
      { value: "September 2024", label: "September 2024 " },
      { value: "October 2024", label: "October 2024 " },
      { value: "November 2024", label: "November 2024 " },
      { value: "December 2024", label: "December 2024 " },
      { value: "January 2025", label: "January 2025 " },
      { value: "February 2025", label: "February 2025 " },
      { value: "March 2025", label: "March 2025 " },
      { value: "April 2025", label: "April 2025 " },
      { value: "May 2025", label: "May 2025 " },
      { value: "June 2025", label: "June 2025 " },
      { value: "July 2025", label: "July 2025 " },
      { value: "August 2025", label: "August 2025 " },
      { value: "September 2025", label: "September 2025 " },
      { value: "October 2025", label: "October 2025 " },
      { value: "November 2025", label: "November 2025 " },
      { value: "December 2025", label: "December 2025 " },
      { value: "January 2026", label: "January 2026 " },
      { value: "February 2026", label: "February 2026 " },
      { value: "March 2026", label: "March 2026 " },
      { value: "April 2026", label: "April 2026 " },
      { value: "May 2026", label: "May 2026 " },
      { value: "June 2026", label: "June 2026 " },
      { value: "July 2026", label: "July 2026 " },
      { value: "August 2026", label: "August 2026 " },
      { value: "September 2026", label: "September 2026 " },
      { value: "October 2026", label: "October 2026 " },
      { value: "November 2026", label: "November 2026 " },
      { value: "December 2026", label: "December 2026 " },
    ],
  },
];

export const followUpFileds = [
  {
    name: "spoken",
    label: "Spoken to student",
    type: "select",
    required: true,
    options: [
      { value: "Spoken", label: "Spoken" },
      { value: "Not Spoken", label: "Not Spoken" },
    ],
  },
  {
    name: "studentStatus",
    label: "Student Status",
    type: "select",
    required: true,
    options: [
      { value: "hot", label: "Hot" },
      { value: "warm", label: "Warm" },
      { value: "cold", label: "Cold" },
    ],
  },

  {
    name: "action",
    label: "Action",
    type: "select",
    required: true,
    options: [
      { value: "Generic Follow Up", label: "Generic Follow Up" },
      { value: "Appointment", label: "Appointment" },
      { value: "Revenue", label: "Revenue" },
      { value: "Defer", label: "Defer" },
      { value: "Upload Documents", label: "Upload Documents" },
      {
        value: "Upload AL/Upload Application",
        label: "Upload AL/Upload Application",
      },
      {
        value: "Edit Country & Cohort Preference",
        label: "Edit Country & Cohort Preference",
      },
      { value: "Expected Applicant", label: "Expected Applicant" },
      { value: "Expected Document", label: "Expected Document" },
    ],
  },

  {
    name: "remarks",
    label: "Remarks",
    type: "text",
    required: true,
  },

  {
    name: "nextFollowUpDate",
    label: "Next Follow Up Date",
    type: "date",
    required: false,
  },
  {
    name: "nextAction",
    label: "Next Follow Up action",
    type: "select",
    required: false,
    options: [
      { value: "Generic Follow Up", label: "Generic Follow Up" },
      { value: "Appointment", label: "Appointment" },
      { value: "Revenue", label: "Revenue" },
      { value: "Defer", label: "Defer" },
      { value: "Upload Documents", label: "Upload Documents" },
      {
        value: "Upload AL/Upload Application",
        label: "Upload AL/Upload Application",
      },
      {
        value: "Edit Country & Cohort Preference",
        label: "Edit Country & Cohort Preference",
      },
      { value: "Expected Applicant", label: "Expected Applicant" },
      { value: "Expected Document", label: "Expected Document" },
    ],
  },
];

export const applicationFields = [
  {
    name: "status",
    label: "Application Status",
    required: true,
    type: "select",
  },
  { name: "remarks", label: "Enter Remarks", required: true, type: "text" },
];

export const passportFields = [
  {
    name: "number",
    label: "Passport Number",
    required: true,
    type: "text",
  },
  {
    name: "validFrom",
    label: "Valid From",
    required: true,
    type: "date",
  },
  {
    name: "validTo",
    label: "Valid To",
    required: true,
    type: "date",
  },
  {
    name: "address",
    label: "Address",
    required: true,
    type: "text",
  },
  {
    name: "issuePlace",
    label: "Place of Issue",
    required: true,
    type: "text",
  },
];
