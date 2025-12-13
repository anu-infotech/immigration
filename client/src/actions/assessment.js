import server from "../api/server";
import { toast } from "react-toastify";

export const SAVE_SUCCESS = "SAVE_SUCCESS";
export const SAVE_FAILURE = "SAVE_FAILURE";
export const NEW_ASSESSMENTS = "NEW_ASSESSMENTS";
export const USER = "USER";
export const SINGLE_ASSESSMENT = "SINGLE_ASSESSMENT";
export const ALL_ASSESSMENTS = "ALL_ASSESSMENTS";

export function createAssessment(payload) {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await server.post("/api/enquiry/create", payload.formValues, {
        params: {
          email: user.email,
          name: user.name,
        },
      });
      console.log(payload.history);
      toast.success(
        "Assessment created successfully. An email has been sent to your registered email id"
      );
      payload.reset();
      payload.resetForm();
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };
}

export function createAssessmentWithoutLogin(payload) {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/create", payload.formValues, {
        params: {
          email: "selfassessment@gmail.com",
          name: "Self Assessment",
        },
      });
      console.log(payload.history);
      toast.success(
        "Assessment created successfully. An email has been sent to your registered email id"
      );
      payload.reset();
      payload.resetForm();
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };
}

export const getNewAssessments = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/assessments/newAssessments");
      dispatch({
        type: NEW_ASSESSMENTS,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const getActiveAssessments = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/assessments/acceptedAssessments");
      dispatch({
        type: NEW_ASSESSMENTS,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const getActiveVisaAssessments = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/assessments/visa_received");
      dispatch({
        type: NEW_ASSESSMENTS,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const getRejectedAssessments = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/assessments/rejected");
      dispatch({
        type: NEW_ASSESSMENTS,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const getAllAssessments = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/assessments/all");
      dispatch({
        type: ALL_ASSESSMENTS,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const getAssessment = (ref_no) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/assessments/singleAssessment", {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteAssessment = (ref_no) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.get("/api/assessment/delete", {
        params: { ref_no },
      });

      const assessments = getState().assessment;
      const filtered = assessments.filter(
        (assessment) => assessment !== ref_no
      );
      dispatch({
        type: NEW_ASSESSMENTS,
        payload: filtered,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const addQualification = (ref_no, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post(
        "/api/enquiry/qualification/add",
        formValues,
        {
          params: { ref_no },
        }
      );
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const addOfficialMobileNumber = (ref_no, mobile) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/official/mobile", {
        params: { ref_no, mobile },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const addOfficialEmail = (ref_no, email) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/official/email", {
        params: { ref_no, email },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const addTotalAmount = (ref_no, amount ) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/official/amount", {
        params: { ref_no, total_amount: amount },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteQualification = (ref_no, qualificationId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/qualification/delete", {
        params: { ref_no, qualificationId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const editQualification = (ref_no, formValues, qualificationId) => {
  return async (dispatch) => {
    try {
      const res = await server.post(
        "/api/enquiry/qualification/edit",
        formValues,
        {
          params: { ref_no, qualificationId },
        }
      );
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const updateAssessmentStatus = (ref_no, status, name, email) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/assessment/updateAssessmentStatus", {
        params: { ref_no, status, name, email },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success(
        `Status for assessment with REFERENCE NO - ${ref_no} updated successfully`
      );
    } catch (error) {
      toast.error(
        `Status for assessment with REFERENCE NO - ${ref_no} could not be updated. Please try again.`
      );
    }
  };
};

export const updateApplicationType = (ref_no, applicationId, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post(
        "/api/enquiry/application/type/edit",
        formValues,
        {
          params: { ref_no, applicationId },
        }
      );
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success(
        `Status for assessment with REFERENCE NO - ${ref_no} updated successfully`
      );
    } catch (error) {
      toast.error(
        `Status for assessment with REFERENCE NO - ${ref_no} could not be updated. Please try again.`
      );
    }
  };
};

export const sendStatusUpdate = (formValues, ref_no) => {
  return async (dispatch) => {
    try {
      const res = await server.post(
        "/api/assessment/status-updates",
        formValues,
        { params: { ref_no } }
      );
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success(
        `Status update successfully sent to the registered mobile.`
      );
    } catch (error) {
      toast.error(
        `Status for assessment with REFERENCE NO - ${ref_no} could not be updated. Please try again.`
      );
    }
  };
};

//Test Taken actions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const addTest = (ref_no, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/test/add", formValues, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteTest = (ref_no, testId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/test/delete", {
        params: { ref_no, testId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const editTest = (ref_no, formValues, testId) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/test/edit", formValues, {
        params: { ref_no, testId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record edited successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

//Work Experience actions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const addWorkExperience = (ref_no, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/work/add", formValues, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteWorkExperience = (ref_no, workId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/work/delete", {
        params: { ref_no, workId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const editWorkExperience = (ref_no, formValues, workId) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/work/edit", formValues, {
        params: { ref_no, workId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record edited successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

//Work Experience actions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const addCourseToApply = (ref_no, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/course/add", formValues, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteCourseToApply = (ref_no, courseAppliedId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/course/delete", {
        params: { ref_no, courseAppliedId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

//Follow up Actions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const addFollowup = (ref_no, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/followUp/add", formValues, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteFollowUp = (ref_no, followUpId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/followUp/delete", {
        params: { ref_no, followUpId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const editFollowUp = (ref_no, formValues, followUpId) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/followUp/edit", formValues, {
        params: { ref_no, followUpId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record edited successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

//Follow up Actions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const addDocument = (ref_no, formValues, name, caseHandler) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/docs/upload", formValues, {
        params: { ref_no, name, caseHandler },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const addCOEDocument = (ref_no, formValues, name, caseHandler) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/coe/upload", formValues, {
        params: { ref_no, name, caseHandler },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteDocument = (ref_no, documentId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/document/delete", {
        params: { ref_no, documentId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

//Application
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const createApplication = (ref_no, formValues, courseAppliedId) => {
  return async (dispatch) => {
    try {
      const res = await server.post(
        "/api/enquiry/application/create",
        formValues,
        {
          params: { ref_no, courseAppliedId },
        }
      );
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteApplication = (ref_no, applicationId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/application/delete", {
        params: { ref_no, applicationId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const updateApplicationRemarks = (ref_no, formValues, applicationId) => {
  return async (dispatch) => {
    try {
      const res = await server.post(
        "/api/enquiry/application/remarks/edit",
        formValues,
        {
          params: { ref_no, applicationId },
        }
      );
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record updated successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const updateApplicationDocs = (ref_no, formValues, applicationId) => {
  return async (dispatch) => {
    try {
      const res = await server.post(
        "/api/enquiry/application/docs/edit",
        formValues,
        {
          params: { ref_no, applicationId },
        }
      );
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record updated successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const updateApplicationStatus = (ref_no, formValues, applicationId) => {
  return async (dispatch) => {
    try {
      const res = await server.post(
        "/api/enquiry/application/status/edit",
        formValues,
        {
          params: { ref_no, applicationId },
        }
      );
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record updated successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const updateUniversityApplicationNumber = (
  ref_no,
  formValues,
  applicationId
) => {
  return async (dispatch) => {
    try {
      const res = await server.post(
        "/api/enquiry/application/university-application-number/edit",
        formValues,
        {
          params: { ref_no, applicationId },
        }
      );
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record updated successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

//Offer Letters
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const createOfferLetter = (ref_no, formData) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/offer/create", formData, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteOfferLetter = (ref_no, offerId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/offer/delete", {
        params: { ref_no, offerId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Update Remarks

export const updateEnquiryRemarks = (ref_no, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/remarks/update", formValues, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record updated successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Deposits

export const createDeposit = (ref_no, formData) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/deposit/create", formData, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteDeposit = (ref_no, depositId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/deposit/delete", {
        params: { ref_no, depositId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const addDailyReport = (email, formData) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/report/create", formData, {
        params: { email },
      });
      dispatch({
        type: USER,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const getUser = (email) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/getAdmin", { params: { email } });
      dispatch({
        type: USER,
        payload: res.data,
      });
      toast.success("Record fetched successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const createVisa = (ref_no, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/visa/create", formValues, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const editVisa = (ref_no, formValues, visaId) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/visa/edit", formValues, {
        params: { ref_no, visaId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deleteVisa = (ref_no, visaId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/visa/delete", {
        params: { ref_no, visaId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const transferAssessment = (ref_no, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/assessment/transfer", formValues, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record Transfered successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const addPassport = (ref_no, formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/passport/add", formValues, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const deletePassport = (ref_no, passportId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/enquiry/passport/delete", {
        params: { ref_no, passportId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record updated successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const editPassport = (ref_no, formValues, passportId) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/enquiry/passport/edit", formValues, {
        params: { ref_no, passportId },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const uploadPhoto = (ref_no, formData) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/photo/upload", formData, {
        params: { ref_no },
      });
      dispatch({
        type: SINGLE_ASSESSMENT,
        payload: res.data,
      });
      toast.success("Record added successfully");
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};

export const getCases = (email) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/cases", {
        params: { email },
      });
      dispatch({
        type: NEW_ASSESSMENTS,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong. Try reloading the page");
    }
  };
};
