var Fetched;
const loaded = () => {
  Fetched = false;
  $("#rollno").focus();
  $("#save").prop("disabled", true);
  $("#update").prop("disabled", true);
  $("#reset").prop("disabled", true);
  $("#enrollment").prop("disabled", true);
  $("#address").prop("disabled", true);
  $("#birthdate").prop("disabled", true);
  $("#class").prop("disabled", true);
  $("#fullname").prop("disabled", true);
};

const validateAndGetFormData = () => {
  var rollno = $("#rollno").val();
  if (rollno === "") {
    alert("Student Roll No is required");
    $("#rollno").focus();
    return "";
  }
  var name = $("#fullname").val();
  if (name === "") {
    alert("Student name is required");
    $("#fullname").focus();
    return "";
  }
  var classp = $("#class").val();
  if (classp === "") {
    alert("Student class is required");
    $("#class").focus();
    return "";
  }
  var birthdate = $("#birthdate").val();
  if (birthdate === "") {
    alert("Student Birthdate is required");
    $("#birthdate").focus();
    return "";
  }
  var address = $("#address").val();
  if (address === "") {
    alert("Student address is required");
    $("#class").focus();
    return "";
  }
  var enrollmentdate = $("#enrollment").val();
  if (enrollmentdate === "") {
    alert("Student Birthdate is required");
    $("#enrollment").focus();
    return "";
  }
  var jsonStrObj = {
    Roll_No: rollno,
    Full_Name: name,
    Class: classp,
    Birth_Date: birthdate,
    Address: address,
    Enrollment_Date: enrollmentdate,
  };
  return JSON.stringify(jsonStrObj);
};

const validateAndCheckForData = () => {
  var rollno = $("#rollno").val();
  if (rollno === "") {
    return "";
  }
  var jsonStrObj = {
    Roll_No: rollno,
  };
  return JSON.stringify(jsonStrObj);
};
// This method is used to create PUT Json request.

const createPUTRequest = (connToken, jsonObj, dbName, relName) => {
  var putRequest =
    "{\n" +
    '"token" : "' +
    connToken +
    '",' +
    '"dbName": "' +
    dbName +
    '",\n' +
    '"cmd" : "PUT",\n' +
    '"rel" : "' +
    relName +
    '",' +
    '"jsonStr": \n' +
    jsonObj +
    "\n" +
    "}";
  return putRequest;
};
const createGETRequest = (connToken, jsonObj, dbName, relName) => {
  var getRequest =
    "{\n" +
    '"token" : "' +
    connToken +
    '",' +
    '"dbName": "' +
    dbName +
    '",\n' +
    '"cmd" : "GET",\n' +
    '"rel" : "' +
    relName +
    '",' +
    '"jsonStr": \n' +
    jsonObj +
    "\n" +
    "}";
  return getRequest;
};

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
  var url = dbBaseUrl + apiEndPointUrl;
  var jsonObj;
  $.post(url, reqString, function (result) {
    jsonObj = JSON.parse(result);
  }).fail(function (result) {
    var dataJsonObj = result.responseText;
    jsonObj = JSON.parse(dataJsonObj);
  });
  return jsonObj;
}

const resetForm = () => {
  Fetched = false;
  $("#rollno").prop("disabled", false);
  $("#rollno").val("");
  $("#fullname").val("");
  $("#class").val("");
  $("#birthdate").val("");
  $("#address").val("");
  $("#enrollment").val("");
  $("#save").prop("disabled", true);
  $("#update").prop("disabled", true);
  $("#reset").prop("disabled", true);
  $("#enrollment").prop("disabled", true);
  $("#address").prop("disabled", true);
  $("#birthdate").prop("disabled", true);
  $("#class").prop("disabled", true);
  $("#fullname").prop("disabled", true);
  $("#rollno").focus();
};

const resetForm2 = () => {
  Fetched = false;
  $("#save").prop("disabled", false);
  $("#fullname").val("");
  $("#class").val("");
  $("#birthdate").val("");
  $("#address").val("");
  $("#enrollment").val("");
};

