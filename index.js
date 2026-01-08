const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const compression = require("compression");
const cookieSession = require("cookie-session")
const createEnquiryRouter = require("./routes/createEnquiry");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const getRejectedAssessmentsRouter = require("./routes/getRejectedAssessments");
const updateAssessmentStatus = require("./routes/updateAssessmentStatus");
const searchAssessmentRouter = require("./routes/searchAssessment");
const updateAdminPasswordRouter = require("./routes/updateAdminPassword");
const updateAdminRouter = require("./routes/updateAdmin");
const getNewAssessments = require("./routes/getNewAssessments");
const getAcceptedAssessments = require("./routes/getAcceptedAssessments");
const getVisaReceivedAssessments = require("./routes/getVisaReceivedAssessments");
const getSingleAssessment = require("./routes/getSingleAssessment");
const getMobileStatusUpdates = require("./routes/loginToMobileUpdates");
const sendStatusUpdatesRouter = require("./routes/sendStatusUpdates");
const updateAssessmentRouter = require("./routes/updateAssessment");
const updateAdminStatus = require("./routes/updateAdminStatus");
const getAdminsRouter = require("./routes/getAdmins");
const getAdminRouter = require("./routes/getAdmin");
const getStatsRouter = require("./routes/getStats");
const getSingleAssessmentApp = require("./routes/getAssessmentApp");
const updatePudhTokenRouter = require("./routes/loginToMobileUpdates");
const createUniversityRouter = require("./routes/universities/createUniversity");
const editUniversityRouter = require("./routes/universities/editUniversity");
const deleteUniversityRouter = require("./routes/universities/deleteUniversity");
const createCourseRouter = require("./routes/courses/createCourse");
const editCourseRouter = require("./routes/courses/editCourse");
const deleteCourseRouter = require("./routes/courses/deleteCourse");
const getUniversitiesRouter = require("./routes/universities/getUniversities");
const getCoursesRouter = require("./routes/courses/getCourses");
const searchByMobileRouter = require("./routes/search/searchByMobile");
const searchByNameRouter = require("./routes/search/searchByName");
const addQualificationRouter = require("./routes/Qualifications/addQualification");
const deleteQualificationRouter = require("./routes/Qualifications/deleteQualification");
const editQualificationRouter = require("./routes/Qualifications/editQualification");
const addTestRouter = require("./routes/TestTaken/addTest");
const deleteTestRouter = require("./routes/TestTaken/deleteTest");
const editTestRouter = require("./routes/TestTaken/editTest.js");
const addWorkRouter = require("./routes/work/addWork");
const deleteWorkRouter = require("./routes/work/deleteWork");
const editWorkRouter = require("./routes/work/editWork");
const addAppliedCourseRouter = require("./routes/coursesToApply/addCourse");
const deleteAppliedCourseRouter = require("./routes/coursesToApply/deleteCourse");
const editAppliedCourseRouter = require("./routes/coursesToApply/editCourse");
const uploadDocsRouter = require("./routes/docupload/upload");
const deleteDocumentRouter = require("./routes/docupload/deleteDocument");
const createFollowUpRouter = require("./routes/followUps/createFollowUp");
const deleteFollowUpRouter = require("./routes/followUps/deleteFollowUp");
const editFollowUpRouter = require("./routes/followUps/editFollowups");
const createApplicationRouter = require("./routes/applications/createApplication");
const deleteApplicationRouter = require("./routes/applications/deleteApplication");
const editApplicationRemarksRouter = require("./routes/applications/updateRemarks");
const updateApplicationStatusRouter = require("./routes/applications/updateStatus");
const updateApplicationDocuments = require("./routes/applications/updateDocs");
const updateUniversityApplicationNumnerRouter = require("./routes/applications/updateUniApplicationNumber");
const createOfferLetterRouter = require("./routes/offerLetters/createOfferLetter");
const deleteOfferLetterRouter = require("./routes/offerLetters/deleteOfferLetter");
const updateEnquiryRemarksRouter = require("./routes/enquiry/updateEnquiryRemarks");
const checkForDuplicateEntryEmail = require("./routes/enquiry/checkUniqueEmail");
const checkForDuplicateEntryMobile = require("./routes/enquiry/checkUniqueMobile");
const createDepositRouter = require("./routes/deposits/createDeposit");
const deleteDepositRouter = require("./routes/deposits/deleteDeposits");
const createReportRouter = require("./routes/dailyReports/createDailyReport");
const updateRoleRouter = require("./routes/admins/updateRole");
const changePasswordRouter = require("./routes/admins/changePassword");
const deleteAssessmentRouter = require("./routes/assessment/deleteAssessment");
const updateApplicationType = require("./routes/applications/updateApplicationType");
const getReceivedVisa = require("./routes/visa/getReceivedVisa");
const deleteVisaRouter = require("./routes/visa/deleteVisa");
const createVisaRouter = require("./routes/visa/applyVisa");
const editVisaStatus = require("./routes/visa/editVisaStatus");
const transferAssessmentRouter = require("./routes/assessment/transferApplicant");
const editPassportRouter = require("./routes/passport/editPassport");
const deletePassportRouter = require("./routes/passport/deletePassport");
const addPassportRouter = require("./routes/passport/addPassport");
const createRecieptRouter = require("./routes/Reciepts/createReciept");
const getAllAssessmentsRouter = require("./routes/assessment/getAllAssessments");
const uploadPhotoRouter = require("./routes/assessment/addPhoto");
const getCasesRouter = require("./routes/admins/getCases");
const searchByDOBRouter = require("./routes/search/searchByDOB");
const updateAttendanceRouter = require("./routes/admins/markAttendence");
const updateOfficialNumber = require("./routes/assessment/updateOfficialMobile");
const updateOfficialEmail = require("./routes/assessment/updateOfficialEmail");
const getResultsByOfficialMobile = require("./routes/search/getResultsByOfficialMobile");
const getResultsByOfficialEmail = require("./routes/search/getResultsByOfficialEmail");
const getStudentReceiptRouter = require("./routes/Reciepts/getStudentReceipt");
const getAllReceipts = require("./routes/Reciepts/getAllReceipts");
const getStudentExpenseRouter = require("./routes/Expenses/getStudentExpense");
const createExpenseRouter = require("./routes/Expenses/createExpense");
const getAllExpenses = require("./routes/Expenses/getAllExpenses");
const updateEnquiryAmount = require("./routes/enquiry/updateTotalAmount");
const updateTotalAmount = require("./routes/enquiry/updateTotalAmount");
const uploadCOERouter = require("./routes/docupload/coeUpload.js");


