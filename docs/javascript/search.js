BASE_LAUNCH_URL = 'https://smart.cerner.com/smart/{tenant_key}/apps/{app_id}?'
PERSON_PARAM = 'PAT_PersonId='
ENCNTR_PARAM = 'VIS_EncntrId='
PROVIDER_ID_PARAM = 'USR_PersonId='
USERNAME_PARAM = 'username='

function search(smartURL, app_id) {
    window.location.href = smartURL.replace('{app_id}', app_id);
}

function initializeSearch(smartContext) {
    let tenant_key = smartContext.state.tokenResponse.tenant;
    let patient_id = smartContext.patient.id;
    let encntr_id = smartContext.encounter.id;
    let provider_id = smartContext.user.id();
    let username = smartContext.state.tokenResponse.username;

    let params = []
    params.push(PROVIDER_ID_PARAM + provider_id);
    params.push(USERNAME_PARAM + username);
    if (patient_id) {
        params.push(PERSON_PARAM + patient_id);
    }
    if (encntr_id) {
        params.push(ENCNTR_PARAM + encntr_id);
    }

    let smartAppUrl = BASE_LAUNCH_URL.replace('{tenant_key}',tenant_key)
        + params.join('&');


    document.getElementById('search-btn').addEventListener('click', function() {
        let app_id = document.getElementById('app-id-input').value;
        search(smartAppUrl, app_id)
    });
}

let myApp = {};
FHIR.oauth2.ready()
.then(function(client){
    myApp.smart = client;

    window.addEventListener('load', () => initializeSearch(myApp.smart));
});