import countryList from "react-select-country-list";
import { getBranchesListForSelect } from "../../actions/branches";

export const generalFields = [
  {
    name: "first_name",
    label: "First name",
    type: "text",
    required: true,
    render: true,
  },
  {
    name: "surname",
    label: "Surname",
    type: "text",
    required: false,
    render: true,
  },
  {
    name: "mobile",
    label: "Mobile No.",
    type: "text",
    required: true,
    render: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    render: true,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
    render: true,
  },
];

export const visaInformation = [
  {
    name: "any_refusal",
    type: "select",
    label: "Any Refusal",
    required: true,
    render: true,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    name: "spouse",
    type: "select",
    label: "Applying as a spouse",
    required: true,
    render: true,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    name: "spouseName",
    label: "Spouse Name",
    type: "text",
    required: true,
    render: false,
  },
  {
    name: "visa_refused_for",
    type: "select",
    label: "Country refused visa for",
    required: true,
    options: countryList().getData(),
    render: false,
  },
  {
    name: "country_apply_for",
    type: "select",
    label: "Country you want to apply for",
    required: true,
    options: countryList().getData(),
    render: true,
  },
  {
    name: "english_test_type",
    type: "select",
    label: "Have you done IELTS or PTE?",
    required: true,
    render: true,
    options: [
      { label: "Ielts", value: "ielts" },
      { label: "PTE", value: "pte" },
      { label: "Persuing", value: null },
    ],
  },
  {
    name: "pte_score",
    type: "text",
    label: "Pte Score",
    required: true,
    render: false,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
      { label: "Persuing", value: null },
    ],
  },
  {
    name: "ielts_score_listening",
    type: "text",
    label: "Listening",
    required: true,
    render: false,
  },
  {
    name: "ielts_score_reading",
    type: "text",
    label: "Reading",
    required: true,
    render: false,
  },
  {
    name: "ielts_score_writing",
    type: "text",
    label: "Writing",
    required: true,
    render: false,
  },
  {
    name: "ielts_score_speaking",
    type: "text",
    label: "Speaking",
    required: true,
    render: false,
  },
];

export const otherInformation = [
  {
    name: "address",
    label: "Address",
    type: "text",
    required: true,
    render: true,
  },
  {
    name: "pincode",
    label: "Pincode",
    type: "text",
    required: true,
    render: true,
  },
  { name: "city", label: "City", type: "text", required: true, render: true },
  {
    name: "country",
    label: "Country",
    type: "select",
    required: true,
    options: countryList().getData(),
    render: true,
  },
  {
    name: "qualification",
    label: "Qualification",
    type: "select",
    render: true,
    required: true,
    options: [
      { label: "10+2", value: "10+2" },
      { label: "Diploma", value: "diploma" },
      { label: "Graduation", value: "Graduation" },
      { label: "Post Graduation", value: "post-graduation" },
    ],
  },
  {
    name: "stream",
    label: "Stream/Graduation in",
    type: "text",
    required: true,
    render: true,
  },
  {
    name: "passout_year",
    label: "Pass Out Year",
    type: "text",
    required: true,
    render: true,
  },
  {
    name: "percentage",
    label: "Percentage",
    type: "text",
    required: true,
    render: true,
  },
  {
    name: "location",
    label: "Branch Location",
    type: "select",
    required: true,
    render: true,
    options: []
  },
];