const saveStudent = () => {
  var jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
    return;
  }
  var putReqStr = createPUTRequest(
    "90938332|-31949271869526202|90952385",
    jsonStr,
    "SCHOOL-DB",
    "STUDENT-TABLE"
  );
  // alert(putReqStr);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommand(
    putReqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  // alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({ async: true });
  resetForm();
};

const getData = () => {
  var jsonStr = validateAndCheckForData();
  if (jsonStr === "") {
    if (Fetched) resetForm();
    return;
  }
  $("#enrollment").prop("disabled", false);
  $("#address").prop("disabled", false);
  $("#birthdate").prop("disabled", false);
  $("#class").prop("disabled", false);
  $("#fullname").prop("disabled", false);
  // console.log(Fetched);
  if (Fetched) resetForm2();
  var getReqStr = createGETRequest(
    "90938332|-31949271869526202|90952385",
    jsonStr,
    "SCHOOL-DB",
    "STUDENT-TABLE"
  );
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommand(
    getReqStr,
    "http://api.login2explore.com:5577",
    "/api/irl"
  );
  if (resultObj.data !== "") {
    data = JSON.parse(resultObj.data);
    jQuery.ajaxSetup({ async: true });
    // console.log(data);
    document.getElementById("fullname").value = data.Full_Name;
    document.getElementById("class").value = data.Class;
    document.getElementById("birthdate").value = data.Birth_Date;
    document.getElementById("address").value = data.Address;
    document.getElementById("enrollment").value = data.Enrollment_Date;
    $("#rollno").prop("disabled", true);
    $("#enrollment").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#birthdate").prop("disabled", false);
    $("#class").prop("disabled", false);
    $("#fullname").prop("disabled", false);
    Fetched = true;
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", false);
    $("#reset").prop("disabled", false);
  } else {
    $("#save").prop("disabled", false);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", false);
  }
};

var rollno = document.getElementById("rollno");
rollno.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === "Tab") getData();
});

$("input.form-control").on("keyup", function (e) {
  if (e.key == "Enter") {
    if ($(this).val()) {
      $(this).next().focus();
    }
  }
});

const createSETRequest = (connToken, jsonObj, dbName, relName) => {
  var putRequest =
    "{\n" +
    '"token" : "' +
    connToken +
    '",' +
    '"dbName": "' +
    dbName +
    '",\n' +
    '"cmd" : "SET",\n' +
    '"rel" : "' +
    relName +
    '",\n' +
    '"type":"UPDATE",\n' +
    '"primaryKey":"Roll_No",\n' +
    '"jsonStr": \n' +
    jsonObj +
    "\n" +
    "}";
  return putRequest;
};

const validateAndUpdateFormData = () => {
  var rollno = $("#rollno").val();
  if (rollno === "") {
    alert("Student Roll No is required");
    $("#rollno").focus();
    return "";
  }
  var name = $("#fullname").val();
  if (name === "") {
    alert("Student name is required");
    $("#fullname").focus();
    return "";
  }
  var classp = $("#class").val();
  if (classp === "") {
    alert("Student class is required");
    $("#class").focus();
    return "";
  }
  var birthdate = $("#birthdate").val();
  if (birthdate === "") {
    alert("Student Birthdate is required");
    $("#birthdate").focus();
    return "";
  }
  var address = $("#address").val();
  if (address === "") {
    alert("Student address is required");
    $("#class").focus();
    return "";
  }
  var enrollmentdate = $("#enrollment").val();
  if (enrollmentdate === "") {
    alert("Student Birthdate is required");
    $("#enrollment").focus();
    return "";
  }
  var jsonStrObj = {
    Roll_No: rollno,
    Full_Name: name,
    Class: classp,
    Birth_Date: birthdate,
    Address: address,
    Enrollment_Date: enrollmentdate,
  };
  return JSON.stringify(jsonStrObj);
};

const updateStudent = () => {
  var jsonStr = validateAndUpdateFormData();
  if (jsonStr === "") {
    return;
  }
  var setReqStr = createSETRequest(
    "90938332|-31949271869526202|90952385",
    jsonStr,
    "SCHOOL-DB",
    "STUDENT-TABLE"
  );
  // alert(setReqStr);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommand(
    setReqStr,
    "http://api.login2explore.com:5577",
    "/api/iml/set"
  );
  // alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({ async: true });
  resetForm();
};
