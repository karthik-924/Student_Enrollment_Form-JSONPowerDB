const loaded = () => {
  $("#rollno").focus();
};
const getData = () => {
  console.log("got")
}
function validateAndGetFormData() {
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
  var jsonStrObj = {
    id: empIdVar,
    name: empNameVar,
    mobileno: empNumVar,
    email: empEmailVar,
  };
  return JSON.stringify(jsonStrObj);
}
// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
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
}
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
  $("#rollno").focus();
  $("#rollno").val("");
  $("#fullname").val("");
  $("#class").val("");
  $("#birthdate").val("");
  $("#address").val("");
  $("#enrollment").val("");
};
const saveEmployee = () => {
  var jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
    return;
  }
  //   var putReqStr = createPUTRequest(
  //     "90938332|-31949271869526202|90952385",
  //     jsonStr,
  //     "Student",
  //     "Student-Rel"
  //   );
  //   alert(putReqStr);
  //   jQuery.ajaxSetup({ async: false });
  //   var resultObj = executeCommand(
  //     putReqStr,
  //     "http://api.login2explore.com:5577",
  //     "/api/iml"
  //   );
  //   alert(JSON.stringify(resultObj));
  //   jQuery.ajaxSetup({ async: true });
  //   resetForm();
};
