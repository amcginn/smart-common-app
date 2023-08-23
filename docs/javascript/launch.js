let auth_req_info = {
    'client_id': 'b7033e95-3b45-4d96-9b3d-79ea367cd714',
    'scope': 'openid fhirUser online_access launch',
    'redirect_uri': 'https://amcginn.github.io/smart-common-app/app.html'
}

FHIR.oauth2.authorize(auth_req_info);
