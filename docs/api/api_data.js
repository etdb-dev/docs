define({ "api": [
  {
    "type": "POST",
    "url": "/auth",
    "title": "Add a new user",
    "name": "AddUser",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic [b64string]</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "content-type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Data for new user",
          "content": "{\n  \"username\": String,\n  \"password\": String\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Add a new user, providing username and password",
        "content": "curl -X POST -H \"Authorization: Basic `printf <user>:<pass> | base64`\" -H \"Content-Type: application/json\" -H \"Cache-Control: no-cache\" -d '{\n\"username\": \"bobby\",\n\"password\": \"needssomeapi\"\n}' \"https://api.etdb.de/auth\"",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/docs/api/router/main.js",
    "groupTitle": "Auth"
  },
  {
    "type": "DELETE",
    "url": "/auth/:uname",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": ":uname",
            "description": "<p>Username of account to delete</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/docs/api/router/main.js",
    "groupTitle": "Auth"
  },
  {
    "type": "GET",
    "url": "/auth",
    "title": "Request token",
    "name": "GetToken",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic [b64string]</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "fetch a token",
        "content": "curl -X GET -H \"Authorization: Basic `printf <user>:<pass> | base64`\" -H \"Cache-Control: no-cache\" \"https://api.etdb.de/auth\"",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/docs/api/router/main.js",
    "groupTitle": "Auth"
  },
  {
    "type": "PUT",
    "url": "/auth/:uname",
    "title": "Update user",
    "name": "UpdateUser",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic [b64string]</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "content-type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Userdata for update",
          "content": "{\n  password: String\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": ":uname",
            "description": "<p>Username of account to edit</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/docs/api/router/main.js",
    "groupTitle": "Auth"
  }
] });
