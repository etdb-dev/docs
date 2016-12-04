define({ "api": [
  {
    "type": "POST",
    "url": "/auth",
    "title": "Add a new user",
    "name": "AddUser",
    "group": "Auth",
    "version": "0.0.0",
    "filename": "src/router/auth.js",
    "groupTitle": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic [authstring]</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/auth",
    "title": "Request token",
    "name": "GetToken",
    "group": "Auth",
    "examples": [
      {
        "title": "fetch a token",
        "content": "curl -X GET -H \"Authorization: Basic y0urAuth5tr1ng=\" -H \"Cache-Control: no-cache\" \"https://api.etdb.de/auth\"",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/router/auth.js",
    "groupTitle": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic [authstring]</p>"
          }
        ]
      }
    }
  }
] });
