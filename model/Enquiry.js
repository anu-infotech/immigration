const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  ref_no: { type: Number, required: true },
  photo: { type: String, required: false, default: null },
  spouse: { type: {}, required: true },
  spouseName: { type: String, required: false, default: null },
  any_refusal: { type: {}, required: true },
  visa_refused_for: { type: {}, default: null },
  first_name: { type: String, required: true },
  surname: { type: String, required: false, default: null },
  dob: { type: Date, required: true },
  mobile: { type: Number, required: true },
  officialMobile: { type: Number, required: false, default: null },
  officialEmail: { type: String, required: false, default: null },
  address: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: {}, required: true },
  pincode: { type: Number, required: true },
  city: { type: String, required: true },
  qualification: { type: {}, required: true },
  stream: { type: String, required: true },
  passout_year: { type: Number, required: true },
  percentage: { type: Number, required: true },
  country_apply_for: { type: {}, required: true },
  english_test_type: { type: {}, required: true },
  accepted: { type: Boolean, required: false, default: null },
  location: { type: {}, required: true, default: null },
  case_handled_by: { type: {}, required: false, default: null },
  ielts_score_listening: { type: Number, default: null },
  ielts_score_speaking: { type: Number, default: null },
  ielts_score_writing: { type: Number, default: null },
  ielts_score_reading: { type: Number, default: null },
  pte_score: { type: Number, default: null },
  overall: { type: Number, default: null },
  remarks: {
    type: [
      {
        date: Date,
        remarks: String,
      },
    ],
  },
  total_amount: { type: Number, default: null },
  passport: {
    type: [
      {
        number: String,
        validFrom: Date,
        validTo: Date,
        address: String,
        issuePlace: String,
      },
    ],
    required: false,
    default: null,
  },
  status_updates: {
    type: [
      {
        msg: String,
        date: Date,
        time: Date,
        type: { type: String, default: 'update' },
        action_required: Boolean,
      },
    ],
    required: false,
    default: [
      {
        msg: 'Enquiry Created Successfully',
        date: Date.now(),
        time: new Date().getTime(),
        type: 'update',
        action_required: false,
      },
    ],
  },
  documents: {
    type: [
      {
        document_name: String,
        document_path: String,
        uploaded_on: Date,
      },
    ],
    required: false,
    default: [],
  },
  notificationsPushToken: { type: String, required: false, default: null },
  created_by: { type: {}, required: false, default: null },
  qualifications: {
    type: [
      {
        qualification: String,
        courseStudied: String,
        uniOrBoard: String,
        startingYear: Number,
        startingMonth: String,
        grade: String,
        passingYear: Number,
        passingMonth: String,
      },
    ],
    required: false,
    default: [],
  },
  testTaken: {
    type: [
      {
        testName: {},
        testScore: String,
        referenceNo: String,
        date: Date,
      },
    ],
    required: false,
    default: [],
  },
  workExperience: {
    type: [
      {
        companyName: String,
        city: String,
        designation: String,
        fromYear: Number,
        fromMonth: String,
        toYear: Number,
        toMonth: String,
      },
    ],
    required: false,
    default: [],
  },
  coursesApplied: {
    type: [
      {
        university: { type: {} },
        country: { type: {} },
        type: { type: {} },
        course: { type: {} },
        intake: { type: {} },
        applied: Boolean,
      },
    ],
    required: false,
    default: [],
  },

  followUps: {
    type: [
      {
        spoken: { type: {}, required: false },
        remarks: { type: String, required: false, default: null },
        followUpDate: { type: Date, required: true },
        nextFollowUpDate: { type: Date, required: false, default: null },
        studentStatus: { type: {}, required: false, default: null },
        action: { type: {}, required: true, default: null },
        assessmentId: String,
        name: String,
        caseHandler: String,
        mobile: Number,
      },
    ],
    required: false,
    default: [],
  },

  documents: {
    type: [
      {
        name: String,
        uri: String,
      },
    ],
    required: false,
    default: [],
  },
  applications: {
    type: [
      {
        apn: String,
        date: Date,
        applicationType: { type: {}, required: true },
        country: { type: {} },
        university: { type: {} },
        course: { type: {} },
        intake: String,
        documents: { type: [], required: true },
        status: { type: {} },
        universityApplicationNumber: {
          type: String,
          default: null,
          required: false,
        },
        remarks: String,
        assessmentId: String,
        name: String,
        caseHandler: String,
        offerLetter: { type: Boolean, default: false },
        visa: { type: Boolean, default: false },
      },
    ],
    required: false,
    default: [],
  },
  visaApplications: {
    type: [],
    default: [],
  },
  deferApplications: {
    type: [],
    default: [],
  },
  offerLetters: {
    type: [
      {
        offerNumber: String,
        apn: String,
        date: Date,
        applicationType: { type: {}, required: true },
        country: { type: {} },
        university: { type: {} },
        course: { type: {} },
        intake: String,
        documents: { type: [], required: false, default: [] },
        status: { type: {} },
        remarks: String,
        assessmentId: String,
        name: String,
        caseHandler: String,
        offerLetterUri: String,
        rejectionReason: { type: String, default: null },
        conditions: { type: String, default: null },
        moreDocuments: { type: String, default: null },
        remarks: { type: String, default: null },
      },
    ],
    required: false,
    default: [],
  },
  deposits: {
    type: [{}],
    default: [],
    required: false,
  },
  visas: {
    type: [
      {
        status: {},
        remarks: String,
        applicationId: String,
        assessmentId: String,
        caseHandler: String,
        date: Date,
      },
    ],
    default: [],
    required: false,
  },
  coe: {
    type: [
      {
        name: String,
        uri: String,
        date: Date,
      },
    ],
    required: false,
    default: [],
  },
});

const Enquiry = mongoose.model('enquiries', enquirySchema);

module.exports = Enquiry;