const createBranchRouter = require("./routes/branches/createBranch");
const editBranchRouter = require("./routes/branches/editBranch");
const deleteBranchRouter = require("./routes/branches/deleteBranch");
const getBranchesRouter = require("./routes/branches/getBranches");

const softDeleteAdminRouter = require("./routes/admins/softDeleteAdmin");

 const MONGO_URI = "mongodb+srv://zenlifedeals_db_user:sYd7elihaCoLTHjN@cluster0.liz0sm3.mongodb.net/aussie-hub-db?retryWrites=true&w=majority";

  // Test
  const MONGO_UR2 =
  "mongodb+srv://rahulsounti_db_user:upVxkMjTbBHL332Z@cluster0.dyf5ezn.mongodb.net/aussie-hub-db?appName=Cluster0";

  
mongoose.connect(
  MONGO_UR2,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connection with database established.");
    mongoose.set("returnOriginal", false);
  }
);

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const app = express();
app.use(cookieSession({
  name: 'session',
  keys: ['abcdefghijkjhwdikhfiue', 'dwfgyedgtfygdshcgewf']
}))


app.use(cors());
app.use(
  compression({
    level: 6,
  })
);
app.disable("x-powered-by");
app.use(multerMid.single("file"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(createEnquiryRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(getRejectedAssessmentsRouter);
app.use(updateAssessmentStatus);
app.use(searchAssessmentRouter);
app.use(updateAdminPasswordRouter);
app.use(updateAdminRouter);
app.use(getNewAssessments);
app.use(getAcceptedAssessments);
app.use(getVisaReceivedAssessments);
app.use(getSingleAssessment);
app.use(getMobileStatusUpdates);
app.use(sendStatusUpdatesRouter);
app.use(updateAssessmentRouter);
app.use(updateAdminStatus);
app.use(getAdminsRouter);
app.use(getAdminRouter);
app.use(getStatsRouter);
app.use(getSingleAssessmentApp);
app.use(updatePudhTokenRouter);


app.use(changePasswordRouter);

//Enquiry
app.use(updateEnquiryRemarksRouter);
app.use(checkForDuplicateEntryEmail);
app.use(checkForDuplicateEntryMobile);

//Universities
app.use(createUniversityRouter);
app.use(editUniversityRouter);
app.use(deleteUniversityRouter);
app.use(getUniversitiesRouter);

//Courses
app.use(createCourseRouter);
app.use(editCourseRouter);
app.use(deleteCourseRouter);
app.use(getCoursesRouter);


//Branches
app.use(createBranchRouter);
app.use(editBranchRouter);
app.use(deleteBranchRouter);
app.use(getBranchesRouter);

//Search
app.use(searchByMobileRouter);
app.use(searchByNameRouter);
app.use(searchByDOBRouter);

//Qualification Router
app.use(addQualificationRouter);
app.use(deleteQualificationRouter);
app.use(editQualificationRouter);

//Qualification Router
app.use(addTestRouter);
app.use(deleteTestRouter);
app.use(editTestRouter);

//Work Experience
app.use(addWorkRouter);
app.use(deleteWorkRouter);
app.use(editWorkRouter);

// Course Applied
app.use(addAppliedCourseRouter);
app.use(deleteAppliedCourseRouter);
app.use(editAppliedCourseRouter);

//uploadDocsRouter
app.use(uploadDocsRouter);
app.use(uploadCOERouter);
app.use(deleteDocumentRouter);
app.use(getResultsByOfficialMobile);

//follow ups

app.use(createFollowUpRouter);
app.use(deleteFollowUpRouter);
app.use(editFollowUpRouter);

//Applications
app.use(createApplicationRouter);
app.use(deleteApplicationRouter);
app.use(editApplicationRemarksRouter);
app.use(updateApplicationStatusRouter);
app.use(updateApplicationDocuments);
app.use(updateUniversityApplicationNumnerRouter);

//Offer Letters
app.use(createOfferLetterRouter);
app.use(deleteOfferLetterRouter);

//Deposit

app.use(createDepositRouter);
app.use(deleteDepositRouter);

//Report
app.use(createReportRouter);
app.use(updateRoleRouter);
app.use(deleteAssessmentRouter);
app.use(updateApplicationType);

// Visa
app.use(deleteVisaRouter);
app.use(createVisaRouter);
app.use(editVisaStatus);
app.use(transferAssessmentRouter);
app.use(updateAttendanceRouter);
app.use(getReceivedVisa);

//Passport routes
app.use(addPassportRouter);
app.use(editPassportRouter);
app.use(deletePassportRouter);


app.use(updateOfficialNumber);

//Recipes routes
app.use(createRecieptRouter);
app.use(getAllAssessmentsRouter);

app.use(uploadPhotoRouter);
app.use(getCasesRouter);
app.use(updateOfficialEmail);
app.use(getResultsByOfficialEmail);

app.use(getStudentReceiptRouter);
app.use(getAllReceipts);

app.use(getStudentExpenseRouter)
app.use(createExpenseRouter)
app.use(getAllExpenses)
app.use(updateTotalAmount)

app.use(softDeleteAdminRouter)

const root = require("path").join(__dirname, "client", "build");
app.use(express.static(root));
app.get("/*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(4000);
